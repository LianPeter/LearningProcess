package code

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func NewHTML() {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*") //会加载templates目录下所有的html文件
	data := map[string]string{
		"Title": "index-page",
		"Name":  "memories",
		"Email": "123456@qq.com",
	}
	router.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", data) //该函数的第三个参数就是 要给html模板传递的信息

	})
	router.Run(":8000")
}
