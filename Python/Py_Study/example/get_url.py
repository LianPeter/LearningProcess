import requests
from bs4 import BeautifulSoup
import urllib.parse
import os


def scan_page(url, output_files):
    website_urls = set()
    upage_urls = set()
    session = requests.Session()

    try:
        response = session.get(url)
        response.raise_for_status()
        html = response.text
    except requests.RequestException as e:
        print(f"网络请求错误: {e}")
        return

    soup = BeautifulSoup(html, 'html.parser')
    page_urls = soup.find_all("a", href=True)

    for link in page_urls:
        href = link.get("href")
        absolute_url = urllib.parse.urljoin(url, href)
        if url in absolute_url and absolute_url not in upage_urls and absolute_url not in website_urls:
            upage_urls.add(absolute_url)

    # 保存 URL 到 TXT 文件
    try:
        with open(output_files, 'w', encoding='utf-8') as file:
            for link in upage_urls:
                file.write(f"{link}\n")
        print(f"URL 已保存到: {output_files}")
    except IOError as e:
        print(f"文件操作错误: {e}")

    for link in upage_urls:
        try:
            response = session.get(link)
            response.raise_for_status()
            status_code = response.status_code
            print(f"{link}: {status_code}")
        except requests.RequestException as e:
            print(f"连接失败: {link}, 错误: {e}")
        else:
            print(f"{link}: {status_code}")

    print(f"总链接数: {len(upage_urls)}")


# 获取当前项目的目录
current_directory = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(current_directory, 'urls.txt')

# 运行扫描
scan_page("https://www.cnblogs.com/peter1994", output_file)
