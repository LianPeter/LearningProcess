from random import shuffle

try:
    with open('5A.txt', 'r') as fp:
        # 读取文件中的每一行，并筛选出以数字开头的行，保存到列表 i 中。
        i = [line for line in fp if line[0].isdigit()]
except FileNotFoundError:
    print("文件 '5A.txt' 未找到，请检查文件路径。")
    exit()

travelList = []

# 添加旅游城市
for index, item in enumerate(i): # 使用 enumerate(i) 枚举 i 列表中的每一行，得到行的索引 index 和内容 item
    temp_1 = item.strip()[2:]  # 使用 strip 去除行末的换行符
    temp_1 = f"{index}#{temp_1}" # 将索引和城市名称拼接成一个字符串，并添加到 travelList 中
    travelList.append(temp_1)

print("旅游计划城市：", travelList)

# 删除旅游城市
city_num = input('输入不想旅游城市的个数:')
try:
    for _ in range(int(city_num)):
        index = int(input('输入不想旅游城市的序号（第1个城市索引为0）'))
        if 0 <= index < len(travelList):
            travelList.pop(index)
            print("旅游计划城市：", travelList)
        else:
            print("输入的序号超出范围。")
except ValueError:
    print("请输入有效的整数。")

# 修改旅游城市
city_num = input('输入修改计划旅游的城市个数:')
try:
    for _ in range(int(city_num)):
        index = int(input('输入修改计划旅游的城市序号（第1个城市索引为0）'))
        if 0 <= index < len(travelList):
            city_name = input('输入修改计划旅游的城市名称:')
            travelList[index] = city_name
            print('旅游计划城市：', travelList)
        else:
            print("输入的序号超出范围。")
except ValueError:
    print("请输入有效的整数。")

shuffle(travelList)
print('请领取您的TOPS旅游计划：', travelList[:5])