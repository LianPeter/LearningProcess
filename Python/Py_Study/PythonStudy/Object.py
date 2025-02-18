class Parrot:

    # 类属性
    species = "鸟"

    # 示例属性
    def __init__(self, name, age):
        self.name = name
        self.age = age

# 示例化Parrot类
blu = Parrot("麻雀", 10)
woo = Parrot("鹦鹉", 15)

# 访问类属性
print("麻雀是 {}".format(blu.__class__.species))
print("鹦鹉也是 {}".format(woo.__class__.species))

# 访问示例属性
print("{} 有 {} 岁".format( blu.name, blu.age))
print("{} 有 {} 岁".format( woo.name, woo.age))

# 使用继承
# 基类
class Bird:

    def __init__(self):
        print("鸟准备好了")

    def whoisThis(self):
        print("鸟")

    def swim(self):
        print("游得更快")


# 子类
class Penguin(Bird):

    def __init__(self):
        # call super() function
        super().__init__()
        print("企鹅准备好了")

    def whoisThis(self):
        print("企鹅")

    def run(self):
        print("跑得更快")


peggy = Penguin()
peggy.whoisThis()
peggy.swim()
peggy.run()


# 在Python中使用OOP，我们可以限制对方法和变量的访问。
# 这样可以防止数据直接修改（称为封装）。
# 在Python中，我们使用下划线作为前缀来表示私有属性，即单“ _”或双“ __”
class Computer:  # 数据封装

    def __init__(self):
        self.__maxprice = 900

    def sell(self):
        print("售价: {}".format(self.__maxprice))

    def setMaxPrice(self, price):
        self.__maxprice = price

c = Computer()
c.sell()  # 900

# 改变价格 ---> 私有，不可以这样子更改
c.__maxprice = 1000
c.sell()  # 900

# 使用setter函数
c.setMaxPrice(1000)
c.sell()  # 1000