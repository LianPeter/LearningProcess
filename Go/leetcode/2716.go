package Leetcode

func minimizedStringLength(s string) int {
	// 存储每个小写字母 ('a' - 'z') 在字符串 s 中的出现次数
	fre := make([]int, 26)

	// 遍历字符串 s，统计每个字符的出现次数
	for _, ch := range s {
		fre[ch-'a']++ // 计算字符相对于 'a' 的索引，并在对应位置增加计数
	}

	count := 0 // 不同字符的个数

	// 遍历频率数组，统计出现过的不同字符数量
	for _, freq := range fre {
		if freq > 0 { // 只有出现过的字符才计入 count
			count++
		}
	}

	return count
}
