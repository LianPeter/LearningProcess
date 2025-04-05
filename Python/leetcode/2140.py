from typing import List

class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        n = len(questions)
        dp = [0] * (n + 1)  # dp[i] 表示从问题 i 开始能获得的最大分数

        # 从后往前更新 dp 数组
        for i in range(n - 1, -1, -1):
            points, brainpower = questions[i]
            # 选择解题或跳过，取最大值
            if i + brainpower + 1 < n:
                dp[i] = max(dp[i + 1], points + dp[i + brainpower + 1])
            else:
                dp[i] = max(dp[i + 1], points)

        return dp[0]
