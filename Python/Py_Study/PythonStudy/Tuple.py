# 定义元组
tup = (1, 2, 3, 4, 5, 6)
print(f"元组为{tup}")

# 定义单个元素的元组
t1 = ("Hello",)  # 需要加逗号，否则为String类型变量

# 元组的操作：index查找方法
index = tup.index(2)  # 查找2的下标索引是什么
print(index)

# 元组的操作：count统计方法
count = tup.count(1)
print(count)

# 元组的操作：len函数统计元组的元素数量
lens = len(tup)
print(len)

# while循环遍历元组
count = 0
while count < len(tup):
    element1 = tup[count]  # 使用方括号访问元组中的元素
    print(f"元组的元素为{element1} ", end='')
    count += 1
print()

# for循环
for element2 in tup:
    print(f"元组的元素为{element2} ", end='')
print()

# 不可以修改元组的内容
# 可以修改元组内list的内容（修改元素、增加、删除、反转等）
t = (1, 2, ["pycharm", "python"])
print(f"修改前的内容为：{t}")
t[2][0] = "Hello"
print(f"修改后的内容为{t}")


