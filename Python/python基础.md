# Pycharm基础



## 第一阶段



###### 字面量用法

```py
"""
本代码演示了：
-各类字面量的写法  ==>> 数字(浮点数、整数)，字符串 -->字面量
-以及通过print输出
"""

print("666")
print("13.14")
print("你好！！！")
print("hello world")  # 注释时要注意添加一个空格,符合规范
```



###### 变量的相关操作

```py
"""
本代码演示了：
-变量的相关操作
"""

a = 10
b = 12
money = a +b
# 变量名称 = 变量名
print("钱包还有a + b = ", money,"元")
# print(内容1,内容2,...)
```



###### 怎么输出数据类型

```py
"""
本代码演示了：
-怎么输出数据类型
"""

# 方式1：使用print直接输出类型数据
print(type("林生"))
print(type(666))
print(type(13.14))

# 方式2：使用变量存储type()语句的结果
string_type = type("林生")
int_type = type(666)
float_type = type(13.14)
print(string_type)
print(int_type)
print(float_type)

# 方式3：使用type()语句，查看变量中存储的数据类型信息
name = "林生"
name_type = name
print(type(name_type))
```

> type是内置函数，用于返回给定变量或对象的类型，它可以帮助你确定特定变量或对象的数据类型。

例如：`print(type("Hello World"))`

输出：*<class 'str'>*



###### 引号的作用

```py
"""
本代码演示了：
-引号的作用
"""

# 单引号，双引号，三引号都可以定义字符串
print("'林生'")
print('"林生"')
print("\"林生\"")
print('\'林生\'')
# 字符串的拼接用加号直接拼接
# 注意：无法和非字符串类型进行拼接
```



###### 占位和%操作符

```py
"""
-通过占位来输出
-使用%操作符
"""

day_num = 3
time = 17
day_time = "晚上"
message = "今天是%d号%s%d点" % (day_num, day_time, time)
# message = "今天是%d号%s%s点" % (day_num, day_time, time)
print(message)
"""
在这种方法中，%d用于格式化整数，%s用于格式化字符串。
注意所有的占位符都放在一个字符串中，
然后使用一个元组(day_num, day_time, time)按顺序提供给它们对应的值。
"""

# 使用str.format()方法
# 另一种现代的、更灵活的方式是使用str.format()方法：
day_num = 3
time = 17
day_time = "晚上"
message = "今天是{}号{}{}点".format(day_num, day_time, time)
print(message)
"""
# 这种方法通过花括号{}作为占位符，然后通过format方法传入相应的值。
# 它比%操作符更加灵活，支持更多的格式化选项。
"""

# 使用f-strings（Python 3.6+）
# 从Python3.6开始，引入了一种更简洁的字符串格式化方法，称为f-strings或格式化字符串字面量：
day_num = 3
time = 17
day_time = "晚上"
message = f"今天是{day_num}号{day_time}{time}点"
print(message)
"""
在f-string中，你可以直接将变量或表达式放在花括号{}中，
Python会自动替换它们的值。这种方法最为直观和简洁。
"""
```



###### input语句输入

```py
"""
本代码演示了：
-使用input语句
-使用if来判断
"""

print("欢迎来到游乐场")
age = input("请输入你的年龄：")
age = int(age)
# if age >= 0 and age < 18:
if 0 <= age < 18:
    print("你可以免费游玩")
# elif age >= 18 and age <= 45:
elif 18 <= age <= 45:
    print("你已成年，游玩需要补票10元。")
else:
    print("你已中老年，游玩需要补票5元。")
```



###### random定义随机数

```py
"""
本代码演示了：
-定义一个1~10的随机整数数，通过判断来猜出数字
"""

import random  # 导入random模块

# 定义一个1~10的随机整数
a = random.randint(1, 10)

while True:  # 使用True作为条件，表示无限循环
    print("请输入一个整数：")
    num = input()  # 获取用户输入
    num = int(num)  # 将输入的字符串转换为整数

    if num < a:
        print("小了，请继续：")
    elif num > a:  # 使用elif避免不必要的判断
        print("大了，请继续：")
    else:  # 如果既不大也不小，则表示猜对了
        print("恭喜你，猜对了！")
        break  # 退出循环

```



###### 求1~100的和

```py
"""
本代码演示了：
-求1~100的和
"""

i = 1
num = 0
while i <= 100:
    num += i
    i += 1
print("1~100的和为:%s" % num, end='')  # 表示不换行
print("成功！")
```



###### range的用法

```py
"""
本代码演示了：
-range的用法
-range(number)
-range(num1,num2)
-range(num1,num2,step)  #step为步长，隔几个数执行一次
"""
# i = 0
for i in range(5)
	print(i)
#print(i)  #-->这种不规范，虽然可以打印，除非在for外面定义i
```



######  输出九九乘法表

```py
"""
本代码演示了：
-输出九九乘法表
"""

i = 1
j = 1
while i <= 9:
    while j <= i:
        print("%d * %d =%d\t" % (j, i, i * j), end='')
        # end='' 表示在打印内容结束时不要换行，而是以空字符串结束。
        j += 1
    print() # 默认换行
    j = 1
    i += 1


i = 1
while i <= 9:
    j = 1  # 将j的初始化放到第一个while循环内部，确保每次外循环开始时j都重新从1开始
    while j <= i:
        print("%d * %d = %d\t" % (j, i, i * j), end="")  # 使用end=""参数来防止print自动换行，同时增加\t制表符使输出更整齐
        j += 1
    print()  # 在内部循环结束后打印一个换行符，以便开始新的一行
    i += 1
```



###### 统计字符串中有多少字母a

```py
"""
本代码演示了：
-输入一段字符串，通过for循环遍历此字符串，并统计有多少个字母a
"""

print("请输入一段字符串：")
a = input()
count = 0
for x in a:
    if x == 'a':
        count += 1
    print(x)
print("字母a共有%d个" % count)
```



###### range配合for循环使用

```py
"""
本代码演示了：
-range语句的用法  
"""  # 常配合for循环使用

# 语法1：--> range(num)    ==>从0到num（不包含num）
for x in range(10):
    print(x, end="")

# 语法2：--> range(num1, num2)    ==>从num1到num2（不包含num）
for x in range(1, 10):
    print(x, end="")

# 语法3：--> range(num1, num2, step)   ==>从num1到num2,步长为step（不包含num）
for x in range(1, 10, 2):
    print(x, end='')  # 单引号双引号都可以
```



###### 函数的定义和使用

```py
"""
本代码演示了：
-函数的定义和调用
-返回值
"""
# 定义函数
def add(x, y):
    # 函数说明
    """
    add函数可以接受两个参数，并进行两数相加的功能
    :param x: 形参x表示相加的两数相加的其中一个
    :param y: 形参y表示相加的另一个数
    :return: 返回值是两数相加的结果
    """
    result = x + y
    return result  # 返回值


a = add(5, 9)  # 调用函数
print(a)
```



###### global关键字

```py
"""
本代码演示了：
-全局变量和局部变量
-global关键字
"""

num = 100  # 定义全局变量，若num在函数内部则为局部变量

def test_a():
    print(f"test_a: {num}")

def test_b():
   global num  # 使用global关键字，设置内部定义的局部变量为全局变量
   num = 200
    print(f"test_b: {num}")
test_a()
test_b()
print(num)
```



## 数据容器

### list列表



#### 列表的定义

```py
# 定义一个列表
my_list1 = ["zhangsan", "lisi"]
my_list2 = ["wangwu", true, 66]  # 列表中的数据类型不限
my_list3 = [[1, 2, .3], [4, 5, 6]]  # 列表可以嵌套使用
"""
列表索引：
-从左到右：从0开始，依次加1
-从右到左：从-1开始，依次减1
"""
```

![](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319120109775.png)

#### 列表的查询功能



##### 查找列表下标

![image-20240319120715119](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319120715119.png)

##### 统计某元素在列表中的数量

![image-20240319123029718](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319123029718.png)

##### 统计列表内有多少元素

![image-20240319123125124](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319123125124.png)





#### 列表的修改功能

##### 修改特定索引的元素值

![image-20240319121222104](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319121222104.png)

##### 插入元素

![image-20240319121508160](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319121508160.png)

##### 追加元素

![image-20240319121849808](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319121849808.png)



![image-20240319122010688](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319122010688.png)

##### 删除元素

![image-20240319122155251](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319122155251.png)



![image-20240319122657464](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319122657464.png)

> remove方法中，从前到后搜索你输入的元素，并且只删除第一次找到的那一个



![image-20240319122934466](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319122934466.png)



##### 总结

![image-20240319123425518](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240319123425518.png)



#### 遍历（迭代）

​    遍历列表用内置函数	`len()`	(括号内填列表)

1. while循环

   ```py
   # 定义一个列表
   list = [1, 2, 3, 4, 5, 6]
   # 定义一个变量，标记列表下标
   count = 0
   # 遍历列表
   while count < len(list):
       # 定义变量，接收每一个list列表的元素
       element = list[count]
       count += 1
       print(f"列表的元素为：{element}, ", end = '')
   ```

2. for循环

   ```py
   # 定义一个列表
   list = [1, 2, 3, 4, 5, 6]
   # 遍历列表
   for element in list:
       print(f"列表的元素为：{element}, ", end = '')
   ```



### 元组

1. 列表是可以被修改的
2. 元组一旦定义完成，就不可以修改
3. 元组同列表一样，可以封装多个数据、不同类型的元素





###### 定义元组

```py
# 定义元组字面量
(元素, 元素, ... , 元素, 元素)
#定义元组变量
变量名 = (元素, 元素, ... , 元素, 元素)
#定义空元组
变量名 = ()  # 方式1
变量名 = tuple()  # 方式2
```





### 字符串

#### 查找特定字符串的下标索引值

- 字符串.index(字符串)

```py
str = "linsheng and pycharm"
print(str.index("and")) # 输出9
```

#### 字符串的替换

- 字符串.replace(字符串1, 字符串2)

  - 功能：将字符串内的全部 字符串1 ，替换成 字符串2

  - 注意：不是修改字符串本身，而是得到了一个新的字符串

    

```py
My_str = "linsheng and pycharm"
print(My_str.replace("and", "AND"))
```

#### 字符串的分割

- 字符串.split(分割符字符串)
- 按照指定的分割字符串，将字符串划分为多个字符串，并存入列表对象中
- 字符串本身不变，而是得到一个列表对象

```py
My_str = "linsheng and pycharm"
My_str_list = My_str.split(" ")  # 按照空格切割
print(f"将字符串{My_str}通过split进行切分，得到{My_str_list}")  # 切割之后的类型是list 类型
```

#### 字符串的规整操作

1. 字符串.strip()
2. 字符串.strip(字符串)



##### 去前后空格

```py
My_str = "		linsheng and pycharm		"
print(My_str.strip())  # 结果："linsheng and pycharm"
```

##### 去前后指定字符串

```py
My_str = "123linsheng and pycharm321"
print(My_str.strip("123"))  # 结果："linsheng and pycharm"
# 将"123"划分为三个小子串，只要满足里面的任意一个，就去掉
```

##### 统计字符出现的次数

```py
My_str = "linsheng and pycharm"
count = My_str.count("a")
print(f"字符a出现的次数为：{count}")
```

##### 统计字符串的长度

```py
My_str = "linsheng and pycharm"
lens = len(My_str)
print(lens)
```



##### 总结

![image-20240324131431872](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240324131431872.png)





### 序列的常用操作

- 序列支持切片，即：列表、字符串，均支持切片操作

- 切片：从一个序列中取出一个子序列

- 语法：***序列 [起始下标 : 结束下标 : 步长]***

- - 起始下标表示从何处开始，可以留空，留空视作从头开始
  - 结束下标（不含）表示何处结束，可以留空，留空视作截取到结尾
  - 步长表示，依次取元素的间隔
  - - 步长1表示，一个个取元素
    - 步长1表示，一个个取元素
    - 步长N表示，每次跳过N-1个元素取
    - 步长为负数表示，反向取 (注意，起始下标和结束下标也要反向标记)
  
- 此操作不会影响序列本身，而是会得到一个新的序列

###### 例子：

```py
# 倒序字符串，切片取出
my_str = "万过薪月,员序程马黑来,nohtyP学"
str1 = my_str[::-1][9:14]
# str1 = my_str[-10: -15: -1]  # 对字符串进行切片操作
print(str1)

# 切片取出，然后倒序
str2 = my_str[5: 10: 1]
str2 = str2[::-1]
# str2 = my_str[5:10][::-1]
print(str2)

# split分割，replace替换“来”为空，倒序字符串
str3 = my_str.split(",")[1]  # split 取出来是列表
print(str3.replace("来", "")[:: -1])
```



### 集合

- 列表可以修改、支持重复元素且有序
- 元组、字符串不可修改、支持重复元素且有序

- - 如果场景需要对内容做去重处理，列表、元组、字符串就不方便了

- 集合不支持元素重复（自带去重处理）、并且无序

##### 基本语法

定义集合用 `list = {"linsheng", 666, {"lian", 456, True}}`

定义空集合 ： `list = set()`  其中的list为变量名称



#### 集合的常用操作

##### 集合的修改

- 集合是无序的，所以集合不支持**下标索引访问**
- 集合跟列表一样，允许修改

###### 添加元素

> 语法：`集合.add(元素)`	-->将指定集合添加到集合内
>
> 结果：集合 **本身被修改**，添加了新元素

```py
My_set = {"Hello", "World"}
My_set.add("linsheng")
print(My_set)
```

###### 移除元素

> 语法：`集合.remove(元素)`  -->将指定元素从集合中移除
>
> 结果：集合本身被修改，移除了元素

```py
My_set = {"Hello", "World"}
my_set.remove("Hello")
```

###### 随机取出一个元素

> 语法：`集合.pop()`  --> 从集合中随机取出一个元素
>
> 结果：会得到一个元素的结果，同时集合本身被修改，元素被移动

```py
My_set = {"Hello", "World", "linsheng"}
element = My_set.pop()
print(My_set)
print(element)
```

###### 清空集合

> 语法：`集合.clear()`  --> 清除集合
>
> 结果：集合本身被清空

```py
My_set = {"Hello", "World", "linsheng"}
My_set.clear()
print(My_set)  # 结果：set()
```

###### 取出集合的差集

> 语法：`set1.defference(set2)`  --> 取出集合1和集合2的差集（集合一有，集合2没有的）
>
> 结果：得到一个新的集合，集合1和集合2不变

```py
set1 = {1, 2, 3}
set2 = {1, 5, 6}
set3 = set1.difference(set2)
set4 = set2.difference(set1)
print(set1)
print(set2)
print(set3)
print(set4)
```

###### 消除两个集合的差集

> 语法：`set1.difference_update(set2)`  --> 对比集合1和集合2，**在集合1中删除和集合2相同的元素**
>
> 结果：集合1被修改，集合2不变

```py
set1 = {1, 2, 3}
set2 = {1, 5, 6}
set1.difference_update(set2)
print(set1)  # 结果：{2, 3}
print(set2)  # 结果：{1, 5, 6}
```

###### 两个集合的合并

> 语法：`set1.union(set2)`  --> 将集合1和集合2组合成新的集合
>
> 结果：得到新的集合，集合1和集合2不变

```py
set1 = {1, 2, 3}
set2 = {1, 5, 6}
set3 = set1.union(set2)
print(set1)
print(set2)
print(set3)  # 结果：1,2,3,5,6
```

###### 统计集合中元素数量

> `count = len(set)`

```py
set = {1, 2, 3, 1, 2, 3}
count = len(set)
print(count)  #集合去重，故count结果为3
```

###### 集合的遍历

> 集合不支持下标，不能用while循环
>
> 可以用for循环

```py
i = 0  # i可以不写
for i in set1:
    print(f"集合的元素有：{i}")
```

###### 总结

![image-20240325123748879](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240325123748879.png)



### 字典

- 通过Key，取到对应的Value

#### 字典的定义

- 使用{} ， 不过存储的元素是一个一个的键值对
- 不可以重复
- ==不可以使用下标索引  --> 不能用while循环==

```py
# 定义字典字面量
{key: value, key:nalue, ......, key: value}
# 定义字典变量
My_dict = {key: value, key:nalue, ......, key: value}
# 定义空字典
My_dict = {}  # 方式1
My_dect = dict()  #方式2
```

<font color="red" size="4">**从字典中获取数据**</font>

```py
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
score = score_dict["甲"]
print(f"甲的成绩为：{score}")
score1 = score_dict["乙"]["语文"]
print(f"乙的语文成绩为：{score1}")
```



#### 字典的常用操作

##### 新增 / 更新元素

<font color="green" set="4">**语法**</font>

> `dict[Key] = Value` 

<font color="green" set="4">**结果**</font>

> 字典被修改，新增了元素

```py
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}
# 新增
stu_score["张学游"] = 66
print(stu_score)

```

<font color="red" set="5">==**l如果Key不存在就是新增，若存在就是更新（替换）**==</font>

> 因为字典中的Key不可以重复



##### 删除元素

```py
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}
score = stu_score.pop("周杰轮")
print(f"字典中被移除了一个元素，结果：{stu_score}，周杰轮的考试成绩为：{score}")
# 既可以删除元素，又可以得到Key的Value
```

##### 清空元素

<font color="red" set="3">==用pop方法==</font>

```py
# 清空元素
stu_score.clear()
print(f"字典清空之后为：{stu_score}")
```

##### 获取全部的Key

<font color="green" set="4">**语法**</font>

> `dict.keys()`

<font color="green" set="4">**结果**</font>

> 得到字典中全部的Key

```py
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}
Key = stu_score.keys()
print(Key)
```

##### 遍历字典

```py
# 定义一个字典
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}

keys = stu_score.keys()
# 遍历字典
for key in keys:  # 方式1：
    print(f"字典的Key是{key}")
    print(f"字典的value是：{stu_score[key]}")
    
    
for key in stu_score:  # 方式2：
    print(f"2字典的Key是{key}")
print(f"2字典的value是：{stu_score[key]}")
```

##### 统计字典内元素数量

==`len()`==

```py
stu_score = {
    "王力鸿": 77,
    "周杰轮": 88
}
# 统计字典内的元素数量
count = len(stu_score)
print(count)  # 结果：2
```

##### 总结

![image-20240325223343075](D:\26244\桌面\桌面文件\Markdown\Markdown图片\image-20240325223343075.png)

