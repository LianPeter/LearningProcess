package main

import (
	"fmt"
	"strings"
)

func joinStr(element ...string) string {
	return strings.Join(element, "-")
}
func main() {
	// 零参
	fmt.Println(joinStr())

	// 多参
	fmt.Println(joinStr("hello", "world"))
	fmt.Println(joinStr("hello", "world", "go"))
	fmt.Println(joinStr("hello", "world", "go", "language"))

	//在可变函数中传递一个切片
	element := []string{"geeks", "FOR", "geeks"}
	fmt.Println(joinStr(element...))
}
