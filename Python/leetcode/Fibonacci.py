def fibonacci_modulo(n):
    # 处理特殊情况，n == 1 或 n == 2时，直接返回1
    if n == 1 or n == 2:
        return 1

    # 初始化Fibonacci数列的前两项
    a, b = 1, 1

    # 从第3项开始迭代计算Fibonacci数列
    for i in range(3, n + 1):
        a, b = b, (a + b) % 10007

    return b


# 读取输入
n = int(input().strip())

# 输出结果
print(fibonacci_modulo(n))
