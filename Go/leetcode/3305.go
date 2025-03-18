package Leetcode

func CountOfSubstrings(word string, k int) int {
	n := len(word)
	result := 0

	// 枚举所有可能的子字符串起始位置
	for i := 0; i < n; i++ {
		// 初始化当前子串内的统计
		// vowelsFreq 记录 a, e, i, o, u 的出现次数
		vowelsFreq := map[byte]int{'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0}
		consonantCount := 0

		// 枚举以 i 为起点的所有子串
		for j := i; j < n; j++ {
			c := word[j]
			// 如果 c 是元音，则更新出现次数
			if c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' {
				vowelsFreq[c]++
			} else {
				// 否则为辅音
				consonantCount++
			}

			// 如果辅音数超过 k，则后续 j 只会更多，直接退出内层循环
			if consonantCount > k {
				break
			}

			// 当辅音数正好为 k 时，检查是否每个元音至少出现一次
			if consonantCount == k {
				valid := true
				for _, v := range []byte{'a', 'e', 'i', 'o', 'u'} {
					if vowelsFreq[v] == 0 {
						valid = false
						break
					}
				}
				if valid {
					result++
				}
			}
		}
	}

	return result
}
