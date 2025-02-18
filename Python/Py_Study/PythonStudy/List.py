# 定义一个列表
My_list = [21, 25, 21, 23, 22, 20]

# 加一个数字31，到列表的尾部
My_list.append(31)
print(My_list)

# 加一个新列表[29,33,30]，到列表的尾部
My_list.extend([29, 33, 30])
print(My_list)

# 取出第一个元素（应是：21)
number1 = My_list[0]
print(f"My first number is {number1}")

# 取出最后一个元素（应是：30)
number2 = My_list[-1]
print(f"My second number is {number2}")

# 查找元素31，在列表中的下标位置
count = My_list.index(31)
print(f"My index is {count}")

"""
遍历列表
"""
# 定义一个变量标记列表下标
index = 0

while index < len(My_list):
    # 定义变量，接收每一个列表元素
    element = My_list[index]
    print(f"列表的元素为{element}, ", end='')
    index += 1

# 用for循环，遍历列表中的每一个元素
"""for element in My_list:
    print(f"列表的元素为{element}, ", end='')"""
