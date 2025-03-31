class Solution:
    def percentageLetter(self, s: str, letter: str) -> int:
        count = 0
        for i in s:
            if i == letter:
                count += 1
        return count * 100 // len(s)