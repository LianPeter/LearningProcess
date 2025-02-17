package main

import "fmt"

// 类型定义
type data int

/*
在Go语言中，函数名前面的部分是这个函数的接收器。
接收器可以是任意类型（包括结构体类型和非结构体类型），
并且接收器定义在方法的参数列表之前。
接收器的类型决定了这个方法是哪个类型的方法。
*/
func (d1 data) multiply(d2 data) data { // 类型是int类型，但是不可以直接用
	return d1 * d2
}

// 在Go语言中，只要类型和方法定义存在于同一包中，就可以使用非结构类型接收器创建方法。
//如果它们存在于int，string等不同的包中，则编译器将抛出错误，因为它们是在不同的包中定义的。

/*
	//如果您尝试运行以下代码，
	// 然后编译器将抛出错误
	func (d1 int) multiply(d2 int) int {
		return d1 * d2
	}
*/

func main() {
	value1 := data(23)
	value2 := data(20)
	res := value1.multiply(value2)
	fmt.Println("最终结果: ", res)
}
