package main

import "fmt"

func main() {
	str := "hello"

	// 迭代字符串，获取索引和Unicode值
	for i, ch := range str {
		fmt.Printf("Index: %d, Unicode: %d, Character: %c\n", i, ch, ch)
	}
}
