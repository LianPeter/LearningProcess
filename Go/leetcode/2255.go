package Leetcode

func countPrefixes(words []string, s string) int {
	result := 0

	// 遍历 words 数组
	for _, word := range words {
		//if len(word) > len(s) {  // 这个判断条件是多余的
		//	continue
		//}
		//if len(word) < len(s) {  // 可以将if else合并
		//	if s[:len(word)] == word {
		//		result++
		//	}
		//} else {
		//	if s == word {
		//		result++
		//	}
		//}
		if len(word) <= len(s) && s[:len(word)] == word {
			result++
		}
	}
	return result
}
