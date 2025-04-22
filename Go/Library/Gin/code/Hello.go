package code

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// Hello 基本创建路由，设置请求的方式
func Hello() {
	// 1.创建路由
	/*相当于给你创建一个默认的服务员，可以给你打印日志、处理panic、路由
	你也可以用gin.New()，它不会自动帮你开日志，也不会帮你自动处理崩溃
	手动添加例子如下：
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	*/
	r := gin.Default()

	// 2.绑定路由规则，执行的函数
	// gin.Context，封装了request和response
	r.GET("/hello", func(c *gin.Context) {
		/* “c *gin.Context”可以理解为“快递盒子”，他装着和这次请求有关的所有东西
		而路由代表你走哪条路。
		1. 请求的路径、参数	c.Param("id") 获取 URL 参数
		2. 请求的数据（表单、JSON等）	c.PostForm("username"), c.BindJSON(&obj)
		3. 响应返回给客户端的东西	c.JSON(), c.String()
		4. 请求头、请求方法等信息	c.Request.Method, c.GetHeader("Content-Type")*/
		// 如果连接成功，则返回200，并且返回对应的format
		c.String(http.StatusOK, "Hello World!"+"\n"+"我是Gin框架")
	})
	r.POST("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "helloGin",
			"SQL":     "MySQL",
			"post":    8080,
		})
	})

	// 当我在id中输入什么，就返回什么id
	r.POST("/ping/:id", func(c *gin.Context) {
		ID := c.Param("id") // Param()用于获取路由参数
		c.JSON(200, gin.H{
			"id": ID,
		})
	})
	// 3.监听端口，默认在8080
	// Run("里面不指定端口号默认为8080")
	r.Run(":8000")
}

func NewRouter() {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery()) // 使用中间件
	r.GET("/demo", func(c *gin.Context) {
		c.String(200, "hello world!")
	})
	err := r.Run(":8000") // 注意有个冒号
	if err != nil {
		return
	}
}
