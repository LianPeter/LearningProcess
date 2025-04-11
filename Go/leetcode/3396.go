package Leetcode

func minimumOperations(nums []int) int {
	count := 0

	for len(nums) > 0 {
		seen := make(map[int]bool)
		duplicate := false

		// 检查当前数组是否存在重复元素
		for _, num := range nums {
			if seen[num] {
				duplicate = true
				break
			}
			seen[num] = true
		}

		if !duplicate {
			// 没有重复，退出循环
			break
		}

		// 否则，移除前 3 个元素（或不足 3 个全部移除）
		if len(nums) >= 3 {
			nums = nums[3:]
		} else {
			nums = []int{}
		}
		count++
	}

	return count
}
