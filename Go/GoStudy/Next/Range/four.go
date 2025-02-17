package main

import "fmt"

func main() {
	ch := make(chan int, 3)
	ch <- 1
	ch <- 2
	ch <- 3
	close(ch)

	// 迭代通道，获取值
	for value := range ch {
		fmt.Printf("Value: %d\n", value)
	}
}
