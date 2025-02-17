package Array

// StateArray 声明6位数数组
func StateArray() [6]int {
	name := [...]int{1, 2, 3, 4, 5, 6} // ...表示：自动推断数组的长度
	return name
}
