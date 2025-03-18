package Leetcode

import (
	"fmt"
	"strconv"
)

func IsBalanced(num string) bool {
	left, right := 0, 0

	for i, char := range num {
		n, err := strconv.Atoi(string(char)) // 将字符转换为整数
		if err != nil {
			fmt.Println("转换错误:", err)
			return false
		}

		// 计算偶数索引和奇数索引的和
		if i%2 == 0 { // 偶数索引
			right += n
		} else { // 奇数索引
			left += n
		}
	}

	return left == right
}

/*Beautiful (answer)solution*/
func isBalanced(num string) bool {
	diff := 0 // 用于存储偶数索引和奇数索引的数值之差
	sign := 1 // 交替切换符号（+1 或 -1）

	for _, c := range num {
		d := int(c - '0') // 将字符 '0'-'9' 转换为整数  -- > 提示：ASCII码
		diff += d * sign  // 偶数索引加，奇数索引减
		sign = -sign      // 切换符号（+1 变 -1，-1 变 +1）
	}

	return diff == 0 // 最终如果差值为 0，则是平衡字符串
}
