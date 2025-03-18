package Leetcode

// 罗马数字转整数
func romanToInt(s string) (ans int) {
	var symbolValues = map[byte]int{'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}

	// 字符串中有几位
	n := len(s)
	// 循环遍历字符串
	for i := 0; i < n; i++ {
		// 获取当前字符的值
		value := symbolValues[s[i]]
		// 如果当前字符的值小于下一个字符的值，则减去当前字符的值
		if i < n-1 && value < symbolValues[s[i+1]] {
			ans -= value
		} else {
			ans += value
		}
	}
	return
}
