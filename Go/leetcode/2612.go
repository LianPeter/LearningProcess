package Leetcode

import "sort"

func minReverseOperations(n int, p int, banned []int, k int) []int {
	ban := make(map[int]bool)
	for _, b := range banned {
		ban[b] = true
	}
	sets := make([][]int, 2)
	for i := 0; i < n; i++ {
		if i != p && !ban[i] {
			sets[i%2] = append(sets[i%2], i)
		}
	}
	for i := range sets {
		sort.Ints(sets[i])
	}
	ans := make([]int, n)
	for i := range ans {
		ans[i] = -1
	}
	q := []int{p}
	ans[p] = 0
	for len(q) > 0 {
		i := q[0]
		q = q[1:]
		mn := maxMux(i-k+1, k-i-1)
		mx := min(i+k-1, 2*n-k-i-1)
		targetSet := sets[mx%2]
		toRemove := []int{}
		left := sort.SearchInts(targetSet, mn)
		right := sort.SearchInts(targetSet, mx+1)
		for j := left; j < right; j++ {
			val := targetSet[j]
			ans[val] = ans[i] + 1
			q = append(q, val)
			toRemove = append(toRemove, val)
		}
		for _, val := range toRemove {
			idx := sort.SearchInts(targetSet, val)
			if idx < len(targetSet) && targetSet[idx] == val {
				targetSet = append(targetSet[:idx], targetSet[idx+1:]...)
			}
		}
		sets[mx%2] = targetSet
	}

	return ans
}
