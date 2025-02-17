package main

import "fmt"

func main() {
	// 匿名函数
	func() {
		fmt.Println("hello world")
	}()

	// 分配匿名函数到变量中
	Demo := func() {
		fmt.Println("Hello Go!")
	}
	Demo()

	// 在匿名函数中传递参数
	func(element string) {
		fmt.Printf("%s\n", element)
	}("Hello Python")

	// 在变量中传递参数
	Demo1 := func(element string) {
		fmt.Printf("%s\n", element)
	}
	Demo1("Hello java")

}
