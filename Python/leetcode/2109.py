class Solution:
    def addSpaces(self, s: str, spaces: List[int]) -> str:
        # 使用列表而不是字符串来收集结果，以提高效率
        builder = []
        space_idx = 0
        n = len(s)

        # 遍历原字符串 s
        for i in range(n):
            # 如果当前字符位置是空格的插入位置，插入空格
            if space_idx < len(spaces) and i == spaces[space_idx]:
                builder.append(' ')  # 插入空格
                space_idx += 1
            builder.append(s[i])  # 插入当前字符

        # 在遍历完成后，如果还有剩余空格位置，继续插入空格
        while space_idx < len(spaces):
            builder.insert(spaces[space_idx], ' ')  # 插入空格
            space_idx += 1

        return ''.join(builder)
