package main

import "fmt"

func main() {
	nums := []int{2, 3, 4}

	// 迭代切片，获取索引和值
	for i, num := range nums {
		fmt.Printf("Index: %d, Value: %d\n", i, num)
	}

	// 仅获取值，忽略索引
	for _, num := range nums {
		fmt.Printf("Value: %d\n", num)
	}

	// 仅获取索引，忽略值
	for i := range nums {
		fmt.Printf("Index: %d\n", i)
	}
}
