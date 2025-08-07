#!/usr/bin/env python3

import os
import re

# 配置参数
IMAGE_FOLDER = 'model picture'
SCRIPT_FILE = 'script.js'
IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.heic']


def update_image_list():
    """更新script.js文件中的图片列表"""
    # 1. 扫描图片文件夹
    image_files = []
    for file in os.listdir(IMAGE_FOLDER):
        if any(file.lower().endswith(ext) for ext in IMAGE_EXTENSIONS):
            image_files.append(file)

    if not image_files:
        print("警告: 未找到任何图片文件")
        return

    print(f"找到 {len(image_files)} 个图片文件:")
    for file in image_files:
        print(f"  - {file}")

    # 2. 读取script.js文件内容
    with open(SCRIPT_FILE, 'r', encoding='utf-8') as f:
        script_content = f.read()

    # 3. 找到并更新imageFiles数组
    # 匹配图片数组的正则表达式
    pattern = r'(const imageFiles = \[)([\s\S]*?)(\];)'
    
    # 构建新的数组内容
    new_array_content = '\n        ' + ',\n        '.join([f"'{file}'" for file in image_files]) + '\n    '
    
    # 替换旧的数组内容
    updated_content = re.sub(pattern, r'\g<1>{}\g<3>'.format(new_array_content), script_content)
    
    # 4. 写回script.js文件
    with open(SCRIPT_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"成功更新 {SCRIPT_FILE} 中的图片列表")


if __name__ == '__main__':
    update_image_list()