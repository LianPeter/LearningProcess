package Array

import "fmt"

func SliceFunc(element []string) []string {
	// 修改给定的切片
	element[2] = "Go"
	element = append(element, "Java")
	fmt.Println("修改切片: ", element)
	return element
}
