package Array

import "fmt"

var arr1 = []int{1, 2, 3, 4, 5, 6}
var arr2 = []int{6, 7, 8, 9, 10}
var arr3 = []string{"a", "b", "c", "d"}
var arr4 = []string{"d", "e", "f"}

func CopyArray() {
	i1 := copy(arr1, arr2) // 返回要复制的元素数量，该数量应为len（dst）或len（src）的最小值
	i2 := copy(arr3, arr4) // copy(目标切片，源切片)
	// 目标切片被源切片替换，但源切片未改变
	// 如果目标切片比源切片小，则目标切片被源切片完全覆盖，源切片未改变
	// 如果目标切片比源切片大，则目标切片的前len（src）个元素被源切片覆盖，源切片未改变
	fmt.Println(i1)
	fmt.Println(i2)

	fmt.Println(arr1)
	fmt.Println(arr2)
	fmt.Println(arr3)
	fmt.Println(arr4)
}
func CopyArray2() {
	//创建切片
	slc1 := []int{58, 69, 40, 45, 11, 56, 67, 21, 65}
	var slc2 []int
	slc3 := make([]int, 5)
	slc4 := []int{78, 50, 67, 77}

	//复制之前
	fmt.Println("Slice_1:", slc1)
	fmt.Println("Slice_2:", slc2)
	fmt.Println("Slice_3:", slc3)
	fmt.Println("Slice_4:", slc4)

	//复制切片
	copy1 := copy(slc2, slc1)
	fmt.Println("\nSlice:", slc2)
	fmt.Println("复制的元素总数:", copy1)

	copy2 := copy(slc3, slc1)
	fmt.Println("\nSlice:", slc3)
	fmt.Println("复制的元素总数:", copy2)

	copy3 := copy(slc4, slc1)
	fmt.Println("\nSlice:", slc4)
	fmt.Println("复制的元素总数:", copy3)

	//这里不要混淆，因为在上面
	//复制了slc4的代码行
	//并因此进行永久修改，即
	// slc 4包含[58 69 40 45]
	copy4 := copy(slc1, slc4)
	fmt.Println("\nSlice:", slc1)
	fmt.Println("复制的元素总数:", copy4)
}
