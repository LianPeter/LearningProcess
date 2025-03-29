package Leetcode

/*超出时间限制*/
func longestCycle(edges []int) int {
	n := len(edges)
	visited := make([]int, n) // 0:未访问，1:访问中，2:已访问
	ans := -1

	var dfs func(node int, path []int) int
	dfs = func(node int, path []int) int {
		// 如果节点已访问过且不在当前路径上，说明当前路径无环
		if visited[node] == 2 {
			return -1
		}
		// 如果节点在当前路径中，说明找到了一个环
		for i := len(path) - 1; i >= 0; i-- {
			if path[i] == node {
				return len(path) - i
			}
		}

		// 标记当前节点为访问中
		visited[node] = 1
		path = append(path, node)

		nextNode := edges[node]
		cycleLength := -1
		if nextNode != -1 {
			cycleLength = dfs(nextNode, path)
		}

		// 标记当前节点为已访问
		visited[node] = 2
		return cycleLength
	}

	for i := 0; i < n; i++ {
		// 如果当前节点没有被访问过，执行 DFS
		if visited[i] == 0 {
			cycleLength := dfs(i, []int{})
			// 更新最长环长度
			if cycleLength > ans {
				ans = cycleLength
			}
		}
	}
	return ans
}

// LongestCycle 官方解法
func LongestCycle(edges []int) int {
	n := len(edges)
	label := make([]int, n)
	currentLabel, ans := 0, -1
	for i := 0; i < n; i++ {
		if label[i] != 0 {
			continue
		}
		pos, startLabel := i, currentLabel
		for pos != -1 {
			currentLabel++
			// 如果遇到了已经遍历过的节点
			if label[pos] != 0 {
				// 如果该节点是这一次 i 循环中遍历的，说明找到了新 的 环，更新答案
				if label[pos] > startLabel {
					if currentLabel-label[pos] > ans {
						ans = currentLabel - label[pos]
					}
				}
				break
			}
			label[pos] = currentLabel
			pos = edges[pos]
		}
	}
	return ans
}
