package main

import "fmt"

// FinalSalary /*Go 函数用作结构体字段*/
// FinalSalary函数类型
type FinalSalary func(int, int) int

// Authors 创建结构
type Authors struct {
	name   string
	age    int
	salary FinalSalary
}

func main() {
	author := Authors{
		"Peter",
		20,
		func(a, b int) int {
			return a + b
		},
	}
	fmt.Println(author)
	fmt.Println(author.name)
	fmt.Println(author.age)
	fmt.Println(author.salary(10, 20))
}
