package Leetcode

// 判断是否回文数
func isPalindrome(x int) bool {
	// 判断是否有符号
	if x < 0 {
		return false
	}

	// 逆序
	var reverse int              // 初始为0
	for i := x; i > 0; i /= 10 { // 遍历 x 的每一位数字，从最低位（个位）到最高位
		reverse = reverse*10 + i%10
	}

	if x == reverse { // 回文数指的是正序和逆序相等
		return true
	}

	return false
}
