package Array

import "fmt"

func MakeArray() {
	arr1 := make([]int, 4, 7)
	fmt.Printf("arr1 = %v\n", arr1)
	fmt.Printf("arr1的长度为 %d\n", len(arr1))
	fmt.Printf("arr1的容量为 %d\n", cap(arr1))

	arr2 := make([]int, 5) /*不指定容量，则容量为长度*/
	fmt.Printf("arr2 = %v\n", arr2)
	fmt.Printf("arr2的长度为 %d\n", len(arr2))
	fmt.Printf("arr2的容量为 %d\n", cap(arr2))

	// 在切片中，您只能使用==运算符检查给定切片是否存在。
	//如果尝试在 == 运算符的帮助下比较两个切片，则会抛出错误
	fmt.Println(arr1 == nil)
}
