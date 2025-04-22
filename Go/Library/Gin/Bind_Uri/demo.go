package Bind_Uri

import "github.com/gin-gonic/gin"

// 通过 URL 路径中的参数绑定到结构体字段中

type Person struct {
	ID   string `uri:"id" binding:"required"`
	Name string `uri:"name" binding:"required"`
	// binding:"required"这个字段是必须要提供的，Gin 会自动做校验
}

func example() {
	// 创建一个新的 Gin 引擎
	r := gin.Default()

	// 定义一个路由，使用 URI 参数绑定
	r.GET("/user/:id/:name", func(c *gin.Context) {
		var person Person
		if err := c.ShouldBindUri(&person); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, gin.H{"id": person.ID, "name": person.Name})
	})

	// 启动服务器
	r.Run(":8080")
}
