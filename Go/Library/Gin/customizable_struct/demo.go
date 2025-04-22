package customizable_struct

import "github.com/gin-gonic/gin"

type StructA struct {
	// 用于从表单字段 field_a 获取值
	FieldA string `form:"field_a"`
}

type StructB struct { // 结构体嵌套
	NestedStruct StructA
	FieldB       string `form:"field_b"`
	// 表单请求中可以传递：/getb?field_a=hello&field_b=world
}

type StructC struct { // 指针嵌套结构体
	NestedStructPointer *StructA
	FieldC              string `form:"field_c"`
}

type StructD struct { // 匿名结构体嵌套
	NestedAnonyStruct struct {
		FieldX string `form:"field_x"`
	}
	FieldD string `form:"field_d"`
}

func GetDataB(c *gin.Context) {
	var b StructB
	c.Bind(&b) // 绑定请求数据到结构体

	/*
				c.Bind()	会返回绑定错误，并且如果有错就直接 Abort
				c.ShouldBind()	更推荐用法，不会中断请求处理流程

			c.Bind(&b) 就是让 Gin 帮你把请求参数自动装进 b 这个结构体里，
			根据结构体字段的标签 form:"xxx" 或 json:"xxx" 来匹配参数名。

		或许我给个链接实例就更好理解了：
		http://localhost:8080/getb?field_a=Hello&field_b=World

	*/

	c.JSON(200, gin.H{
		"a": b.NestedStruct,
		"b": b.FieldB,
	})
	// 返回一个 JSON，包括嵌套字段 a（来自 field_a）和字段 b（来自 field_b）
}

func GetDataC(c *gin.Context) {
	var b StructC
	c.Bind(&b)
	c.JSON(200, gin.H{
		"a": b.NestedStructPointer,
		"c": b.FieldC,
	})
	// 返回 JSON：a 是一个嵌套对象（field_a），c 是自己的字段
}

func GetDataD(c *gin.Context) {
	var b StructD
	c.Bind(&b)
	c.JSON(200, gin.H{
		"x": b.NestedAnonyStruct,
		"d": b.FieldD,
	})
	// JSON 返回结构体 x 和字段 d
}

// 一个例子，虽然不在main包下，为了方便这样子做而已，往后也是如此
func main() {
	router := gin.Default()
	router.GET("/getb", GetDataB)
	router.GET("/getc", GetDataC)
	router.GET("/getd", GetDataD)

	router.Run()
}

// 目前仅支持没有 form 的嵌套结构体。
