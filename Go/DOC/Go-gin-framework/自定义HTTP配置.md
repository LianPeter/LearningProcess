直接使用 `http.ListenAndServe()`，如下所示：
```go
import "net/http"

func main() {
  router := gin.Default()
  http.ListenAndServe(":8080", router)
}
```

或者
```go
import "net/http"

func main() {
  router := gin.Default()

  s := &http.Server{
    Addr:           ":8080",
    Handler:        router,
    ReadTimeout:    10 * time.Second,
    WriteTimeout:   10 * time.Second,
    MaxHeaderBytes: 1 << 20,
  }
  s.ListenAndServe()
}
```

要理解为什么要自定义，你需要知道，Gin 框架其实是构建在 Go 的标准库 `net/http` 之上的，适合你希望自己手动控制服务，比如未来你想用 `http.ServeTLS`、嵌入多个 handler 或做更细致的控制

第二种方式是构造一个自定义的 `http.Server`，你可以配置很多高级选项，例如超时时间、最大头部大小等，个人认为是底层的控制

你常见的方式通常是这个：`router := gin.Default() router.Run(":8080")`

它内部其实就是调用了：`http.ListenAndServe(":8080", router)`

只不过 **封装了一层**，让你写起来更简单


> 其实他们的功能都是一样的，只是控制的细节不同

