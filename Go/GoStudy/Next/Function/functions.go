package main

import "fmt"

func calculator(a int, b int) (mul int, div int) {
	mul = a * b
	div = a / b
	return
}

func mull(a1, a2 int) int {
	res := a1 * a2
	fmt.Println("Result: ", res)
	return 0
}

func show() {
	fmt.Println("Hello!, www.cainiaoplus.com Go语言菜鸟教程")
}
