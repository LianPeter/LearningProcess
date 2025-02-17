package main

import "fmt"

func main() {
	fruits := map[string]string{"a": "apple", "b": "banana"}

	// 迭代映射，获取键和值
	for key, value := range fruits {
		fmt.Printf("Key: %s, Value: %s\n", key, value)
	}

	// 仅获取键，忽略值
	for key, _ := range fruits {
		fmt.Printf("Key: %s\n", key)
	}
}
