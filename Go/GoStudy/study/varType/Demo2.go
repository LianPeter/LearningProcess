package main

import "fmt"

var x, y int
var ( // 这种因式分解关键字的写法一般用于声明全局变量
	a int
	b bool
)

const (
	a1 = iota
	a2 = iota
	a3 = iota
	/*
		1. iota，特殊常量，可以认为是一个可以被编译器修改的常量。
		2. iota 在 const关键字出现时将被重置为 0(const 内部的第一行之前)，
			const 中每新增一行常量声明将使 iota 计数一次
			(iota 可理解为 const 语句块中的行索引)。
	*/
)

const (
	aa = iota //0

	/*没有显式赋值，所以他的值和上一行的相同，为iota*/
	bb //1
	cc //2

	/*此行显式定义 dd 为 "ha"，此时 iota 的值为 3，但 iota 不会影响常量值。*/
	dd = "ha" //独立值，iota += 1

	/*没有显式赋值，所以它的值和上一行相同，即 "ha"，此时 iota 的值为 4*/
	ee //"ha"   iota += 1

	ff = 100 //iota +=1

	/*没有显式赋值，所以它的值和上一行相同，即 100，此时 iota 的值为 6。*/
	gg //100  iota +=1

	hh = iota //7,恢复计数

	/*没有显式赋值，所以它的值和上一行相同，即 iota 的值为 8。*/
	ii //8
)

const (
	iii = 1 << iota
	j   = 3 << iota
	k   // 相当于：k = 3 << iota  --> 此时iota为2
	l
)

var c, d int = 1, 2
var e, f = 123, "hello"

// 这种不带声明格式的只能在函数体中出现
// g, h := 123, "hello"

func main() {
	g, h := 123, "hello"
	fmt.Println(x, y, a, b, c, d, e, f, g, h)

	fmt.Println(a1, a2, a3)

	fmt.Println(aa, bb, cc, dd, ee, ff, gg, hh, ii)

	fmt.Println("i=", iii)
	fmt.Println("j=", j)
	fmt.Println("k=", k)
	fmt.Println("l=", l)
}
