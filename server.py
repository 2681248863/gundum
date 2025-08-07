#!/usr/bin/env python3

"""
高达宇宙网站本地服务器脚本

使用方法:
1. 确保已安装Python 3
2. 在命令行中运行: python server.py
3. 在浏览器中访问: http://localhost:8000
"""

import http.server
import socketserver
import os
import sys

# 定义服务器端口
PORT = 8000

# 获取当前脚本所在目录
script_dir = os.path.dirname(os.path.abspath(__file__))

# 更改工作目录到脚本所在目录
os.chdir(script_dir)

# 创建请求处理器
Handler = http.server.SimpleHTTPRequestHandler

# 创建TCP服务器
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"高达宇宙网站服务器启动在 http://localhost:{PORT}")
    print("按Ctrl+C停止服务器")
    try:
        # 启动服务器
        httpd.serve_forever()
    except KeyboardInterrupt:
        # 捕获Ctrl+C信号，优雅退出
        print("\n服务器已停止")
        sys.exit(0)