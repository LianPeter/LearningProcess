package Leetcode

type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func lcaDeepestLeaves(root *TreeNode) *TreeNode {
	var maxDepth int
	var lca *TreeNode

	var dfs func(node *TreeNode, depth int) int
	dfs = func(node *TreeNode, depth int) int {
		if node == nil {
			return depth
		}
		leftDepth := dfs(node.Left, depth+1)
		rightDepth := dfs(node.Right, depth+1)

		if leftDepth == rightDepth && leftDepth >= maxDepth {
			maxDepth = leftDepth
			lca = node
		}
		return max(leftDepth, rightDepth)
	}

	dfs(root, 0)
	return lca
}
