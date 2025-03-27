package Leetcode

func minimumSum(n int, k int) int {
	m := min(k/2, n) // 确保 m 不会超过 n

	//等差数列求和公式
	return (m*(m+1) + (k*2+n-m-1)*(n-m)) / 2
}
