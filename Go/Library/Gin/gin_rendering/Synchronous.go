package main

import (
	"log"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1.创建路由
	// 默认使用了2个中间件Logger(), Recovery()
	r := gin.Default()
	// 1.异步
	r.GET("/long_async", func(c *gin.Context) {
		// 需要搞一个副本
		/*Gin 的 Context 并不是线程安全的。
		如果要在异步 Goroutine 中使用 Context，必须先调用 c.Copy() 创建一个副本。*/
		// 原因：Context 的生命周期由 Gin 控制，路由函数返回后，原始 Context 会被回收。
		copyContext := c.Copy()

		// 异步处理
		go func() {
			time.Sleep(3 * time.Second)
			log.Println("异步执行：" + copyContext.Request.URL.Path)
		}()
	})
	// 2.同步
	r.GET("/long_sync", func(c *gin.Context) {
		time.Sleep(3 * time.Second)
		log.Println("同步执行：" + c.Request.URL.Path)
	})

	r.Run(":8000")
}
