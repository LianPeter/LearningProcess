# 使用 with 语句自动处理文件关闭
file_path = r"E:\ProgramCode\PythonCode\Py_program\PythonStudy\IO.txt"

try:
    with open(file_path, encoding='utf-8') as f:
        # 在这里添加文件操作代码，例如读取文件内容
        content = f.read()
        print(content)
except FileNotFoundError:
    print(f"文件未找到: {file_path}")
except Exception as e:
    print(f"处理文件时出错: {e}")

