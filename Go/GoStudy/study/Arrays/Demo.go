package main

import "fmt"

func main() {
	var a [10]int
	a[0] = 1
	a[1] = 2
	a[2] = 3
	a[3] = 4
	a[4] = 5
	a[5] = 6
	a[6] = 7
	a[7] = 8

	var b = [10]int{11, 12, 13, 14, 15, 16, 17, 18, 19, 20}
	fmt.Println(a)
	fmt.Println(b)
}
