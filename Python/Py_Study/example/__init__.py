import requests
from bs4 import BeautifulSoup
import os
import logging
from datetime import datetime

# 设置日志
logging.basicConfig(filename='error.log', level=logging.DEBUG)

# 创建保存目录
save_dir = "E:\\task\\blog"
if not os.path.exists(save_dir):
    os.makedirs(save_dir)


def generate_unique_filename(title, save_dir):
    base_filename = "".join([c if c.isalnum() else "_" for c in title])
    if not base_filename:
        base_filename = "Untitled"

    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{base_filename}_{timestamp}.md"
    filepath = os.path.join(save_dir, filename)

    # 确保文件名唯一
    count = 1
    while os.path.exists(filepath):
        filename = f"{base_filename}_{timestamp}_{count}.md"
        filepath = os.path.join(save_dir, filename)
        count += 1

    return filepath


def get_article_links(author_url):
    article_links = []
    while author_url:
        response = requests.get(author_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')

        # 获取所有文章的链接
        articles = soup.select('h2 a')  # 根据实际网页结构调整选择器
        for article in articles:
            link = article.get('href')
            if link:
                article_links.append(link)

        # 查找下一页链接
        next_page = soup.select_one('a.next')  # 根据实际网页结构调整选择器
        if next_page and next_page.get('href'):
            author_url = next_page.get('href')
        else:
            author_url = None

    return article_links


def crawl_article(url):
    try:
        logging.debug(f"开始爬取: {url}")
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')

        # 获取标题和正文
        title_tag = soup.select_one('h1.article-title, h2.title')  # 根据实际网页结构调整
        title = title_tag.text.strip() if title_tag else "Untitled"

        content_tag = soup.select_one('div.article-content, div.post, article')  # 根据实际网页结构调整
        if content_tag:
            content_text = content_tag.get_text(separator='\n', strip=True)
        else:
            content_text = "无法找到正文内容"

        # 生成Markdown内容
        markdown_content = f"# {title}\n\n{content_text}"

        # 保存到文件
        filepath = generate_unique_filename(title, save_dir)
        logging.debug(f"保存文件到: {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        print(f"已保存: {filepath}")

    except requests.exceptions.RequestException as e:
        logging.error(f"网络请求错误 ({url}): {e}", exc_info=True)
    except Exception as e:
        logging.error(f"爬取 {url} 时出错: {e}", exc_info=True)  # 记录详细异常信息


def main():
    author_url = 'https://www.cnblogs.com/peter1994',
    article_links = get_article_links(author_url)

    for link in article_links:
        crawl_article(link)


if __name__ == "__main__":
    main()
