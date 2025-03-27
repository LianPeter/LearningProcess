package Leetcode

func differenceOfDistinctValues(grid [][]int) [][]int {
	m := len(grid)          // 网格的行数
	n := len(grid[0])       // 网格的列数
	res := make([][]int, m) // 创建结果矩阵，大小与输入网格相同
	for i := range res {
		res[i] = make([]int, n) // 初始化结果矩阵
	}

	// 计算左上到右下方向的 distinct 值
	for i := 0; i < m; i++ {
		x, y := i, 0            // 从 (i, 0) 开始
		s := make(map[int]bool) // 存储已遇到的 distinct 值
		for x < m && y < n {
			res[x][y] += len(s)
			s[grid[x][y]] = true
			x++
			y++
		}
	}

	// 计算左上到右下方向的 distinct 值 (从第一行之后的列开始)
	for j := 1; j < n; j++ {
		x, y := 0, j
		s := make(map[int]bool)
		for x < m && y < n {
			res[x][y] += len(s)
			s[grid[x][y]] = true
			x++
			y++
		}
	}

	// 计算右上到左下方向的 distinct 值
	for i := 0; i < m; i++ {
		x, y := i, n-1
		s := make(map[int]bool)
		for x >= 0 && y >= 0 {
			res[x][y] -= len(s)
			res[x][y] = abs(res[x][y])
			s[grid[x][y]] = true
			x--
			y--
		}
	}

	// 计算右上到左下方向的 distinct 值 (从最后一行之前的列开始)
	for j := n - 2; j >= 0; j-- {
		x, y := m-1, j
		s := make(map[int]bool)
		for x >= 0 && y >= 0 {
			res[x][y] -= len(s)
			res[x][y] = abs(res[x][y])
			s[grid[x][y]] = true
			x--
			y--
		}
	}

	return res
}

// 计算绝对值
func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
