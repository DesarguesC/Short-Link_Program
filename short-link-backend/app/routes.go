package app

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	echoSwagger "github.com/swaggo/echo-swagger"
	"go-svc-tpl/app/controller"
	"go-svc-tpl/app/middleware"
)

func ping(c echo.Context) error {
	return c.String(200, "pong!")
}

func addRoutes() {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://localhost:1926"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))
	visit := e.Group("visit", midware.RedirectMiddleware)
	visit.GET("/:hash", controller.Visit)
	api := e.Group("api")
	api.GET("/doc/*", echoSwagger.WrapHandler)
	api.GET("/ping", ping)
	api.POST("/url/create", controller.CreateUrl)
	api.POST("/url/query", controller.QueryUrl)
	api.POST("/url/update", controller.UpdateUrl)
	api.POST("/url/delete", controller.DelUrl)
	api.POST("/url/pause", controller.PauseUrl)
	api.POST("/url/get", controller.ShowUrls)
	api.POST("/url/continue", controller.ContinueUrl)
	api.POST("/user/register", controller.Users_register, midware.CheckRegister)
	api.POST("/user/login", controller.User_login, midware.CheckLogin)
	api.POST("/user/logout", controller.User_logout)
	api.POST("/user/security", controller.User_reset_pwd, midware.CheckSecure)
	api.POST("/user/info", controller.User_get)
	api.POST("/user/record/get", controller.User_login_get)
	api.POST("/user/pwdreset", controller.User_pwd_reset, midware.CheckReset)

}
