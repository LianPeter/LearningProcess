package Leetcode

func largestVariance(s string) int {
	// 创建一个 map 来存储每个字符在字符串中的所有位置
	pos := make(map[rune][]int)
	for i, ch := range s {
		pos[ch] = append(pos[ch], i)  // 将字符的位置存入对应的列表中
	}

	ans := 0  // 初始化最大方差为 0

	// 双重循环遍历所有不同的字符对 (c0, c1)
	for c0, pos0 := range pos {
		for c1, pos1 := range pos {
			if c0 != c1 {  // 确保 c0 和 c1 是不同的字符
				i, j := 0, 0  // i 和 j 是两个索引，分别用于遍历 c0 和 c1 的位置列表
				f, g := 0, -1 << 63  // f 是当前的累积方差值，g 是当前的最大方差

				// 遍历 pos0 和 pos1，计算这两个字符之间的最大方差
				for i < len(pos0) || j < len(pos1) {
					// 如果 c0 的当前位置小于 c1 的当前位置，处理 c0
					if j == len(pos1) || (i < len(pos0) && pos0[i] < pos1[j]) {
						// 更新方差，f 表示累积值，g 是最大方差
						f, g = max(f, 0) + 1, g + 1
						i++  // 移动 c0 的位置
					} else {
						// 否则处理 c1，方差减少
						f, g = max(f, 0) - 1, max(f, g, 0) - 1
						j++  // 移动 c1 的位置
					}

					// 更新最大方差 ans
					ans = max(ans, g)
				}
			}
		}
	}

	// 返回计算出的最大方差
	return ans
}
