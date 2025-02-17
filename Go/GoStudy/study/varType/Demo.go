package main

import (
	"fmt"
	"unsafe"
)

const (
	s      = "abc"
	i      = len(s)
	sizeof = unsafe.Sizeof(i)
)

func main() {
	// 声明一个变量并初始化
	var a = "RUNOOB"
	fmt.Println(a)

	// 没有初始化就为零值
	var b int
	fmt.Println(b)

	// bool 零值为 false
	var c bool
	fmt.Println(c)

	//根据值自行判定变量类型
	var d = true
	fmt.Println(d)

	var e int // 已经使用 var 声明过了，再使用 := 声明变量，就产生编译错误
	e = 100
	fmt.Println(e)

	f := 11111
	fmt.Println(f)

	fmt.Println(s, i, sizeof)
}
