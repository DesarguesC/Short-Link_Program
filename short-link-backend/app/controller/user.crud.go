package controller

// user crud
import (
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"go-svc-tpl/app/middleware"
	"go-svc-tpl/app/response"
	"go-svc-tpl/model"
	"time"
)

// {host}/user

// {host}/user/register
func Users_register(c echo.Context) error {

	data := new(model.RegisterInput)
	if err := c.Bind(data); err != nil {
		logrus.Error("Bind Failed")
		return response.SendResponse(c, 400, "Bind Failed")
	}

	fmt.Println((*data).Name)
	current_time := time.Now()
	new_user := new(model.Users)
	new_user.Name = (*data).Name

	//err := model.DB.Debug().Find(&new_user).Error

	err := model.DB.Limit(1).First(&new_user, "name = ?", (*data).Name).Error
	//fmt.Println(result.Error)
	//fmt.Println(result.Error == nil)

	//temp := (*error)(nil)

	if err == nil {
		model.Status = "nil"
		return response.SendResponse(c, 100, "Registration Failed: This user name has been used", err)
	}
	temp := new(model.Users)
	temp.Email = (*data).Email
	err = model.DB.Limit(1).First(&new_user, "email = ?", (*data).Email).Error
	if err == nil {
		model.Status = "nil"
		return response.SendResponse(c, 100, "Registration Failed: This user email has been used", err)
	}

	(*new_user).Id = (*data).Id
	(*new_user).Email = (*data).Email
	(*new_user).Pwd = (*data).Pwd
	(*new_user).SecQ = (*data).SecQ
	(*new_user).SecA = (*data).SecA
	(*new_user).LatestTime = current_time

	name := (*data).Name
	email := (*data).Email
	pwd := (*data).Pwd
	secQ := (*data).SecQ
	secA := (*data).SecA

	fmt.Println(name)
	fmt.Println("eee")

	one := midware.RegisterStruct{name, email, pwd, secQ, secA}
	valid := validator.New()
	invalid_err := valid.Struct(one)

	if invalid_err != nil {
		return response.SendResponse(c, 107, "invalid register info format", invalid_err.Error())
	}
	// validate

	err = model.DB.Debug().Create(&new_user).Error
	if err != nil {
		model.Status = "nil"
		return response.SendResponse(c, 000, "User create failed", model.Status)
	}
	model.Status = new_user.Name
	return response.SendResponse(c, 101, "User creating success", model.Status)

}

// {host}/user/login
func User_login(c echo.Context) error {

	if model.Status != "nil" {
		return response.SendResponse(c, 104, "do not repeat login, you may logout first")
	}

	data := new(model.LoginInput)
	if err := c.Bind(data); err != nil {
		logrus.Error("Bind Failed")
		return response.SendResponse(c, 400, "Bind Failed")
	}

	a_User := new(model.Users)
	(*a_User).Email = (*data).Email
	(*a_User).Pwd = (*data).Pwd
	pwd := a_User.Pwd
	email := a_User.Email

	one := midware.LoginStruct{email, pwd}
	valid := validator.New()
	invalid_err := valid.Struct(one)
	if invalid_err != nil {
		return response.SendResponse(c, 105, "invalid login info format", email, pwd)
	}
	// validation

	err := model.DB.Limit(1).First(&a_User, "email = ? AND pwd = ?", email, pwd).Error
	if err != nil {
		model.Status = "nil"
		return response.SendResponse(c, 102, "incorrect email or password", model.Status)
	}

	fmt.Println((*a_User).Name)
	fmt.Println((*a_User).Email)
	fmt.Println((*a_User).Pwd)
	fmt.Println((*a_User).SecQ)
	fmt.Println((*a_User).SecA)

	model.Status = (*a_User).Name
	(*a_User).LatestTime = time.Now()

	model.DB.Where(&a_User, "email = ?", email).Update("latesttime", time.Now())
	// 这里还需要记录ip地址

	return response.SendResponse(c, 103, "login successfully", model.Status)
}

// {host}/user/logout

func User_logout(c echo.Context) error {
	if model.Status == "nil" {
		return response.SendResponse(c, 900, "didn't login", model.Status)
	}
	model.Status = "nil"
	return response.SendResponse(c, 901, "logout", model.Status)
}

// {host}/user/security
func User_reset_pwd(c echo.Context) error {

	data := new(model.SecureResetPwdInput)
	if err := c.Bind(data); err != nil {
		logrus.Error("Bind Failed")
	}

	name := (*data).Name
	email := (*data).Email
	secA := (*data).SecA
	new_pwd := (*data).Pwd_new

	one := midware.SecurityStruct{name, email, new_pwd, secA}
	valid := validator.New()
	invalid_err := valid.Struct(one)
	if invalid_err != nil {
		return response.SendResponse(c, 211, "invalid verification inputs", name, email, new_pwd, secA)
	}

	a_user := new(model.Users)
	(*a_user).Name = (*data).Name
	(*a_user).Email = (*data).Email

	err := model.DB.First(&a_user, "name = ? AND email = ?", (*data).Name, (*data).Email).Error
	if err != nil {
		return response.SendResponse(c, 221, "no user found or unpaired Name and Email")
	}

	if (*a_user).SecA != (data).SecA {
		return response.SendResponse(c, 200, "incorrect answer", model.Status)
	}
	err = model.DB.Model(&a_user).Where("name = ?", (*data).Name).Update("pwd", new_pwd).Error
	if err != nil {
		return response.SendResponse(c, 231, "Unknown Error occurred when updating", new_pwd)
	}
	return response.SendResponse(c, 201, "pwd reset success", model.Status)
}

// {host}/user/info

func User_get(c echo.Context) error {
	name := model.Status
	if model.Status == "nil" {
		return response.SendResponse(c, 900, "didn't login", model.Status)
	}
	a_user := model.Users{}
	a_user.Name = name
	err := model.DB.First(&a_user, "name = ?", name).Error
	if err != nil {
		return response.SendResponse(c, 111, "Unknown Error: No User (FATAL)", model.Status)
	}
	email := a_user.Email
	return response.SendResponse(c, 112, "query succeeded", name, email)
}

// {host}/user/record/get
// IP 地址获取办法还有些疑惑
func User_login_get(c echo.Context) error {
	if model.Status == "nil" {
		return response.SendResponse(c, 900, "didn't login", model.Status)
	}
	name := model.Status
	a_user := new(model.Users)
	(*a_user).Name = name
	err := model.DB.First(&a_user, "name = ?", name).Error
	if err != nil {
		return response.SendResponse(c, 111, "no User (FATAL)", model.Status)
	}
	return response.SendResponse(c, 310, "getting information succeeded", a_user.Name, a_user.LatestTime, model.Status)
	// 这里还需要返回ip地址
}

// {host}/user/pwdreset
func User_pwd_reset(c echo.Context) error {
	if model.Status == "nil" {
		return response.SendResponse(c, 900, "didn't login", model.Status)
	}

	data := new(model.ResetPwdInput)
	if err := c.Bind(data); err != nil {
		logrus.Error("Bind Failed")
	}
	// 因为要用到middleware，我们还是要求输入name

	name := (*data).Name
	new_pwd := (*data).Pwdnew
	old_pwd := (*data).Pwdold

	one := midware.ResetStruct{name, new_pwd, old_pwd}
	valid := validator.New()
	invalid_err := valid.Struct(one)
	if invalid_err != nil {
		return response.SendResponse(c, 622, "old password found incorrect", name)
	}

	a_user := new(model.Users)
	(*a_user).Email = (*data).Email
	(*a_user).Name = (*data).Name

	err := model.DB.Debug().Find(&a_user).Error
	if err != nil {
		return response.SendResponse(c, 599, "no user found")
	}
	if (*a_user).Pwd != (*data).Pwdold {
		return response.SendResponse(c, 600, "incorrect old password", model.Status)
	}
	(*a_user).Pwd = (*data).Pwdnew
	return response.SendResponse(c, 601, "password reset succeeded", model.Status)
}
