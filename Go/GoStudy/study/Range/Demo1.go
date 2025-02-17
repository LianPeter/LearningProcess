package main

import "fmt"

// 声明一个包含 2 的幂次方的切片
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

func main() {
	// 遍历 pow 切片，i 是索引，v 是值
	for i, v := range pow {
		// 打印 2 的 i 次方等于 v
		fmt.Printf("2**%d = %d\n", i, v)
	}
	/*
		1. 当用于数组或切片时，range 会返回索引和该索引处的值
		2. 当用于映射时，range 会返回键和值
		3. 当用于字符串时，range 会按照 Unicode 代码点遍历字符串，返回索引和字符的 Unicode 值。
		4. 当用于通道时，range 会从通道中接收值，直到通道被关闭
		5. 可以通过 _ 忽略返回的索引或键值
	*/
	var numbers = []int{1, 2, 3, 4, 5}
	for _, value := range numbers {
		fmt.Println(value)
	}

	var dictionary = map[string]int{"a": 1, "b": 2, "c": 3}
	for key := range dictionary {
		fmt.Println(key)
	}
}
