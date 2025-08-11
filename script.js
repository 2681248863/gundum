// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化高达背景动画
    initGundamBackground();

    // 创建多个能量光束
    function initGundamBackground() {
        const background = document.querySelector('.gundam-background');
        if (!background) return;

        // 创建高达轮廓
        const silhouette = document.createElement('div');
        silhouette.classList.add('gundam-silhouette');
        background.appendChild(silhouette);

        // 创建多个能量光束
        const beamCount = 8; // 光束数量
        for (let i = 0; i < beamCount; i++) {
            setTimeout(() => {
                const beam = document.createElement('div');
                beam.classList.add('energy-beam');
                
                // 随机位置
                const leftPos = Math.random() * 100;
                beam.style.left = `${leftPos}%`;
                
                // 随机动画延迟和持续时间
                const delay = Math.random() * 5;
                const duration = 8 + Math.random() * 7;
                beam.style.animationDelay = `${delay}s`;
                beam.style.animationDuration = `${duration}s`;
                
                // 随机颜色
                const colors = ['var(--gundam-blue)', 'var(--gundam-red)', 'var(--gundam-yellow)'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                beam.style.background = `linear-gradient(to bottom, transparent 0%, ${randomColor} 50%, transparent 100%)`;
                
                background.appendChild(beam);
            }, i * 500); // 错开创建时间
        }
    }
    // 移动端导航栏切换
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', function() {
        // 切换导航菜单
        nav.classList.toggle('nav-active');

        // 动画效果
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // 汉堡菜单动画
        burger.classList.toggle('toggle');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // 关闭移动端菜单（如果打开）
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 1)';
            header.style.boxShadow = 'none';
        }
    });

    // 加载画廊图片 (适用于GitHub Pages静态部署)
function loadGalleryImages() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    // 清空现有画廊内容
    galleryGrid.innerHTML = '';

    // 创建lightbox元素
    const lightbox = document.getElementById('lightbox') || document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    // 图片文件列表 - 包含标题和描述
    const imageFiles = [
        { name: 'IMG_3361.JPG', title: '自由高达', description: '眼部与光束剑细节展示' },
        { name: 'IMG_3363.JPG', title: '强袭自由高达', description: '背部推进器特写' },
        { name: 'IMG_3364.JPG', title: '独角兽高达', description: '毁灭模式启动' },
        { name: 'IMG_3367.JPG', title: '新安洲', description: '红色彗星的魅力' },
        { name: 'IMG_3368.JPG', title: '能天使高达', description: 'GN剑装备展示' },
        { name: 'IMG_3369.JPG', title: '00高达', description: '双太阳炉系统启动' }
    ];

    if (imageFiles.length === 0) {
        galleryGrid.innerHTML = '<p class="no-images">没有找到图片</p>';
        return;
    }

    // 图片加载完成计数器
    let loadedCount = 0;

    // 为每个图片创建元素并添加到画廊
    imageFiles.forEach((image, index) => {
        // 创建画廊项容器
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        // 创建内部容器
        const galleryItemInner = document.createElement('div');
        galleryItemInner.className = 'gallery-item-inner';

        // 创建加载动画容器
        const imgLoader = document.createElement('div');
        imgLoader.className = 'img-loader';
        imgLoader.innerHTML = '<div class="loader-spinner"></div>';

        // 创建图片元素
        const img = document.createElement('img');
        img.src = `model picture/${image.name}`;
        img.alt = image.title;
        img.loading = 'lazy'; // 延迟加载
        img.style.width = '100%';
        img.style.height = '250px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '4px 4px 0 0';

        // 创建图片标题和描述
        const caption = document.createElement('div');
        caption.className = 'gallery-caption';
        caption.innerHTML = `
            <h3 style="color: var(--gundam-yellow); margin: 0.5rem 1rem; text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);">${image.title}</h3>
            <p style="color: var(--gundam-gray); margin: 0 1rem 1rem; font-size: 0.9rem;">${image.description}</p>
        `;

        // 图片加载完成事件
        img.addEventListener('load', function() {
            // 移除加载动画
            imgLoader.remove();
            loadedCount++;

            // 当所有图片加载完成后，触发入场动画
            if (loadedCount === imageFiles.length) {
                triggerGalleryAnimation();
            }
        });

        // 图片加载失败事件
        img.addEventListener('error', function() {
            imgLoader.innerHTML = '<p style="color: var(--gundam-red);">图片加载失败</p>';
            loadedCount++;

            if (loadedCount === imageFiles.length) {
                triggerGalleryAnimation();
            }
        });

        // 添加点击放大事件 - 整个卡片可点击
        galleryItem.addEventListener('click', function() {
            lightbox.classList.add('active');
            const imgBig = document.createElement('img');
            imgBig.src = img.src;
            imgBig.alt = img.alt;
            imgBig.className = 'lightbox-image';
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            
            // 添加关闭按钮
            const closeBtn = document.createElement('div');
            closeBtn.id = 'lightbox-close';
            closeBtn.textContent = '×';
            closeBtn.addEventListener('click', function() {
                lightbox.classList.remove('active');
            });
            
            // 添加图片标题到lightbox
            const caption = document.createElement('div');
            caption.className = 'lightbox-caption';
            caption.textContent = image.title;
            
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(imgBig);
            lightbox.appendChild(caption);
        });

        // 为图片添加指针样式，提示可点击
        img.style.cursor = 'pointer';
        galleryItem.style.cursor = 'pointer';

        // 组装元素
        galleryItemInner.appendChild(imgLoader);
        galleryItemInner.appendChild(img);
        galleryItemInner.appendChild(caption);
        galleryItem.appendChild(galleryItemInner);
        galleryGrid.appendChild(galleryItem);
    });

    // 画廊项入场动画函数
    function triggerGalleryAnimation() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            // 为每个项添加不同的延迟，创建错开的动画效果
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 150);
        });
    }

    // ESC键关闭lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });

    // 点击lightbox空白处关闭
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // 初始化lightbox样式
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;

    // 激活lightbox的样式
    const style = document.createElement('style');
    style.textContent = `
        #lightbox.active {
            opacity: 1;
            pointer-events: auto;
        }
        #lightbox img {
            max-width: 90%;
            max-height: 90%;
            border: 3px solid var(--gundam-blue);
            box-shadow: 0 0 20px rgba(0, 102, 204, 0.5);
        }
        .gallery-caption {
            padding: 10px;
            background-color: #fff;
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后加载画廊图片
window.addEventListener('load', loadGalleryImages);

    // 页面加载动画
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = '<div class="loader-spinner"></div>';
    document.body.appendChild(loader);

    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(loader);
            }, 500);
        }, 800);
    });

    // 添加加载样式
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 10000;
        }

        #lightbox.active {
            opacity: 1;
            pointer-events: all;
        }

        #lightbox img {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
        }

        #loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #1a1a1a;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        }

        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #333;
            border-top: 5px solid #ff3e00;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // 为卡片添加悬停动画效果
    const animateOnHover = (elements) => {
        elements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });

            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    };

    // 应用动画到各个卡片元素
    animateOnHover(document.querySelectorAll('.series-card'));
    animateOnHover(document.querySelectorAll('.mobile-suit-card'));
    animateOnHover(document.querySelectorAll('.character-card'));
});



// 滚动动画
function revealOnScroll() {
    const reveals = document.querySelectorAll('.series-section, .mobile-suits-section, .characters-section, .gallery-section');

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);

revealOnScroll(); // 初始检查