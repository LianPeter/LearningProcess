charString = "linsheng and pycharm"
print(charString.index("and"))  # 返回找到子字符串 sub 的最低索引

My_str = "linsheng and pycharm"
print(My_str.replace("and", "AND"))  # 替换掉字符串

My_str = "linsheng and pycharm"
print(My_str.split(" "))  # 按照空格切分

My_str = "		linsheng and pycharm		"
print(My_str.strip())  # 结果："linsheng and pycharm"

My_str = "123linsheng and pycharm321"
print(My_str.strip("123"))  # 结果："linsheng and pycharm"

My_str = "linsheng and pycharm"
count = My_str.count("a")
print(f"字符a出现的次数为：{count}")

My_str = "linsheng and pycharm"
lens = len(My_str)
print(lens)
