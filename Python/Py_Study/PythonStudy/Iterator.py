# 定义一个列表
my_list = [4, 7, 0, 3]

# 使用iter()获得迭代器
my_iter = iter(my_list)  # next()函数手动遍历迭代器的所有项目。 当我们到达末尾并且没有更多数据要返回时，它将引发StopIteration。

## 使用iter()获得迭代器

#输出 4
print(next(my_iter))

#输出 7
print(next(my_iter))

## next（obj）与obj .__ next __()相同

#输出 0
print(my_iter.__next__())

#输出 3
print(my_iter.__next__())

## 这将引起错误，没有项目剩下
# next(my_iter)


# 一个简单的生成器函数
def my_gen():  # 生成器对象只能迭代一次
    n = 1
    print('这是第一次打印')
    # 生成器函数包含yield语句
    yield n

    n += 1
    print('这是第二次打印')
    yield n

    n += 1
    print('这是最后一次打印')
    yield n

for x in my_gen():  # 将生成器与for循环一起使用
    print(x)

print(0.1+0.2)

## 闭包
def print_msg(msg):
# 这是外部封闭函数

    def printer():
    # 这是嵌套函数
        print(msg)

    printer()

# 我们执行这个函数
# 输出: Hello
print_msg("Hello")
