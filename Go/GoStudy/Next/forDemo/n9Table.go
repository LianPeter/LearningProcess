package main

import "fmt"

func main() {
	for i := 1; i < 10; i++ {
		for j := 1; j < i+1; j++ {
			var num = i * j
			fmt.Printf("%d * %d = %d  ", i, j, num)
		}
		fmt.Println()
	}

}
