package main

import "fmt"

// Add 定义 Add 函数，接收两个 int 类型参数并返回 int 类型的结果
func Add(a, b int) int {
	return a + b
}

func main() {
	result := Add(10, 20)
	fmt.Println(result)
}
