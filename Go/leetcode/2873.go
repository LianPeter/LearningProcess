package Leetcode

func maximumTripletValue(nums []int) int64 {
	// 下标：i < j < k
	// 下标三元组 (i, j, k) 的值等于 (nums[i] - nums[j]) * nums[k]

	var result int64 = 0
	// 数组中最大的三个下标
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			for k := j + 1; k < len(nums); k++ {
				result = max(result, int64((nums[i]-nums[j])*nums[k]))
			}
		}
	}
	return result
}
