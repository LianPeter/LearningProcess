class Solution:
    def isValid(self, s: str) -> bool:
        # 如果字符串长度是奇数，直接返回 False
        if len(s) % 2 != 0:
            return False

        # 右括号映射到左括号
        pairs = {')': '(', ']': '[', '}': '{'}

        # 使用栈来存储左括号
        stack = []

        for char in s:
            # 如果是右括号，检查栈顶是否是匹配的左括号
            if char in pairs:
                # 如果栈为空或栈顶不是匹配的左括号，返回 False
                if not stack or stack[-1] != pairs[char]:
                    return False
                # 如果匹配，弹出栈顶元素
                stack.pop()
            else:
                # 如果是左括号，压入栈
                stack.append(char)

        # 最终栈应为空，说明所有的括号都匹配成功
        return not stack
