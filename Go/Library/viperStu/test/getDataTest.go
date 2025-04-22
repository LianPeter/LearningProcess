package test

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func GetData() {
	// 设置Gin框架
	r := gin.Default()

	// 定义POST请求的路由
	r.POST("/", func(c *gin.Context) {
		// 创建一个变量来存储请求的JSON数据
		var json map[string]interface{}

		// 绑定请求的JSON数据到json变量
		if err := c.BindJSON(&json); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		// 使用Viper设置从请求中获取的数据
		viper.Set("SQL", json["SQL"])
		viper.Set("message", json["message"])
		viper.Set("post", json["post"])

		// 输出Viper中存储的数据
		fmt.Println("Received data in Viper:")
		fmt.Println("SQL:", viper.Get("SQL"))
		fmt.Println("Message:", viper.Get("message"))
		fmt.Println("Post:", viper.Get("post"))

		// 向客户端响应处理结果
		c.JSON(200, gin.H{
			"SQL":     viper.Get("SQL"),
			"message": viper.Get("message"),
			"post":    viper.Get("post"),
		})
	})

	// 启动服务器监听在 8000 端口
	r.Run(":8000")
}
