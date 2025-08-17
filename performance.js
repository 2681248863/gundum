// 图片预加载函数
function preloadImages() {
    // 预加载关键图片
    const imagesToPreload = [
        'freedom1.jpg',
        'shunbian.jpg',
        'unicorn.jpg'
    ];
    
    // 创建图片对象并预加载
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// 页面加载完成后执行预加载
window.addEventListener('load', preloadImages);

// 滚动性能优化
function optimizeScroll() {
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        // 如果已经有一个定时器在运行，清除它
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        // 使用requestAnimationFrame优化滚动性能
        scrollTimeout = window.requestAnimationFrame(function() {
            // 检测可视区域内的元素
            revealElementsInViewport();
        });
    });
}

// 检测可视区域内的元素并触发动画
function revealElementsInViewport() {
    const elements = document.querySelectorAll('.series-card, .timeline-item, .gallery-item');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// 初始化滚动优化
document.addEventListener('DOMContentLoaded', optimizeScroll);

// 图片加载错误处理
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // 设置默认图片
            this.src = 'https://via.placeholder.com/300x200?text=图片加载失败';
            this.alt = '图片加载失败';
        });
    });
}

// 初始化图片错误处理
document.addEventListener('DOMContentLoaded', handleImageErrors);

// 优化页面加载
function optimizePageLoad() {
    // 延迟加载非关键资源
    setTimeout(() => {
        // 加载字体图标
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }, 2000);
}

// 初始化页面加载优化
document.addEventListener('DOMContentLoaded', optimizePageLoad);