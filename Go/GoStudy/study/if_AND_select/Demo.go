package main

import (
	"fmt"
	"time"
)

func main() {
	const name = "Peter"
	const name1 = "David"
	if false {
		fmt.Println(name)
	} else {
		fmt.Println(name1)
	}

	// 创建两个通道
	nameCh := make(chan string)
	name1Ch := make(chan string)

	// 启动一个goroutine向nameCh发送消息
	go func() {
		time.Sleep(1 * time.Second)
		nameCh <- "Alice"
	}()

	// 启动一个goroutine向name1Ch发送消息
	go func() {
		time.Sleep(2 * time.Second)
		name1Ch <- "Bob"
	}()

	// 使用select语句处理从通道中接收的消息
	select {
	case name := <-nameCh: // 接收来自nameCh的消息并赋值给name
		fmt.Println(name)
	case name1 := <-name1Ch: // 接收来自name1Ch的消息并赋值给name1
		fmt.Println(name1)
	}
}
