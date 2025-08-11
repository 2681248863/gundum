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
import json

# 定义服务器端口
PORT = 8001

# 获取当前脚本所在目录
script_dir = os.path.dirname(os.path.abspath(__file__))

# 更改工作目录到脚本所在目录
os.chdir(script_dir)

# 自定义请求处理器
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # 处理API请求获取图片列表
        if self.path == '/api/images':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            # 获取图片文件夹路径
            image_folder = os.path.join(script_dir, 'model picture')

            # 检查文件夹是否存在
            if not os.path.exists(image_folder):
                response = {'error': '图片文件夹不存在'}
                self.wfile.write(json.dumps(response).encode())
                return

            # 获取文件夹中的所有图片文件
            image_extensions = ['.jpg', '.jpeg', '.png', '.gif', '.heic']
            image_files = []
            for file in os.listdir(image_folder):
                if any(file.lower().endswith(ext) for ext in image_extensions):
                    image_files.append(file)

            # 发送图片列表
            response = {'images': image_files}
            self.wfile.write(json.dumps(response).encode())
            return

        # 处理其他请求
        super().do_GET()

# 创建请求处理器
Handler = CustomHandler

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