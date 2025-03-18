package Leetcode

func BeautifulSubarrays(nums []int) int64 {
	prefixXor := 0
	prefixCount := make(map[int]int) // 记录前缀异或值出现的次数
	prefixCount[0] = 1               // 初始化 prefixXor = 0 时，出现一次
	count := int64(0)

	for _, num := range nums {
		prefixXor ^= num // 更新当前的前缀异或值
		if freq, exists := prefixCount[prefixXor]; exists {
			count += int64(freq) // 如果当前前缀异或值之前出现过，那么说明找到了美丽子数组
		}
		prefixCount[prefixXor]++ // 更新前缀异或值的出现次数
	}

	return count
}
