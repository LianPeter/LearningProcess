package main

import (
	"GitHub/LianPeter/GoStudy/Next/Array"
	"fmt"
)

func main() {
	arr := Array.StateArray()
	fmt.Println(arr)
	fmt.Println("数组长度：", len(arr))

	// 遍历数组
	for i := 0; i < len(arr); i++ {
		fmt.Println(arr[i])
	}
	fmt.Println("------------")
	for j, k := range arr {
		fmt.Print("索引为", j)
		fmt.Print("，")
		fmt.Print("值为", k)
	}
	fmt.Println()
	fmt.Println("------------")
	/*make()函数创建切片*/
	Array.MakeArray()

	/*使用sort进行排序*/
	Array.SortArray()
	/*使用copy()函数进行切片的复制*/
	Array.CopyArray()
	Array.CopyArray2()

	/*通过函数对切片进行操作*/
	// 将切片传递给函数，函数对切片进行的操作是改变原切片的
	slc := []string{"C#", "Python", "C", "Perl"}
	fmt.Println("初始切片: ", slc)
	//将切片传递给函数
	Array.SliceFunc(slc)
	fmt.Println("最终切片:", slc)

	/*切片分割*/
	// 切割会用空格覆盖符合的元素
	Array.SliceSplit()

	fmt.Println()

	Array.SliceSplitFunc()
}
