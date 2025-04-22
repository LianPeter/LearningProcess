package code

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func Demo() {
	r := gin.Default()
	//这里的:和* 都是gin框架的语法，不是go语法
	// : 捕获路径中name的参数
	// * 捕获路径中除了 :name 之后的所有参数
	r.GET("/user/:name/*action", func(c *gin.Context) {
		name := c.Param("name")     // url 中 :name 的参数
		action := c.Param("action") // url 中 *action 的参数
		// 截取 /
		action = strings.Trim(action, "/") // 去掉路径两端的斜杠
		c.String(http.StatusOK, name+" is "+action)
	})
	r.Run(":8000")
}
func Url() {

	r := gin.Default()
	r.GET("/user1", func(c *gin.Context) {
		//指定默认值
		//http://localhost:8080/user 才会打印出来默认的值
		name := c.DefaultQuery("name", "枯藤")
		// DefaultQuery()若参数不存在，则返回默认值
		c.String(http.StatusOK, fmt.Sprintf("hello %s", name))
	})
	r.Run(":8010")

}
