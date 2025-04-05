package Leetcode

// 代码超出时间限制😒😒
func maximumTripletValue(nums []int) int64 {
	var result int64 = 0
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			for k := j + 1; k < len(nums); k++ {
				result = max(result, int64((nums[i]-nums[j])*nums[k]))
			}
		}
	}
	if result < 0 {
		result = 0
	}
	return result
}

func MaximmumTripletValue(nums []int) int64 {
	n := len(nums)
	var res, imax, dmax int64 = 0, 0, 0
	for k := 0; k < n; k++ {
		res = max(res, dmax*int64(nums[k]))
		dmax = max(dmax, imax-int64(nums[k]))
		imax = max(imax, int64(nums[k]))
	}
	return res
}
