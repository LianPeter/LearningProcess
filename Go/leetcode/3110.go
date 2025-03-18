package Leetcode

import "math"

func scoreOfString(s string) int {
	var result int
	for i := 0; i < len(s)-1; i++ {
		// 计算相邻字符的ASCII码差值绝对值
		result += int(math.Abs(float64(s[i]) - float64(s[i+1])))
	}
	return result
}
