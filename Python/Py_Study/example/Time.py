import requests
import time

# 目标网页的URL
url = 'https://www.cnblogs.com/peter1994/p/8182554.html'

# 统计访问100次URL所需的时间
total_time = 0

for i in range(100):
    start_time = time.time()
    response = requests.get(url)
    end_time = time.time()
    total_time += end_time - start_time
    print(f'Access {i+1}: {end_time - start_time:.10f} seconds')

average_time = total_time / 100
print(f'Average time for 100 accesses: {average_time:.10f} seconds')
