package main

import "fmt"

func main() {
	// 创建一个空的 map，key 是 int 类型，value 是 float32 类型
	map1 := make(map[int]float32)

	// 向 map1 中添加 key-value 对
	map1[1] = 1.0
	map1[2] = 2.0
	map1[3] = 3.0
	map1[4] = 4.0

	// 遍历 map1，读取 key 和 value
	for key, value := range map1 {
		// 打印 key 和 value
		fmt.Printf("key is: %d - value is: %f\n", key, value)
	}

	// 遍历 map1，只读取 key
	for key, _ := range map1 {
		// 打印 key
		fmt.Printf("key is: %d\n", key)
	}

	// 遍历 map1，只读取 value
	for _, value := range map1 {
		// 打印 value
		fmt.Printf("value is: %f\n", value)
	}
}
