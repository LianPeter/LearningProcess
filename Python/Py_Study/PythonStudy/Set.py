# 定义集合
aggregate = {"linsheng", 666, "lian", 456, True}
print(aggregate)

# 集合的添加
aggregate.add("Hello")
print(aggregate)  # 集合本身被修改

aggregate.add("linsheng")
print(aggregate)  # 集合会去重，添加的元素在原本集合中已经有了，不会出现两次

# 集合的移除元素
My_set = {"Hello", "World"}
My_set.remove("Hello")
print(My_set)

# 从集合中随机取出一个元素
My_set = {"Hello", "World", "linsheng"}
print(My_set)
element = My_set.pop()
print(My_set)  # 取出元素之后，集合中元素就少了一个
print(element)

# 集合的清空
My_set = {"Hello", "World", "linsheng"}
My_set.clear()
print(My_set)

# 取出集合的差集
set1 = {1, 2, 3}
set2 = {1, 5, 6}
set3 = set1.difference(set2)  # 取出set1和set2不同的元素
set4 = set2.difference(set1)  # 取出set2和set1不同的元素
print(set1)
print(set2)
print(set3)
print(set4)

# 消除两个集合的差集
set1.difference_update(set2)
print(set1)
print(set2)

# 两个集合的合并
set3 = set1.union(set2)
print(set1)
print(set2)
print(set3)

# 统计集合中元素数量
set1 = {1, 2, 3,1}
count = len(set1)
print(count)

# 集合的遍历
"""
集合不支持下标
"""

for i in set1:
    print(f"集合的元素有：{i}")