package main

import "fmt"

func main() {
	a := 100
	b := 200
	i := Max(a, b)
	fmt.Println(i)
}

func Max(num1, num2 int) int /*返回多个值则为（int, int）*/ {
	if num1 > num2 {
		return num1
	} else if num2 > num1 {
		return num2
	} else {
		return num1
	}
}
