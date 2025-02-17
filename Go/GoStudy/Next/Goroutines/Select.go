package Goroutines

import "time"

func Portal1(channel1 chan string) {

	time.Sleep(3 * time.Second)
	channel1 <- "Welcome to channel 1"
}

// 函数 2
func Portal2(channel2 chan string) {

	time.Sleep(9 * time.Second)
	channel2 <- "Welcome to channel 2"
}
