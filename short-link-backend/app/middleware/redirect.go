package midware

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"go-svc-tpl/app/response"
	"go-svc-tpl/databases"
	"gorm.io/gorm"
	"time"
)

func RedirectMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		short := "visit/" + c.Param("hash")
		url, err := databases.QueryUrl(short)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return response.SendResponse(c, 400, "not found", url)
			}
			logrus.Error(err)
		}
		target := url.Origin
		fmt.Println(target)
		//已冻结
		if url.Enable == "unable" {
			logrus.Error("The link paused", url)
			return response.SendResponse(c, 400, "The link paused")
		}
		// 已过期
		if time.Now().After(url.ExpireTime) {
			logrus.Error("the link expired")
			return response.SendResponse(c, 400, "The link expired")
		}
		// 重定向
		// 301 会缓存 直接跳转
		err = c.Redirect(302, target)
		if err != nil {
			logrus.Error(err)
			return response.SendResponse(c, 400, "redict error")
		}
		return next(c)
	}
}
