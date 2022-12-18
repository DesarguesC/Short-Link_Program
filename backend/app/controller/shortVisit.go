package controller

// 短链接访问
import (
	"github.com/labstack/echo/v4"
	"go-svc-tpl/app/response"
)

func Visit(c echo.Context) error {
	//中间件实现
	//short := c.Param("hash")
	//url, err := databases.QueryUrl(short)
	//if err != nil {
	//	if err == gorm.ErrRecordNotFound {
	//		return response.SendResponse(c, 400, "not found", url)
	//	}
	//	return response.SendResponse(c, 400, "sql queryUrl fail", url)
	//}
	//target := url.Origin
	//fmt.Println(target)
	////已冻结
	//if url.Enable == false {
	//	logrus.Error("The link paused", url)
	//	return response.SendResponse(c, 400, "The link paused", url)
	//}
	//// 已过期
	//if time.Now().After(url.ExpireTime) {
	//	logrus.Error("the link expired")
	//	return response.SendResponse(c, 400, "The link expired")
	//}
	//// 重定向
	//if err := c.Redirect(301, "/"+target); err != nil && url.Enable && !time.Now().After(url.ExpireTime) { //永久重定向 //   要+/ 不然保留前缀
	//	logrus.Error("redirect failed")
	//	return response.SendResponse(c, 400, "redirect failed")
	//}
	return response.SendResponse(c, 200, "visit succeed")
}
