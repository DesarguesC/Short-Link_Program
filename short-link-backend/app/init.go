package app

import (
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

var e *echo.Echo

//var Status string

func InitWebFramework() {
	e = echo.New()
	e.HideBanner = true
	addRoutes()

	logrus.Info("echo framework initialized")
}

func StartServer() {
	e.Logger.Fatal(e.Start(":1926"))
}
