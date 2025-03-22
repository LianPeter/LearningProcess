package Leetcode

func diagonalPrime(nums [][]int) int {
	// 思路：找出对角线的元素，然后判断是否是质数
	// 1. 对角线
	// 2. 质数

	// 先拿出主对角线和副对角线的元素
	var diagonal []int
	n := len(nums)
	for i := 0; i < n; i++ {
		diagonal = append(diagonal, nums[i][i]) // 主对角线
		if i != n-i-1 {                         // 避免重复添加中心元素
			diagonal = append(diagonal, nums[i][n-i-1]) // 副对角线
		}
	}

	// 判断是否是质数
	var isPrime = func(n int) bool {
		if n < 2 {
			return false
		}
		for i := 2; i*i <= n; i++ {
			if n%i == 0 {
				return false
			}
		}
		return true
	}

	// 找出质数最大值
	var maxPrime int
	for _, v := range diagonal {
		if isPrime(v) && v > maxPrime {
			maxPrime = v
		}
	}

	return maxPrime
}

/*官方题解*/
func diagonalPrime1(nums [][]int) int {
	n, res := len(nums), 0
	for i := 0; i < n; i++ {
		if isPrime(nums[i][i]) {
			res = maxMux(res, nums[i][i])
		}
		if isPrime(nums[i][n-i-1]) {
			res = maxMux(res, nums[i][n-i-1])
		}
	}
	return res
}

func isPrime(num int) bool {
	if num == 1 {
		return false
	}
	factor := 2
	for ; factor*factor <= num; factor++ {
		if num%factor == 0 {
			return false
		}
	}
	return true
}
