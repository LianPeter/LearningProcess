package Leetcode

import "strconv"

func EvenOddBit(n int) []int {
	/*给你一个 正 整数 n 。
	用 even 表示在 n 的二进制形式（下标从 0 开始）中值为 1 的偶数下标的个数。
	用 odd 表示在 n 的二进制形式（下标从 0 开始）中值为 1 的奇数下标的个数。
	请注意，在数字的二进制表示中，位下标的顺序 从右到左。
	返回整数数组 answer ，其中 answer = [even, odd] 。*/

	// 1. 正整数怎么转换为二进制
	// 2. 怎么判断一个数的二进制位是奇数位还是偶数位
	// 3. 怎么统计一个数的二进制位是奇数位还是偶数位的个数
	// [101010111]
	var even, odd int
	result := conversions(n)
	// 二进制下标顺序从右到左
	for i := len(result) - 1; i >= 0; i-- {
		if result[i] == '1' { // 二进制位是1
			if i%2 == 0 {
				odd++
			} else {
				even++
			}
		}
	}
	return []int{even, odd}
}

// 十进制转二进制
func conversions(num int) string {
	var str = ""
	for num > 0 {
		temp := num / 2                     // 商
		remainder := num % 2                // 余数
		str = strconv.Itoa(remainder) + str // 十进制转二进制
		num = temp
	}
	return str
}
