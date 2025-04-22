
```go
package cookie  
  
import (  
    "fmt"  
  
    "github.com/gin-gonic/gin")  
  
func example() {  
  
    router := gin.Default()  
  
    router.GET("/cookie", func(c *gin.Context) {  
  
       cookie, err := c.Cookie("gin_cookie")  
  
       if err != nil {  
          cookie = "NotSet"  
          // 如果不存在就创建一个cookie
          c.SetCookie("gin_cookie", "test", 3600, "/", "localhost", false, true)  
       }  
  
       fmt.Printf("Cookie value: %s \n", cookie)  
    })  
  
    router.Run()  
}
```

如果浏览器中没有名为 `gin_cookie` 的 cookie，就会：

- 设置一个新的 Cookie，名为 `gin_cookie`，值是 `"test"`。
    
- 控制台输出：`Cookie value: NotSet`
    

如果浏览器已经有了这个 Cookie，则会：

- 读取它的值并打印出来。
