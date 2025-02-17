// 嵌套结构体
package main

import "fmt"

// Author 创建结构体
type Author struct {
	name   string
	branch string
	year   int
}

// HR 创建嵌套结构体
type HR struct {
	// 字段结构
	details Author
}

func main() {

	// 初始化结构体字段
	result := HR{
		details: Author{"Sona", "ECE", 2013},
	}

	// 打印输出值
	fmt.Println("\n作者的详细信息")
	fmt.Println(result)
}
