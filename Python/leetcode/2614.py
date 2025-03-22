from typing import List


class Solution:
    def diagonalPrime(self, nums: List[List[int]]) -> int:
        n = len(nums)
        res = 0
        for i in range(n):
            if self.isPrime(nums[i][i]):
                res = max(res, nums[i][i])
            if self.isPrime(nums[i][n - i - 1]):
                res = max(res, nums[i][n - i - 1])
        return res

    def isPrime(self, num: int) -> bool:
        if num == 1:
            return False
        factor = 2
        while factor * factor <= num:
            if num % factor == 0:
                return False
            factor += 1
        return True

