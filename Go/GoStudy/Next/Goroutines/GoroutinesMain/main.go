package main

import (
	. "GitHub/LianPeter/GoStudy/Next/Goroutines"
	"fmt"
	"time"
) // 使用正斜杠

func main() {
	// 调用 Goroutine
	go Display("Welcome") // 调用导入包中的 display 函数

	// 正常调用函数
	Display("(cainiaoplus.com)") // 调用导入包中的 display 函数

	fmt.Println("-------------------")

	fmt.Println("!...主 Go-routine 开始...!")

	// 调用 Goroutine 1
	go Aname()

	// 调用 Goroutine 2
	go Aid()

	time.Sleep(3500 * time.Millisecond)
	fmt.Println("\n!...主 Go-routine 结束...!")

	fmt.Println("-------------------")
	fmt.Println("!...使用 select 语句...!")

	// 创建通道
	R1 := make(chan string)
	R2 := make(chan string)

	// 使用goroutine调用函数1和函数2
	go Portal1(R1)
	go Portal2(R2)

	select {
	case op1 := <-R1:
		fmt.Println(op1)
	case op2 := <-R2:
		fmt.Println(op2)
	}

	fmt.Println("-------------------")
	fmt.Println("主方法开始......")
	ch := make(chan int)
	go Myfunc(ch)
	ch <- 23
	fmt.Println("主方法结束!!!!!!")

	fmt.Println("******************")
	//创建通道
	c := make(chan string)

	// 使用 Goroutine
	go ForClose(c)

	//当ok的值为为true时，表示通道已打开，可以发送或接收数据
	//当ok的值设置为false时，表示通道已关闭
	for {
		res, ok := <-c
		if ok == false {
			fmt.Println("通道关闭 ", ok)
			break
		}
		fmt.Println("通道打开 ", res, ok)
	}

	fmt.Println("********************")
	// 使用 make() 函数创建通道
	mychnl := make(chan string)

	// 匿名 goroutine
	go func() {
		mychnl <- "GFG"
		mychnl <- "gfg"
		mychnl <- "Geeks"
		mychnl <- "nhooo"
		close(mychnl)
	}()

	//使用for循环
	for res := range mychnl {
		fmt.Println(res)
	}
}
