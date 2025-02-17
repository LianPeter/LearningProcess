package main

import "fmt"

// 匿名结构的概念
// 匿名结构是不包含名称的结构。当您要创建 一次性 可用结构时，它很有用。

/*匿名字段*/
//创建一个结构匿名字段
type student struct {
	int // 不允许创建两个或多个相同类型的字段，即只能有一个int字段
	string
	float64
	B bool // 允许将匿名字段与命名字段组合
}

func main() {
	Element := struct { // 上面的结构体名称可以省略
		name string // 属性
		age  int
	}{ // 在下面给属性赋值
		name: "Peter",
		age:  20,
	}
	fmt.Println("学生姓名：", Element.name)
	fmt.Println("学生年龄：", Element.age)

	/*匿名字段*/
	// 将值分配给匿名,学生结构的字段
	value := student{123, "Bud", 8900.23, true}

	fmt.Println("入学人数 : ", value.int)
	fmt.Println("学生姓名 : ", value.string)
	fmt.Println("套餐价格 : ", value.float64)
	fmt.Println("是否 VIP : ", value.B)
}
