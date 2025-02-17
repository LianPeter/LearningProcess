package Array

import (
	"fmt"
	"sort"
)

/*
在Go语言中，可以对切片中存在的元素进行排序。
Go语言的标准库提供了sort包，
其中包含用于对int，float64和字符串切片进行排序的不同类型的排序方法。
这些函数始终按升序对可用元素进行切片排序。
*/

// SortArray 切片排序
func SortArray() {
	//创建切片
	slc1 := []string{"Python", "Java", "C#", "Go", "Ruby"}
	slc2 := []int{45, 67, 23, 90, 33, 21, 56, 78, 89}

	fmt.Println("在排序之前:")
	fmt.Println("Slice 1: ", slc1)
	fmt.Println("Slice 2: ", slc2)

	//切片使用排序函数
	sort.Strings(slc1) // 按字母顺序对字符串切片进行排序
	sort.Ints(slc2)    // 按整数值对整数切片进行排序

	fmt.Println("\n排序后:")
	fmt.Println("Slice 1: ", slc1)
	fmt.Println("Slice 2: ", slc2)
}
