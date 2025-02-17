package main

import "fmt"

func main() {
	var sum = 0
A:
	for i := 0; i <= 100; i++ {
		sum += i
	}

	fmt.Println(sum)
	goto A
}
