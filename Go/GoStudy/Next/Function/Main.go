package main

import "fmt"

func main() {
	mul, div := calculator(10, 2)
	fmt.Printf("%d * %d = %d\n", 10, 2, mul)
	fmt.Printf("%d / %d = %d\n", 10, 2, div)

	/*functions Example*/
	//调用mull()函数
	//这里mull函数的行为
	//像普通函数一样
	mull(10, 10)

	//调用mull()函数
	//使用defer关键字
	//这里是mull()函数
	//是延迟函数
	defer mull(10, 20) /*defer关键字：先进后出*/
	//调用show()函数
	show()

	/*Method Example*/
	res := author{
		name:      "Peter",
		branch:    "Computer Science",
		particles: 5,
		salary:    50000,
	}
	res.shows()
}
