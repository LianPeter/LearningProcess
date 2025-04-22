package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() { // 重定向至新的url
	r := gin.Default()
	r.GET("/index", func(c *gin.Context) {
		c.Redirect(http.StatusMovedPermanently, "https://www.5lmh.com")
	})
	r.Run()
}
