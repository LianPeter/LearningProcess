import requests
from bs4 import BeautifulSoup

# 目标网页的URL
url = 'https://www.cnblogs.com/peter1994/p/8182554.html'

# 发送HTTP GET请求
response = requests.get(url)

# 检查请求是否成功
if response.status_code == 200:
    # 使用BeautifulSoup解析网页内容
    soup = BeautifulSoup(response.content, 'html.parser')

    # 获取网页标题
    title = soup.title.string
    print(f'Title: {title}')

    # 获取所有段落文本
    paragraphs = soup.find_all('p')
    for p in paragraphs:
        print(p.text)
else:
    print(f'无法检索网页 :  {response.status_code}')
