from typing import List


class Solution:
    def rowAndMaximumOnes(self, mat: List[List[int]]) -> List[int]:
        maxCount = 0
        minRow = 0
        for i in range(len(mat)):
            count = mat[i].count(1)  # 计算1的个数
            if count > maxCount:
                maxCount = count
                minRow = i
        return [minRow, maxCount]