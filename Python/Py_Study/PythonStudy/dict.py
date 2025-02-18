"""
-字典的定义
-从字典中获取数据
-新增或更新元素  # 字典中存在就是更新，不存在就是新增
-删除元素
-清空元素
-获取全部的Key
-遍历字典（for）
-统计字典内的元素数量
"""

# 定义字典
# dict1 = {"张三": {"语文": 77}, "李四": {"语文": 88}, "王五": {"语文": 99}}
# dict2 = {"张三": {"数学": 66}, "李四": {"数学": 86}, "王五": {"数学": 96}}
# dict3 = {"张三": {"英语": 33}, "李四": {"英语": 55}, "王五": {"英语": 66}}
# print(dict1)
# print(dict2)
# print(dict3)


score_dict = {"甲": {
    "语文": 11,
    "数学": 22,
    "英语": 33
}, "乙": {
    "语文": 44,
    "数学": 55,
    "英语": 66
}, "丙": {
    "语文": 77,
    "数学": 88,
    "英语": 99
}
}
print(score_dict)

# 从字典中获取数据
score = score_dict["甲"]
print(f"甲的成绩为：{score}")

score1 = score_dict["乙"]["语文"]
print(f"乙的语文成绩为：{score1}")

# 新增元素
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}
# 新增
stu_score["张学游"] = 66
print(stu_score)

# 删除元素
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}
score = stu_score.pop("周杰轮")
print(f"字典中被移除了一个元素，结果：{stu_score}，周杰轮的考试成绩为：{score}")
# 既可以删除元素，又可以得到Key的Value


# 清空元素
stu_score.clear()
print(f"字典清空之后为：{stu_score}")

# 获取全部的Key
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}
keys = stu_score.keys()
print(keys)

# 遍历字典
for key in keys:  # 方式1：
    print(f"字典的Key是{key}")
    print(f"字典的value是：{stu_score[key]}")

for key in stu_score:  # 方式2：
    print(f"2字典的Key是{key}")
print(f"2字典的value是：{stu_score[key]}")

# 统计字典内的元素数量
count = len(stu_score)
print(count)




# 案例：
x = True
country_counter = {}

def addone(country):
    if country in country_counter:
        country_counter[country] += 1
    else:
        country_counter[country] = 1

addone('China')
addone('Japan')
addone('china')

print(len(country_counter))
print(country_counter)
