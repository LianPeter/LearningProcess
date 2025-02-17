package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	/*使用 `make` 函数创建了一个带有缓冲区的通道 `ch`，它可以存储两个整数。
	- `chan int` 表示该通道用于传输 `int` 类型的数据。
	- `2` 表示通道的缓冲区大小为 2，这意味着通道可以存储最多 2 个值而不会阻塞发送操作。 */
	ch <- 1 // 将整数发送到通道ch
	ch <- 2
	close(ch)

	for v := range ch {
		fmt.Println(v)
	}

	channel := make(chan int, 3)
	channel <- 1
	channel <- 2
	channel <- 3
	close(channel)
	for v := range channel {
		fmt.Println(v)
	}
}
