package main

import "fmt"

// Writer 定义一个接口 Writer
type Writer interface {
	Write(data []byte) (int, error)
}

// StringWriter 实现 Writer 接口的结构体 StringWriter
type StringWriter struct {
	str string
}

// 实现 Writer 方法
func (sw *StringWriter) Write(data []byte) (int, error) {
	sw.str += string(data)
	return len(data), nil
}

func main() {
	// 创建一个 StringWriter 实例并赋值给 Writer 接口变量
	var w Writer = &StringWriter{}

	// 将 Writer 接口类型转换为 StringWriter 类型
	sw := w.(*StringWriter)

	// 修改 StringWriter 的字段
	sw.str = "Hello, World"

	// 打印 StringWriter 的字段值
	fmt.Println(sw.str)
}
