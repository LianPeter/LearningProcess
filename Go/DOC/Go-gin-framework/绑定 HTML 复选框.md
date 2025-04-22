main.go
```go
...

type myForm struct {
    Colors []string `form:"colors[]"`
}

...

func formHandler(c *gin.Context) {
    var fakeForm myForm
    c.ShouldBind(&fakeForm)
    c.JSON(200, gin.H{"color": fakeForm.Colors})
}

...
```

form.html
```html
<form action="/" method="POST">
    <p>Check some colors</p>
    <label for="red">Red</label>
    <input type="checkbox" name="colors[]" value="red" id="red">
    <label for="green">Green</label>
    <input type="checkbox" name="colors[]" value="green" id="green">
    <label for="blue">Blue</label>
    <input type="checkbox" name="colors[]" value="blue" id="blue">
    <input type="submit">
</form>
```

在HTML中 ，只要给多个input元素设置同一个`name:colors[]`,那么在 Gin 的结构体中就可以通过：` Colors []string `form:"colors[]"` `来自动收集这些值到一个 `[]string` 的切片中

****** 结果：
{"color":["red","green","blue"]}


