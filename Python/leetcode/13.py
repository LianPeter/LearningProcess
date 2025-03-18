class Solution:
    def romanToInt(self, s: str) -> int:
        # 定义罗马数字和对应整数的字典
        roman_dict = {
            'I': 1,
            'V': 5,
            'X': 10,
            'L': 50,
            'C': 100,
            'D': 500,
            'M': 1000
        }

        result = 0
        # 遍历字符串中的每个字符
        for i in range(len(s) - 1):
            # 如果当前字符对应的值小于下一个字符的值，则减去当前字符的值
            if roman_dict[s[i]] < roman_dict[s[i + 1]]:
                result -= roman_dict[s[i]]
            else:
                # 否则加上当前字符的值
                result += roman_dict[s[i]]

        # 加上最后一个字符的值
        result += roman_dict[s[-1]]

        return result
