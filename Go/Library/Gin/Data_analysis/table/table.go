package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type Login struct {
	// binding:"required"修饰的字段，若接收为空值，则报错，是必须字段
	User     string `form:"username" json:"user" uri:"user" xml:"user" binding:"required"`
	Password string `form:"password" json:"password" uri:"password" xml:"password" binding:"required"`
}

/*
	每个字段后面都有一组标签，用反引号（`` ）括起来，
	这些标签在 Go 中用于对字段提供额外的信息，通常用于与外部库或框架交互。
form:"username"：表示该字段将从 HTTP 请求的表单数据中提取，字段名为 username。 -- 与客户端发送的请求数据中的字段名一致
json:"user"：表示该字段在 JSON 数据中对应的键是 user。
uri:"user"：表示该字段可以从 URL 参数中提取，键是 user。
xml:"user"：表示该字段在 XML 数据中对应的标签名是 user

 # form 是一种标签类型，用来指示该结构体字段的值应该从 HTTP 请求的 表单数据 中提取。
*/

func main() {
	r := gin.Default()
	// JSON绑定
	r.POST("/loginJSON", func(c *gin.Context) {
		// 声明接收的变量
		var form Login
		//Bind()方法 默认解析并绑定form格式的数据
		if err := c.Bind(&form); err != nil {
			// 返回错误信息
			c.JSON(http.StatusBadRequest, gin.H{"err": err.Error()})
			return
		}
		// 判断用户名密码是否正确
		if form.User != "root" || form.Password != "admin" {
			c.JSON(http.StatusBadRequest, gin.H{"status": "304"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "200"})
	})
	r.Run(":8000")
}
