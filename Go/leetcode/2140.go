package Leetcode

func mostPoints(questions [][]int) int64 {
	n := len(questions)
	dp := make([]int64, n+1) // dp[i] 表示从问题 i 开始可以获得的最大分数

	// 从倒数第二个问题开始倒推
	for i := n - 1; i >= 0; i-- {
		points := int64(questions[i][0])
		brainpower := int64(questions[i][1])

		// 选择解题或跳过
		if i+int(brainpower)+1 < n {
			dp[i] = max(dp[i+1], points+dp[i+int(brainpower)+1])
		} else {
			dp[i] = max(dp[i+1], points)
		}
	}

	// 最终结果是从问题 0 开始的最大分数
	return dp[0]
}

// 辅助函数：返回两个值中的较大者
func max(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
