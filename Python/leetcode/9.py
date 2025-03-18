class Solution:
    def isPalindrome(self, x: int) -> bool:
        """
        :type x: int
        :rtype: bool
        """
        return str(x) == str(x)[::-1]

"""
内存消耗少
"""
class Solution2:
    def isPalindrome2(self, x: int) -> bool:
        # 边界情况，小于 0，等于 0，末尾数是 0
        if x < 0 or (x % 10 == 0 and x != 0):
            return False

        # # 一边获取尾数 一遍构造逆序的 x 值
        # reverseInt = 0
        # # 只需要看一半即可
        # # x 偶数个字符，两者相同
        # # 奇数个字符，reverseInt 多一位， x == reverseInt // 10 即可
        # while x > reverseInt:
        #     reverseInt = reverseInt * 10 + x % 10
        #     x = x // 10
        # # 偶数长度的回文数，两者相等，奇数长度的回文数，reverseInt 比 x 多一个数
        # print(x, reverseInt)
        # if x == reverseInt or x == reverseInt // 10:
        #     return True
        # return False

        base = 10
        while base < x:
            base *= 10

        base //= 10
        num1 = x  # //10  %10 看后面
        num2 = x  # -base*(num2//base)  //base 看前面
        while base >= 10:
            if num2 // base != num1 % 10:
                return False

            num1 //= 10
            num2 -= base * (num2 // base)
            base //= 10

        return True