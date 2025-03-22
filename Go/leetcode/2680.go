package Leetcode

func maximumOr(nums []int, k int) int64 {
	n := len(nums)
	suf := make([]int64, n+1)

	// 计算后缀按位或，suf[i] 代表 nums[i] 到 nums[n-1] 的按位或
	for i := n - 1; i >= 0; i-- {
		suf[i] = suf[i+1] | int64(nums[i])
	}

	var res, pre int64
	// 遍历每个元素，更新结果
	for i := 0; i < n; i++ {
		// 考虑对 nums[i] 进行左移 k 次后，再与前面的结果和后缀按位或进行合并
		res = maxMux(res, pre|(int64(nums[i])<<k)|suf[i+1])
		// 更新前缀按位或
		pre |= int64(nums[i])
	}

	return res
}

// 获取最大值
func maxMux(a int64, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
