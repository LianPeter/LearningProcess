package Leetcode

func twoSum(nums []int, target int) []int {
	// 创建一个哈希表存储已访问的数字及其对应的下标
	numMap := make(map[int]int)

	for i, num := range nums {
		// 计算目标值与当前数字的差值
		complement := target - num

		// 如果差值已经出现在哈希表中，说明找到了两个数的和为目标值
		if idx, found := numMap[complement]; found { // idx是值，found是bool
			return []int{idx, i} // 返回差值的下标和当前数字的下标
		}

		// 否则将当前数字及其下标存入哈希表
		numMap[num] = i
	}

	return []int{} // 如果没有找到，返回空切片
}
