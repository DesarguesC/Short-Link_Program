package response

import (
	"github.com/labstack/echo/v4"
	"net/http"
)

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

// demo
func SendResponse(c echo.Context, code int, msg string, data ...interface{}) error {
	return c.JSON(http.StatusOK, Response{
		Code: code,
		Msg:  msg,
		Data: data,
	})
}
