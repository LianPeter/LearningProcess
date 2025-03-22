package Leetcode

// LongestCommonPrefix
// 编写一个函数来查找字符串数组中的最长公共前缀。
// 如果不存在公共前缀，返回空字符串 ""
func LongestCommonPrefix(strs []string) string {
	// 是否为空
	if len(strs) == 0 {
		return ""
	}
	// 最短字符串
	minStr := strs[0]
	for _, str := range strs {
		if len(str) < len(minStr) {
			minStr = str
		}
	}
	// 最长公共前缀
	for i := 0; i < len(strs); i++ {
		for j := 0; j < len(minStr); j++ {
			if strs[i][j] != minStr[j] {
				minStr = minStr[:j]
				break
			}
		}
	}
	return minStr
}
