import requests
from bs4 import BeautifulSoup
import os
from datetime import datetime

# 创建保存目录
save_dir = "E:\\task\\blog"
if not os.path.exists(save_dir):
    os.makedirs(save_dir)


def generate_unique_filename(title, save_dir):
    base_filename = ''
    for c in title:
        if c.isalnum():
            base_filename += c
        else:
            base_filename += '_'

    if not base_filename:
        base_filename = "Untitled"

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{base_filename}_{timestamp}.txt"
    filepath = os.path.join(save_dir, filename)

    # 确保文件名唯一
    count = 1
    while os.path.exists(filepath):
        filename = f"{base_filename}_{timestamp}_{count}.txt"
        filepath = os.path.join(save_dir, filename)
        count += 1

    return filepath


def crawl_and_save(url):
    try:
        print(f"开始爬取: {url}")
        response = requests.get(url)
        response.raise_for_status()  # 检查请求是否成功
        soup = BeautifulSoup(response.content, 'html.parser')

        # 获取标题
        title_tag = soup.find(['h1', 'h2', 'title'])  # 获取第一个 h1, h2 或 title 标签
        title = title_tag.text.strip() if title_tag else "Untitled"

        # 获取正文内容
        body_tag = soup.find('body')
        if body_tag:
            content_text = body_tag.get_text(separator='\n', strip=True)  # 获取文本内容
        else:
            content_text = "无法找到正文内容"

        # 生成文本内容
        text_content = f"# {title}\n\n{content_text}"

        # 保存到文件
        filepath = generate_unique_filename(title, save_dir)
        print(f"保存文件到: {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(text_content)

        print(f"已保存: {filepath}")

    except requests.exceptions.RequestException as e:
        print(f"网络请求错误 ({url}): {e}")
    except Exception as e:
        print(f"爬取 {url} 时出错: {e}")


# 主程序
urls = [
    'https://www.cnblogs.com/peter1994/p/archive/2018/01/25',
    'https://www.cnblogs.com/peter1994/p/archive/2017/11/23',
    'https://www.cnblogs.com/peter1994/p/8205646.html',
    'https://www.cnblogs.com/peter1994/p/8352892.html',
    'https://www.cnblogs.com/peter1994',
    'https://www.cnblogs.com/peter1994/p/8182554.html',
    'https://www.cnblogs.com/peter1994/',
    'https://www.cnblogs.com/peter1994/p/archive/2018/01/05',
    'https://www.cnblogs.com/peter1994/p/archive/2017/12/28',
    'https://www.cnblogs.com/peter1994/p/archive/2017/12/11',
    'https://www.cnblogs.com/peter1994/p/archive/2018/01/12',
    'https://www.cnblogs.com/peter1994/p/archive/2018/01/16',
    'https://www.cnblogs.com/peter1994/p/8298753.html',
    'https://www.cnblogs.com/peter1994/p/8058627.html',
    'https://www.cnblogs.com/peter1994?page=2',
    'https://www.cnblogs.com/peter1994/p/8274882.html',
    'https://www.cnblogs.com/peter1994/p/archive/2018/01/03',
    'https://www.cnblogs.com/peter1994/p/archive/2017/12/18',
    'https://www.cnblogs.com/peter1994/p/7883723.html',
    'https://www.cnblogs.com/peter1994/p/8134075.html',
    'https://www.cnblogs.com/peter1994/p/8058531.html',
    'https://www.cnblogs.com/peter1994/p/8024620.html'
]

for url in urls:
    crawl_and_save(url)
