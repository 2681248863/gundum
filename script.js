// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
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

    // 图片画廊点击放大效果
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.classList.add('active');
            const imgBig = document.createElement('img');
            imgBig.src = this.src;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(imgBig);
        });
    });

    lightbox.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.classList.remove('active');
        }
    });

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

// 图片上传功能
function setupUploadFunctionality() {
    const uploadForm = document.getElementById('upload-form');
    const uploadStatus = document.getElementById('upload-status');
    const modelImage = document.getElementById('model-image');
    const galleryGrid = document.querySelector('.gallery-grid');

    if (!uploadForm || !uploadStatus) return;

    // 表单提交处理
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const modelName = document.getElementById('model-name').value;
        const modelDescription = document.getElementById('model-description').value;
        const imageFile = modelImage.files[0];

        if (!modelName || !imageFile) {
            showUploadStatus('请填写模型名称并选择图片', 'error');
            return;
        }

        // 模拟上传过程
        showUploadStatus('上传中...', 'success');

        // 由于GitHub Pages是静态服务，这里只做前端预览
        setTimeout(() => {
            // 读取图片文件并显示预览
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgUrl = e.target.result;

                // 添加到画廊
                if (galleryGrid) {
                    const newImg = document.createElement('img');
                    newImg.src = imgUrl;
                    newImg.alt = modelName;
                    newImg.addEventListener('click', function() {
                        openLightbox(this.src);
                    });
                    galleryGrid.appendChild(newImg);
                }

                showUploadStatus('上传成功！图片已添加到画廊', 'success');
                uploadForm.reset();
            };
            reader.readAsDataURL(imageFile);
        }, 1500);
    });

    // 显示上传状态
    function showUploadStatus(message, type) {
        uploadStatus.textContent = message;
        uploadStatus.className = 'upload-status ' + type;
    }

    // 复用图片画廊的放大功能
    function openLightbox(imgSrc) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.add('active');
            const imgBig = document.createElement('img');
            imgBig.src = imgSrc;
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild);
            }
            lightbox.appendChild(imgBig);
        }
    }
}

// 滚动动画
function revealOnScroll() {
    const reveals = document.querySelectorAll('.series-section, .mobile-suits-section, .characters-section, .gallery-section, .upload-section');

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

// 初始化上传功能
setupUploadFunctionality();
revealOnScroll(); // 初始检查