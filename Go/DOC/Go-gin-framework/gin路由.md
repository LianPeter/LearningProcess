Example：

```go
package code  
  
import (  
    "github.com/gin-gonic/gin"  
    "net/http")  
  
// Hello 基本创建路由，设置请求的方式  
func Hello() {  
    // 1.创建路由  
    /*相当于给你创建一个默认的服务员，可以给你打印日志、处理panic、路由  
    你也可以用gin.New()，它不会自动帮你开日志，也不会帮你自动处理崩溃  
    手动添加例子如下：  
    r.Use(gin.Logger())    r.Use(gin.Recovery())    */    r := gin.Default()  
  
    // 2.绑定路由规则，执行的函数  
    // gin.Context，封装了request和response  
    r.GET("/hello", func(c *gin.Context) {  
       /* “c *gin.Context”可以理解为“快递盒子”，他装着和这次请求有关的所有东西  
       而路由代表你走哪条路。  
       1. 请求的路径、参数    c.Param("id") 获取 URL 参数  
       2. 请求的数据（表单、JSON等） c.PostForm("username"), c.BindJSON(&obj)       3. 响应返回给客户端的东西 c.JSON(), c.String()       4. 请求头、请求方法等信息 c.Request.Method, c.GetHeader("Content-Type")*/       // 如果连接成功，则返回200，并且返回对应的format  
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
}```

解释：

1. 使用`gin.Default()`创建了一个默认的路由引擎`r`。这个默认的路由引擎包含了一些中间件，如Logger和Recovery，用于记录日志和处理崩溃。
2. 定义了三个路由规则：
    - `GET /`：当客户端发送GET请求到根路径时，服务器会返回一个状态码为200的响应，并包含字符串"Hello World!"、"\n"（换行）和 "我是gin框架"。需要注意的是，`c.String`方法在HTTP协议中，一个响应只能有一个状态码和一个响应体。
    - `POST /`：当客户端发送POST请求到根路径时，服务器会返回一个JSON格式的响应，包含"massage"、"SQL"和"post"字段。
    - `POST /ping/:id`：这是一个带参数的路由。当客户端发送POST请求到`/ping/任意字符串`时，服务器会解析这个字符串作为路由参数`id`，并返回一个包含该`id`的JSON响应。
3. **启动HTTP服务**：
    - 使用`r.Run(":8000")`启动了HTTP服务，并监听8000端口。这意味着服务器会接受发送到本机8000端口的HTTP请求。

<aside> 💡

Go语言有 **strconv包 用来对 字符串和数值类型的相互转换**

- Parse 系列函数用于将字符串转换为指定类型的值，其中包括 ParseBool()、ParseFloat()、ParseInt()、ParseUint()。
- Format 系列函数实现了将给定类型数据格式化为字符串类型的功能，其中包括 FormatBool()、FormatInt()、FormatUint()、FormatFloat()。
- Append 系列函数用于将指定类型转换成字符串后追加到一个切片中，其中包含 AppendBool()、AppendFloat()、AppendInt()、AppendUint()。 </aside>

# 中间件

除了使用gin默认的路由之外，还可以使用一个新声明的路由，这个新声明的路由没有使用像默认路由那样的中间件 (例如打印请求记录和发生panic后自动恢复的中间件) 。即不会在终端打印请求记录，出现panic后，程序会直接报错并停止。

## 请求新路由

```go
package main
 
import "github.com/gin-gonic/gin"
 
func main() {
	//使用gin.New()声明一个新的路由
	router := gin.New()
	router.GET("/demo", func(c *gin.Context) {
		c.String(200, "hello world!")
	})
 
	router.Run(":8000")
}
```

## **gin.Logger()中间件**

在终端打印请求记录：

```go
package main
 
import "github.com/gin-gonic/gin"
 
func main() {
	router := gin.New()
	
	//使用gin.Logger()中间件
	router.Use(gin.Logger())
	
	router.GET("/demo", func(c *gin.Context) {
		c.String(200, "hello world!")
 
	})
 
	router.Run(":8000")
}
```

## **gin.Recovery()中间件**

像出现panic不使程序停止，我们可以使用gin.Recovery()中间件

使用方法为router.Use(gin.Recovery())

```go
package main
 
import "github.com/gin-gonic/gin"
 
func main() {
	router := gin.New()
 
	router.Use(gin.Logger())
	router.Use(gin.Recovery()) //使用gin.Recovery()中间件
 
	router.GET("/demo", func(c *gin.Context) {
		c.String(200, "hello world!")
 
	})
 
	router.Run(":8000")
}
```

# HTML的渲染

```go
package main
 
import (
	"github.com/gin-gonic/gin"
	"net/http"
)
 
func main() {
	router := gin.Default()
	router.LoadHTMLGlob("temp/*") //会加载temp目录下所有的html文件
	data := map[string]string{
		"Title": "index-page",
		"Name":  "memories",
		"Email": "123456@123.com",
	}
	router.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", data) //该函数的第三个参数就是 要给html模板传递的信息
 
	})
	router.Run(":8000")
}
```

要传递的信息data不仅可以使map类型，还可以是struct、JSON等等类型

```go
package main
 
import (
	"github.com/gin-gonic/gin"
	"net/http"
)
 
func main() {
	router := gin.Default()
	router.LoadHTMLGlob("temp/*") //会加载temp目录下所有的html文件
 
	router.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"Title": "index-page",
			"Name":  "memories",
			"Email": "123456@qq.com",
		}) //gin.H类型的信息
 
	})
	router.Run(":8000")
}
```

```go
package main
 
import (
	"github.com/gin-gonic/gin"
	"net/http"
)
 
func main() {
	router := gin.Default()
	router.LoadHTMLGlob("temp/*") //会加载temp目录下所有的html文件
 
	data := &struct {
		Title string //注意：这里的字段的首字母必须要大写，这是go语言字段访问权限的部分的知识
		Name  string
		Email string
	}{
		Title: "index-page",
		Name:  "memories",
		Email: "123456@123.com",
	}
	router.GET("/index", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", data) //struct类型的信息
 
	})
	router.Run(":8000")
}
```

# api

```go
package code

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func Demo() {
	r := gin.Default()
	// 这里的:和* 都是gin框架的语法，不是go语法
	r.GET("/user/:name/*action", func(c *gin.Context) {
		name := c.Param("name")     // url 中 :name 的参数
		action := c.Param("action") // url 中 *action 的参数
		// 截取 /
		action = strings.Trim(action, "/")
		c.String(http.StatusOK, name+" is "+action)
	})
	r.Run(":8000")
}

```

## 解释：

在 Gin 框架中，路由路径中的 `*` 和 `:` 有特殊的意义，它们用于定义路径参数和通配符。

### `:name`

- `:` 用于定义路径参数。这意味着它将捕获路径中的一部分并将其传递给处理函数。
- 在你的代码中，`/user/:name/*action` 表示 `/user` 路径下的任何子路径，其中 `:name` 部分是一个路径参数。例如，访问 `/user/Leon` 会捕获 `Leon` 作为 `name` 的值。

### `action`

- 用于定义一个通配符参数，它会匹配路径中剩余的所有部分。通配符参数总是最后一个参数。
- 在你的代码中，`action` 表示在路径中匹配 `:name` 之后的所有内容。例如，访问 `/user/Leon/playing/guitar` 会捕获 `playing/guitar` 作为 `action` 的值。这里的 `action` 会匹配 `playing/guitar`，并且在你的代码中通过 `strings.Trim(action, "/")` 去掉了路径两端的斜杠 `/`。

### 代码分析

```go
package main

import (
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.GET("/user/:name/*action", func(c *gin.Context) {
        name := c.Param("name")
        action := c.Param("action")
        // 去掉 action 两端的斜杠
        action = strings.Trim(action, "/")
        c.String(http.StatusOK, name+" is "+action)
    })
    // 默认监听8000端口
    r.Run(":8000")
}

```

- `r.GET("/user/:name/*action", func(c *gin.Context) {...})` 定义了一个 GET 请求的处理函数，其中 `:name` 和 `action` 是路径参数。
- `c.Param("name")` 获取路径参数 `name` 的值。
- `c.Param("action")` 获取通配符参数 `action` 的值。
- `strings.Trim(action, "/")` 去掉 `action` 两端的斜杠。
- `c.String(http.StatusOK, name+" is "+action)` 生成一个响应字符串，并返回状态码 `200 OK`。

### 示例

假设服务器运行在 `localhost:8000`，以下是一些示例请求和对应的响应：

- 请求：`GET /user/Leon/playing/guitar`
    - `name`: `Leon`
    - `action`: `playing/guitar`
    - 响应：`Leon is playing/guitar`
- 请求：`GET /user/Alice/running`
    - `name`: `Alice`
    - `action`: `running`
    - 响应：`Alice is running`

# url参数

- URL参数可以通过DefaultQuery()或Query()方法获取
- DefaultQuery()若参数不存在，返回默认值，Query()若不存在，返回空串
- API ? name=xxx

```go
func Url() {
	r := gin.Default()
	r.GET("/user", func(c *gin.Context) {
		//指定默认值
		//http://localhost:8080/user 才会打印出来默认的值
		name := c.DefaultQuery("name", "枯藤")
		// DefaultQuery()若参数不存在，则返回默认值
		c.String(http.StatusOK, fmt.Sprintf("hello %s", name))
	})
	r.Run()

}
```

# 表单参数

表单参数在Web应用开发中非常重要，尤其是在处理用户输入和数据提交方面。

## 应用场景

### 1. **用户注册和登录**：

在用户注册和登录页面，表单用于收集用户的用户名、密码、电子邮件地址等信息。然后，将这些数据提交到服务器进行处理和验证。

### 2. **搜索和过滤功能**：

表单参数常用于搜索框和过滤选项，例如在电商网站中，用户可以通过表单参数来搜索产品、设置价格范围、选择分类等。

### 3. **数据提交和保存**：

当用户填写问卷、反馈表或创建新记录（如博客文章、评论、产品信息）时，表单参数用于将这些数据提交到服务器进行保存。

### 4. **更新和编辑信息**：

在编辑页面中，表单参数用于获取和提交修改后的数据。例如，用户可以编辑个人资料、修改地址、更新密码等。

### 5. **文件上传**：

表单参数也用于文件上传，例如上传图片、文档或其他文件。用户通过表单选择文件并提交到服务器进行存储和处理。

### 6. **支付和订购流程**：

在购物车和结账页面，表单参数用于收集用户的订单信息、支付方式、送货地址等数据，并提交到服务器处理订单。

### 7. **动态查询参数**：

在动态Web应用中，URL查询参数用于传递用户选择的选项或筛选条件，这些参数可以通过表单来获取并提交。例如，用户可以在地图应用中选择不同的过滤条件（如距离、价格范围），这些信息通过查询参数传递并更新页面内容。

- 表单传输为post请求，http常见的传输格式为四种：
    - application/json
    - application/x-www-form-urlencoded
    - application/xml
    - multipart/form-data
- 表单参数可以通过PostForm()方法获取，该方法默认解析的是x-www-form-urlencoded或from-data格式的参数

Demo:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<form action="<http://localhost:8000/form>" method="post" action="application/x-www-form-urlencoded">
    用户名：<input type="text" name="username" placeholder="请输入你的用户名">
    <br>
    密码：<input type="password" name="userpassword" placeholder="请输入你的密码">
    <br>
    <input type="submit" value="提交">
</form>
</body>
</html>
```

```go
package main

//
import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.POST("/form", func(c *gin.Context) {
		types := c.DefaultPostForm("type", "post")
		username := c.PostForm("username")
		password := c.PostForm("userpassword")
		// c.String(http.StatusOK, fmt.Sprintf("username:%s,password:%s,type:%s", username, password, types))
		c.String(http.StatusOK, fmt.Sprintf("username:%s,password:%s,type:%s", username, password, types))
	})
	r.Run(":8000")
}

```

Example：

在Go语言中的Gin框架中，处理表单参数是非常方便的。Gin框架提供了一些方法来获取和处理表单数据。

### 处理表单参数

1. **解析URL查询参数**：
    
    ```go
    package main
    
    import (
        "github.com/gin-gonic/gin"
    )
    
    func main() {
        r := gin.Default()
    
        r.GET("/get", func(c *gin.Context) {
            name := c.Query("name")
            age := c.DefaultQuery("age", "18")
            c.String(200, "Name: %s, Age: %s", name, age)
        })
    
        r.Run(":8080")
    }
    
    ```
    
    在这个例子中，`c.Query("name")` 获取URL查询参数`name`，`c.DefaultQuery("age", "18")` 获取URL查询参数`age`，如果未提供，则默认为18。
    
2. **解析表单参数**：
    
    ```go
    package main
    
    import (
        "github.com/gin-gonic/gin"
    )
    
    func main() {
        r := gin.Default()
    
        r.POST("/post", func(c *gin.Context) {
            name := c.PostForm("name")
            message := c.DefaultPostForm("message", "no message")
            c.String(200, "Name: %s, Message: %s", name, message)
        })
    
        r.Run(":8080")
    }
    
    ```
    
    在这个例子中，`c.PostForm("name")` 获取表单参数`name`，`c.DefaultPostForm("message", "no message")` 获取表单参数`message`，如果未提供，则默认为"no message"。
    
3. **绑定结构体**：
    
    ```go
    package main
    
    import (
        "github.com/gin-gonic/gin"
    )
    
    type Login struct {
        Username string `form:"username" json:"username" binding:"required"`
        Password string `form:"password" json:"password" binding:"required"`
    }
    
    func main() {
        r := gin.Default()
    
        r.POST("/login", func(c *gin.Context) {
            var json Login
            if err := c.ShouldBind(&json); err != nil {
                c.JSON(400, gin.H{"error": err.Error()})
                return
            }
            if json.Username != "admin" || json.Password != "admin" {
                c.JSON(401, gin.H{"status": "unauthorized"})
                return
            }
            c.JSON(200, gin.H{"status": "you are logged in"})
        })
    
        r.Run(":8080")
    }
    
    ```
    
    在这个例子中，Gin自动将请求参数绑定到结构体`Login`，并验证必要字段是否存在。通过`c.ShouldBind`方法，Gin会根据Content-Type自动选择合适的绑定器。
    

### 总结

Gin框架提供了一些简单而强大的方法来处理表单参数和URL查询参数。通过直接获取参数，或绑定到结构体来处理请求数据，使代码更简洁和易于维护。😊

# 上传单个文件

- multipart/form-data格式用于文件上传
- gin文件上传与原生的net/http方法类似，不同在于gin把原生的request封装到c.Request中

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="<http://localhost:8080/upload>" method="post" enctype="multipart/form-data">
          上传文件:<input type="file" name="file" >
          <input type="submit" value="提交">
    </form>
</body>
</html>
```

```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    //限制上传最大尺寸
    r.MaxMultipartMemory = 8 << 20
    r.POST("/upload", func(c *gin.Context) {
        file, err := c.FormFile("file")
        if err != nil {
            c.String(500, "上传图片出错")
        }
        // c.JSON(200, gin.H{"message": file.Header.Context})
        c.SaveUploadedFile(file, file.Filename)
        c.String(http.StatusOK, file.Filename)
    })
    r.Run()
}
```

## 上传特定文件

```go
package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()
    r.POST("/upload", func(c *gin.Context) {
        _, headers, err := c.Request.FormFile("file")
        if err != nil {
            log.Printf("Error when try to get file: %v", err)
        }
        //headers.Size 获取文件大小
        if headers.Size > 1024*1024*2 {
            fmt.Println("文件太大了")
            return
        }
        //headers.Header.Get("Content-Type")获取上传文件的类型
        if headers.Header.Get("Content-Type") != "image/png" {
            fmt.Println("只允许上传png图片")
            return
        }
        c.SaveUploadedFile(headers, "./video/"+headers.Filename)
        c.String(http.StatusOK, headers.Filename)
    })
    r.Run()
}
```

Example：

### HTML表单

首先，我们需要一个HTML表单来让用户选择文件并提交。以下是一个简单的HTML表单示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Upload File</title>
</head>
<body>
    <form action="<http://localhost:8080/upload>" method="post" enctype="multipart/form-data">
          上传文件: <input type="file" name="file">
          <input type="submit" value="提交">
    </form>
</body>
</html>

```

这个表单使用了 `multipart/form-data` 编码类型，这对于文件上传是必需的。表单的 `action` 属性指向我们的Gin服务器的 `/upload` 路由，`method` 设置为 `post`。

### Gin服务器端代码

接下来，我们编写服务器端代码来处理文件上传请求。以下是一个基本的Gin服务器设置，用于接收和保存上传的文件：

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    // 限制上传文件的大小为8MB
    r.MaxMultipartMemory = 8 << 20

    r.POST("/upload", func(c *gin.Context) {
        // 获取上传的文件
        file, err := c.FormFile("file")
        if err != nil {
            c.String(http.StatusInternalServerError, "上传文件出错: %v", err)
            return
        }

        // 保存文件到服务器本地
        if err := c.SaveUploadedFile(file, file.Filename); err != nil {
            c.String(http.StatusInternalServerError, "保存文件出错: %v", err)
            return
        }

        c.String(http.StatusOK, "文件 %s 上传成功", file.Filename)
    })

    r.Run(":8080")
}

```

### 详细解释

1. **引入Gin包**：
    
    ```go
    import "github.com/gin-gonic/gin"
    
    ```
    
    我们需要引入Gin包来使用Gin框架的功能。
    
2. **设置上传文件大小限制**：
    
    ```go
    r.MaxMultipartMemory = 8 << 20
    
    ```
    
    这行代码设置了上传文件的大小限制为8MB，防止上传过大的文件导致服务器崩溃。
    
3. **定义文件上传的路由**：
    
    ```go
    r.POST("/upload", func(c *gin.Context) {
        ...
    })
    
    ```
    
    我们定义了一个POST请求的路由 `/upload` 来处理文件上传请求。
    
4. **获取上传的文件**：
    
    ```go
    file, err := c.FormFile("file")
    if err != nil {
        c.String(http.StatusInternalServerError, "上传文件出错: %v", err)
        return
    }
    ```
    
    使用 `c.FormFile("file")` 获取上传的文件。如果获取失败，我们返回一个错误信息。
    
5. **保存文件到服务器本地**：
    
    ```go
    if err := c.SaveUploadedFile(file, file.Filename); err != nil {
        c.String(http.StatusInternalServerError, "保存文件出错: %v", err)
        return
    }
    
    ```
    
    使用 `c.SaveUploadedFile(file, file.Filename)` 将文件保存到服务器的本地文件系统。如果保存失败，我们返回一个错误信息。
    
6. **返回成功信息**：
    
    ```go
    c.String(http.StatusOK, "文件 %s 上传成功", file.Filename)
    
    ```
    
    如果文件保存成功，我们返回一个成功信息。
    

### 😊

# 上传多个文件

### HTML表单

首先，我们需要一个HTML表单来让用户选择多个文件并提交。以下是一个简单的HTML表单示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Upload Multiple Files</title>
</head>
<body>
    <form action="<http://localhost:8080/upload>" method="post" enctype="multipart/form-data">
          上传文件: <input type="file" name="files" multiple>
          <input type="submit" value="提交">
    </form>
</body>
</html>

```

这个表单使用了 `multiple` 属性，允许用户选择多个文件并一次性提交。表单的 `action` 属性指向我们的Gin服务器的 `/upload` 路由，`method` 设置为 `post`。

### Gin服务器端代码

接下来，我们编写服务器端代码来处理多个文件上传请求。以下是Gin服务器的基本设置，用于接收和保存上传的多个文件：

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    // 限制上传文件的大小为8MB
    r.MaxMultipartMemory = 8 << 20

    r.POST("/upload", func(c *gin.Context) {
        form, err := c.MultipartForm()
        if err != nil {
            c.String(http.StatusBadRequest, "获取表单数据出错: %v", err)
            return
        }

        files := form.File["files"]

        for _, file := range files {
            // 保存文件到服务器本地
            if err := c.SaveUploadedFile(file, file.Filename); err != nil {
                c.String(http.StatusInternalServerError, "保存文件出错: %v", err)
                return
            }
        }

        c.String(http.StatusOK, "上传 %d 个文件成功", len(files))
    })

    r.Run(":8080")
}

```

### 详细解释

1. **引入Gin包**：
    
    ```go
    import "github.com/gin-gonic/gin"
    
    ```
    
    我们需要引入Gin包来使用Gin框架的功能。
    
2. **设置上传文件大小限制**：
    
    ```go
    r.MaxMultipartMemory = 8 << 20
    
    ```
    
    这行代码设置了上传文件的大小限制为8MB，防止上传过大的文件导致服务器崩溃。
    
3. **定义文件上传的路由**：
    
    ```go
    r.POST("/upload", func(c *gin.Context) {
        ...
    })
    
    ```
    
    我们定义了一个POST请求的路由 `/upload` 来处理文件上传请求。
    
4. **获取上传的表单数据**：
    
    ```go
    form, err := c.MultipartForm()
    if err != nil {
        c.String(http.StatusBadRequest, "获取表单数据出错: %v", err)
        return
    }
    files := form.File["files"]
    
    ```
    
    使用 `c.MultipartForm()` 获取表单数据，并提取文件列表 `files`。
    
5. **保存文件到服务器本地**：
    
    ```go
    for _, file := range files {
        if err := c.SaveUploadedFile(file, file.Filename); err != nil {
            c.String(http.StatusInternalServerError, "保存文件出错: %v", err)
            return
        }
    }
    
    ```
    
    使用一个循环遍历所有上传的文件，并将它们保存到服务器的本地文件系统。
    
6. **返回成功信息**：
    
    ```go
    c.String(http.StatusOK, "上传 %d 个文件成功", len(files))
    
    ```
    
    如果所有文件保存成功，我们返回一个包含上传文件数量的成功信息。.
    
    ### 例子
    

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="<http://localhost:8000/upload>" method="post" enctype="multipart/form-data">
          上传文件:<input type="file" name="files" multiple>
          <input type="submit" value="提交">
    </form>
</body>
</html>
```

```go
package main

import (
   "github.com/gin-gonic/gin"
   "net/http"
   "fmt"
)

// gin的helloWorld

func main() {
   // 1.创建路由
   // 默认使用了2个中间件Logger(), Recovery()
   r := gin.Default()
   // 限制表单上传大小 8MB，默认为32MB
   r.MaxMultipartMemory = 8 << 20
   r.POST("/upload", func(c *gin.Context) {
      form, err := c.MultipartForm()
      if err != nil {
         c.String(http.StatusBadRequest, fmt.Sprintf("get err %s", err.Error()))
      }
      // 获取所有图片
      files := form.File["files"]
      // 遍历所有图片
      for _, file := range files {
         // 逐个存
         if err := c.SaveUploadedFile(file, file.Filename); err != nil {
            c.String(http.StatusBadRequest, fmt.Sprintf("upload err %s", err.Error()))
            return
         }
      }
      c.String(200, fmt.Sprintf("upload ok %d files", len(files)))
   })
   //默认端口号是8080
   r.Run(":8000")
}
```

# routes group

> routes group是为了管理一些相同的URL

在Gin框架中，路由分组（Routes Group）是一种组织和管理路由的有效方式。通过使用路由分组，你可以将相关的路由归类，以便更好地组织代码和增强可读性。

### 为什么使用路由分组？

1. **结构化代码**：将相关的路由归类到一个组，可以使代码更有组织性和可读性。
2. **统一中间件**：为一组路由统一应用中间件，例如身份验证、日志记录等。
3. **简化前缀管理**：通过为路由组设置公共前缀，可以简化路由定义。

### 如何定义路由分组？

你可以使用 `Group` 方法来创建路由分组。以下是一个基本的示例：

```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    // 创建一个路由分组，设置公共前缀 /api
    api := r.Group("/api")
    {
        api.GET("/ping", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "pong",
            })
        })
    }

    // 创建另一个路由分组，设置公共前缀 /admin
    admin := r.Group("/admin")
    {
        admin.GET("/dashboard", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "admin dashboard",
            })
        })
    }

    r.Run(":8080")
}

```

### 示例详细解释

1. **引入Gin包**：
    
    ```go
    import "github.com/gin-gonic/gin"
    
    ```
    
    我们需要引入Gin包来使用Gin框架的功能。
    
2. **创建Gin实例**：
    
    ```go
    r := gin.Default()
    
    ```
    
    使用 `gin.Default()` 创建一个默认的Gin实例。
    
3. **定义路由分组**：
    
    ```go
    api := r.Group("/api")
    {
        api.GET("/ping", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "pong",
            })
        })
    }
    
    ```
    
    使用 `r.Group("/api")` 创建一个路由分组 `api`，所有在这个组内定义的路由都会有 `/api` 前缀。在这个例子中，`/api/ping` 路由会返回 `{"message": "pong"}` 的JSON响应。
    
4. **另一个路由分组示例**：
    
    ```go
    admin := r.Group("/admin")
    {
        admin.GET("/dashboard", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "admin dashboard",
            })
        })
    }
    
    ```
    
    同样地，我们创建了一个 `/admin` 路由分组，并定义了一个 `/admin/dashboard` 路由。
    

### 使用中间件

你还可以为路由分组添加中间件。例如，以下代码为 `/admin` 路由组添加身份验证中间件：

```go
package main

import (
    "github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // 假设这是一个简单的身份验证逻辑
        token := c.GetHeader("Authorization")
        if token != "valid-token" {
            c.JSON(401, gin.H{
                "message": "Unauthorized",
            })
            c.Abort()
            return
        }
        c.Next()
    }
}

func main() {
    r := gin.Default()

    admin := r.Group("/admin")
    admin.Use(AuthMiddleware())
    {
        admin.GET("/dashboard", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "admin dashboard",
            })
        })
    }

    r.Run(":8080")
}

```

在这个示例中，我们创建了一个简单的身份验证中间件，并将其应用到 `/admin` 路由组。

---

Demo:

```go
package main

import (
   "github.com/gin-gonic/gin"
   "fmt"
)

// gin的helloWorld

func main() {
   // 1.创建路由
   // 默认使用了2个中间件Logger(), Recovery()
   r := gin.Default()
   // 路由组1 ，处理GET请求
   v1 := r.Group("/v1")
   // {} 是书写规范
   {
      v1.GET("/login", login)
      v1.GET("submit", submit)
   }
   v2 := r.Group("/v2")
   {
      v2.POST("/login", login)
      v2.POST("/submit", submit)
   }
   r.Run(":8000")
}

func login(c *gin.Context) {
   name := c.DefaultQuery("name", "jack")
   c.String(200, fmt.Sprintf("hello %s\\n", name))
}

func submit(c *gin.Context) {
   name := c.DefaultQuery("name", "lily")
   c.String(200, fmt.Sprintf("hello %s\\n", name))
}
```

# 路由原理

### 路由基本原理

1. **请求处理**：
    - 当一个HTTP请求到达服务器时，服务器首先解析请求的URL和HTTP方法（GET、POST、PUT、DELETE等）。
2. **路由匹配**：
    - 服务器根据URL和HTTP方法寻找匹配的路由规则。每个路由规则通常由一个路径模式和一个处理函数组成。
3. **路径参数**：
    - 路由规则可以包含路径参数，它们是动态部分，在请求时可以被捕获。例如，路径 `/user/:id` 中的 `:id` 是一个路径参数，可以匹配任何值。
4. **处理函数**：
    - 一旦找到匹配的路由规则，服务器将请求传递给对应的处理函数来执行。处理函数通常会执行一系列操作，如数据库查询、业务逻辑处理、生成响应内容等。

### Gin框架中的路由示例

下面是一个简单的Gin框架路由示例，帮助解释路由原理：

```go
package main

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func main() {
    r := gin.Default()

    // 定义一个简单的GET路由
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })

    // 定义带有路径参数的路由
    r.GET("/user/:id", func(c *gin.Context) {
        id := c.Param("id")
        c.JSON(200, gin.H{
            "user_id": id,
        })
    })

    // 定义POST路由
    r.POST("/login", func(c *gin.Context) {
        username := c.PostForm("username")
        password := c.PostForm("password")
        if username == "admin" && password == "admin" {
            c.JSON(200, gin.H{
                "status": "you are logged in",
            })
        } else {
            c.JSON(401, gin.H{
                "status": "unauthorized",
            })
        }
    })

    r.Run(":8080")
}

```

### 详细解释

1. **简单的GET路由**：
    
    ```go
    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
    
    ```
    
    - 当一个GET请求访问 `/ping` 路径时，Gin会匹配到这个路由规则，并执行对应的处理函数，返回一个包含 `message` 字段的JSON响应。
2. **带有路径参数的路由**：
    
    ```go
    r.GET("/user/:id", func(c *gin.Context) {
        id := c.Param("id")
        c.JSON(200, gin.H{
            "user_id": id,
        })
    })
    
    ```
    
    - 当一个GET请求访问 `/user/:id` 路径时，Gin会匹配到这个路由规则，并捕获路径中的 `id` 参数。处理函数中，使用 `c.Param("id")` 获取路径参数的值，并返回一个包含 `user_id` 字段的JSON响应。
3. **POST路由**：
    
    ```go
    r.POST("/login", func(c *gin.Context) {
        username := c.PostForm("username")
        password := c.PostForm("password")
        if username == "admin" && password == "admin" {
            c.JSON(200, gin.H{
                "status": "you are logged in",
            })
        } else {
            c.JSON(401, gin.H{
                "status": "unauthorized",
            })
        }
    })
    
    ```
    
    - 当一个POST请求访问 `/login` 路径时，Gin会匹配到这个路由规则，并在处理函数中使用 `c.PostForm` 方法获取表单数据。根据用户名和密码的验证结果，返回不同的JSON响应。

### 路由组

Gin框架还支持路由分组（Routes Group），可以将相关路由组织在一起，简化代码管理并应用统一的中间件。

```go
package main

import (
    "github.com/gin-gonic/gin"
)

func main() {
    r := gin.Default()

    api := r.Group("/api")
    {
        api.GET("/ping", func(c *gin.Context) {
            c.JSON(200, gin.H{
                "message": "pong",
            })
        })

        api.GET("/user/:id", func(c *gin.Context) {
            id := c.Param("id")
            c.JSON(200, gin.H{
                "user_id": id,
            })
        })
    }

    r.Run(":8080")
}

```