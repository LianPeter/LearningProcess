package main

import "fmt"

func main() {
	i := factorial(10)
	fmt.Println(i)
}

func factorial(num int) int {
	if num <= 1 { // 终止条件
		return 1
	} else {
		return num * factorial(num-1) // 调用本身
	}
}
