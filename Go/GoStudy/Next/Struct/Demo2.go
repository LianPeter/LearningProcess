package main

import "fmt"

type Student struct {
	name string
	age  int
}

type Teacher struct {
	name    string
	age     int
	details Student
}

func main() {
	res1 := Student{"Peter", 20}
	fmt.Println("学生姓名：", res1.name)
	fmt.Println("学生年龄：", res1.age)

	res2 := Teacher{
		"David",
		30,
		Student{"Tom", 18},
	}

	fmt.Println("老师姓名：", res2.name)
	fmt.Println("老师年龄：", res2.age)
	fmt.Println("老师学生姓名：", res2.details.name)

}
