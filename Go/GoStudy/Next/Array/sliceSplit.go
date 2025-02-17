package Array

import (
	"bytes"
	"fmt"
)

func SliceSplit() {
	//创建和初始化
	//字节片
	//使用简写声明
	slice1 := []byte{'!', '!', 'G', 'e', 'e', 'k', 's',
		'f', 'o', 'r', 'G', 'e', 'e', 'k', 's', '#', '#'}

	slice2 := []byte{'A', 'p', 'p', 'l', 'e'}

	slice3 := []byte{'%', 'g', '%', 'e', '%', 'e',
		'%', 'k', '%', 's', '%'}

	//显示切片
	fmt.Println("原始切片:")
	fmt.Printf("Slice 1: %s", slice1)
	fmt.Printf("\nSlice 2: %s", slice2)
	fmt.Printf("\nSlice 3: %s", slice3)

	//分割字节片
	//使用分割函数
	res1 := bytes.Split(slice1, []byte("eek"))
	res2 := bytes.Split(slice2, []byte(""))
	res3 := bytes.Split(slice3, []byte("%"))

	//显示结果
	fmt.Printf("\n\n分割后:")
	fmt.Printf("\nSlice 1: %s", res1)
	fmt.Printf("\nSlice 2: %s", res2)
	fmt.Printf("\nSlice 3: %s", res3)
}

func SliceSplitFunc() {
	//创建和分割
	//字节片
	//使用分割函数
	res1 := bytes.Split([]byte("****Welcome, to, nhooo****"), []byte(","))

	res2 := bytes.Split([]byte("Learning x how x to x trim x a x slice of bytes"), []byte("x"))

	res3 := bytes.Split([]byte("nhooo, Geek"), []byte(""))

	res4 := bytes.Split([]byte(""), []byte(",")) // 空的字节片无论输入什么，结果都是空切片

	//显示结果
	fmt.Printf("最终结果值:\n")
	fmt.Printf("\nSlice 1: %s", res1)
	fmt.Printf("\nSlice 2: %s", res2)
	fmt.Printf("\nSlice 3: %s", res3)
	fmt.Printf("\nSlice 4: %s", res4)
}
