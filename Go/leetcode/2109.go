package Leetcode

import "strings"

func addSpaces(s string, spaces []int) string {
	// 读取数组中的每个元素
	for i := 0; i < len(spaces); i++ {
		// index 就是 s 中的空格的位置
		index := spaces[i]
		s = s[:index] + " " + s[index:]

		// 由于插入了一个空格，所以后面的空格的位置都要加 1
		for j := i + 1; j < len(spaces); j++ {
			spaces[j]++
		}
	}
	return s
}

/*优化后*/

func AddSpaces(s string, spaces []int) string {
	var builder strings.Builder
	n := len(s)
	spaceIdx := 0

	// 遍历原字符串 s
	for i := 0; i < n; i++ {
		// 如果当前索引是空格的位置，插入空格
		if spaceIdx < len(spaces) && i == spaces[spaceIdx] {
			builder.WriteByte(' ') // 插入空格
			spaceIdx++
		}
		builder.WriteByte(s[i]) // 插入当前字符
	}

	// 返回构建的字符串
	return builder.String()
}
