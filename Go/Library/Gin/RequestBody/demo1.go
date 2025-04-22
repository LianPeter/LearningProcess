package RequestBody

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"net/http"
)

type form1 struct {
	SQL string `json:"MySQL" form:"SQL"`
}

type form2 struct {
	SQL string `json:"SQL" form:"SQL"`
}

// SomeHandler 一般通过调用 c.Request.Body 方法绑定数据，但不能多次调用这个方法
func SomeHandler(c *gin.Context) {
	obj1 := form1{}
	obj2 := form2{}
	// c.ShouldBind 使用了 c.Request.Body,不能多次读取
	if err1 := c.ShouldBind(&obj1); err1 != nil {
		c.String(http.StatusOK, `the body should be form1`)
		// 因为现在 c.Request.Body 是EOF,所以报错
	} else if err2 := c.ShouldBind(&obj2); err2 != nil {
		c.String(http.StatusOK, `the body should be form2`)
	} else {
		c.String(http.StatusOK, `the body is ok`)
	}
}

// SomeHandler2 要想多次绑定，可以使用 c.ShouldBindBodyWith.
func SomeHandler2(c *gin.Context) {
	objA := form1{}
	objB := form2{}
	// 读取 c.Request.Body 并将结果存入上下文。
	if errA := c.ShouldBindBodyWith(&objA, binding.JSON); errA == nil {
		c.String(http.StatusOK, `the body should be formA`)
		// 这时, 复用存储在上下文中的 body。
	} else if errB := c.ShouldBindBodyWith(&objB, binding.JSON); errB == nil {
		c.String(http.StatusOK, `the body should be formB JSON`)
		// 可以接受其他格式
	} else if errB2 := c.ShouldBindBodyWith(&objB, binding.XML); errB2 == nil {
		c.String(http.StatusOK, `the body should be formB XML`)
	} else {
		c.String(http.StatusOK, `the body is ok`)
	}
}

/*
	c.ShouldBindBodyWith 会在绑定之前将 body 存储到上下文中。
这会对性能造成轻微影响，如果调用一次就能完成绑定的话，那就不要用这个方法。
只有某些格式需要此功能，如 JSON, XML, MsgPack, ProtoBuf。
对于其他格式, 如 Query, Form, FormPost, FormMultipart
可以多次调用 c.ShouldBind() 而不会造成任何性能损失
*/
