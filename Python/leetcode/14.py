from typing import List

class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        # 判断是否为空
        if not strs:
            return ""
        # 找出最小长度的字符串
        minStr = strs[0]
        for min_str in strs:
            if len(min_str) < len(minStr):
                minStr = min_str

        # 最长公共前缀
        for i in range(len(minStr)):
            for j in strs:
                if j[i] != minStr[i]:
                    return minStr[:i]
        return minStr

if __name__ == '__main__':
    s = Solution()
    print(s.longestCommonPrefix(["flower", "flow", "flight"]))
    print(s.longestCommonPrefix(["dog", "racecar", "car"]))