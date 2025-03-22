package Leetcode
func findMatrix(nums []int) (ans [][]int) {
	// 统计每个元素的出现次数
	cnt := map[int]int{}
	for _, x := range nums {
		cnt[x]++
	}

	for len(cnt) > 0 {
		row := make([]int, 0, len(cnt)) // 预分配空间
		// cnt 中的每个元素的出现次数都减一
		for x := range cnt {
			row = append(row, x)
			cnt[x]--
			if cnt[x] == 0 {
				delete(cnt, x) // 删除当前正在遍历的元素是安全的
			}
		}
		ans = append(ans, row)
	}
	return
}

