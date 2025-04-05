package Leetcode

func subsetXORSum(nums []int) int {
	return dfs(0, 0, nums)
}

// 递归
func dfs(val, idx int, nums []int) int {
	if idx == len(nums) { // 终止条件
		return val
	}
	// 选择当前元素
	return dfs(val^nums[idx], idx+1, nums) + dfs(val, idx+1, nums)
}
