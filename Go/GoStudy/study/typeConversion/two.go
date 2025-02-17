package main

import (
	"fmt"
	"strconv"
)

func main() {
	str := "123"
	num, err := strconv.Atoi(str)
	/*strconv.Atoi 函数返回两个值，第一个是转换后的整型值，
	第二个是可能发生的错误，我们可以使用空白标识符 _ 来忽略这个错误*/
	if err != nil {
		fmt.Println("转换错误:", err)
	} else {
		fmt.Printf("字符串 '%s' 转换为整数为：%d\n", str, num)
	}

	var str1 string = "10"
	var num1 int
	num1, _ = strconv.Atoi(str1)
	fmt.Println(num1)

	// 将整形转为字符串
	var str2 int = 123456
	num2 := strconv.Itoa(str2)
	fmt.Println("整数转换为字符串为：" + num2)

}
