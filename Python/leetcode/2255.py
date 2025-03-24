from typing import List


class Solution:
    def countPrefixes(self, words: List[str], s: str) -> int:
        result = 0
        for word in words:
            # startswith() 方法用于检查字符串是否是以指定子字符串开头，
            # 如果是则返回 True，否则返回 False。
            # 如果参数 beg 和 end 指定值，则在指定范围内检查。
            if s.startswith(word):
                result += 1
        return result