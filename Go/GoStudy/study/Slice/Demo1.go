package main

import "fmt"

func main() {
	/*使用 make 函数创建一个整型切片 numbers，它的长度为3，容量为5。*/
	var numbers = make([]int, 3, 5)
	/*长度是切片中当前实际包含的元素个数，可以通过内置函数 len() 获取。*/
	/*容量表示的是切片可以扩展到的最大元素数，而不需要重新分配底层数组。*/

	var num = []int{1, 2, 3}
	fmt.Println(num)
	ints := append(num, 4, 5, 6)
	fmt.Println(ints)
	printSlice(numbers)
	/*当切片的长度超过其容量时，Go会自动扩展底层数组，并调整切片的大小。
	扩展后的容量通常是之前容量的两倍，以确保能够高效地处理更多的元素。
	使用 append 方法时，开发者不需要手动管理底层数组的扩展，Go会自动处理这一切。*/
}

func printSlice(x []int) {
	/* %v 用于格式化任意值的默认表示形式。*/
	fmt.Printf("len=%d cap=%d slice=%v\n", len(x), cap(x), x)
}
