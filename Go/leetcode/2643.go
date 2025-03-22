package Leetcode

func rowAndMaximumOnes(mat [][]int) []int {
	maxCount := 0
	index := 0
	for i := 0; i < len(mat); i++ {
		tempCount := 0 // 每行开始时重置 1 的个数否则会一直累加
		for j := 0; j < len(mat[i]); j++ {
			if mat[i][j] == 1 {
				tempCount++
			}
		}
		// 只有在当前行的 1 的数量大于 maxCount 时才更新
		// 这里不用考虑相等的情况，相等也是取前面索引的，这是由前往后遍历决定的
		if tempCount > maxCount {
			maxCount = tempCount
			index = i
		}
	}
	return []int{index, maxCount}
}
