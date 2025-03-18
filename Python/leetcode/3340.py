class Solution:
    def isBalanced(self, num: str) -> bool:
        diff = 0 # 存储奇偶差值
        sign = 1 # 交替变换符号
        for i in num:
            c = int(i)
            diff = diff + c * sign
            sign = -sign
        return diff == 0



