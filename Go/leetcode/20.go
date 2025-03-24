package Leetcode

func isValid(s string) bool {
	// 如果长度为奇数，不可能是有效的
	if len(s)%2 != 0 {
		return false
	}

	// 映射右括号到左括号（栈：先进后出）
	pairs := map[rune]rune{
		')': '(',
		']': '[',
		'}': '{',
	}

	var stack []rune
	for _, ch := range s {
		if open, isClosing := pairs[ch]; isClosing {
			// 遇到右括号时，判断栈顶是否匹配
			if len(stack) == 0 || stack[len(stack)-1] != open {
				return false
			}
			// 匹配成功，弹出栈顶元素
			stack = stack[:len(stack)-1]
		} else {
			// 左括号直接入栈
			stack = append(stack, ch)
		}
	}

	// 最终栈应为空
	return len(stack) == 0
}
