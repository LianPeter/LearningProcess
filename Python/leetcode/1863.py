from typing import List


class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        for i in range(1 << n):
            xor_sum = 0
            for j in range(n):
                if i & (1 << j):
                    xor_sum ^= nums[j]
            res += xor_sum
        return res
