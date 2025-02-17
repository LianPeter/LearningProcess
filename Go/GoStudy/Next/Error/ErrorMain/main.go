package main

import (
	. "GitHub/LianPeter/GoStudy/Next/Error"
	"fmt"
)

func main() {
	fmt.Println("请输入一个浮点数：")
	var x float64
	fmt.Scanf("%f", &x)
	result, err := Sqrt(x)
	fmt.Println(result)
	fmt.Println(err)
	fmt.Println("--------------------")
	fmt.Println(SaveDivide(10, 0))
	fmt.Println(SaveDivide(10, 10))

	fmt.Println("--------------------")
	fmt.Println("Calling x from main.")
	Xx()
	fmt.Println("Returned from x.")
}
