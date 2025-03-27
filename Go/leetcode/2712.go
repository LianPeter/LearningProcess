package Leetcode

import "math"

func minimumCost(s string) int64 {
	n := len(s)
	suf := make([][2]int64, n+1)

	for i := n - 1; i >= 0; i-- {
		if s[i] == '1' {
			suf[i][1] = suf[i+1][1]
			suf[i][0] = suf[i+1][1] + int64(n-i)
		} else {
			suf[i][1] = suf[i+1][0] + int64(n-i)
			suf[i][0] = suf[i+1][0]
		}
	}

	pre := [2]int64{0, 0}
	res := int64(math.MaxInt64)

	for i := 0; i < n; i++ {
		if s[i] == '1' {
			pre[0] = pre[1] + int64(i+1)
		} else {
			pre[1] = pre[0] + int64(i+1)
		}
		res = min(res, min(pre[0]+suf[i+1][0], pre[1]+suf[i+1][1]))
	}
	return res
}

func min(a, b int64) int64 {
	if a < b {
		return a
	}
	return b
}

// MinimumCost ...
func MinimumCost(s string) int64 {
	n := len(s)
	suf := make([][2]int64, n+1)
	for i := n - 1; i >= 0; i-- {
		if s[i] == '1' {
			suf[i][1] = suf[i+1][1]
			suf[i][0] = suf[i+1][1] + int64(n-i)
		} else {
			suf[i][1] = suf[i+1][0] + int64(n-i)
			suf[i][0] = suf[i+1][0]
		}
	}

	pre := [2]int64{0, 0}
	res := int64(math.MaxInt64)
	for i := 0; i < n; i++ {
		if s[i] == '1' {
			pre[0] = pre[1] + int64(i+1)
		} else {
			pre[1] = pre[0] + int64(i+1)
		}
		res = min(res, min(pre[0]+suf[i+1][0], pre[1]+suf[i+1][1]))
	}
	return res
}
