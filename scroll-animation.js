// 滚动动画控制器
class ScrollAnimation {
    constructor() {
        this.sections = document.querySelectorAll('.series-section, .chronicle-section, .gallery-section, .about-section');
        this.cards = document.querySelectorAll('.series-card, .timeline-item');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        // 为画廊项目设置索引
        this.galleryItems.forEach((item, index) => {
            item.style.setProperty('--index', index);
        });
        
        // 初始化Intersection Observer
        this.initObserver();
    }
    
    initObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 如果是部分元素
                    if (entry.target.classList.contains('series-section') || 
                        entry.target.classList.contains('chronicle-section') || 
                        entry.target.classList.contains('gallery-section') || 
                        entry.target.classList.contains('about-section')) {
                        entry.target.classList.add('section-visible');
                    }
                    
                    // 如果是卡片元素
                    if (entry.target.classList.contains('series-card') || 
                        entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('card-visible');
                    }
                    
                    // 如果是画廊项目
                    if (entry.target.classList.contains('gallery-item')) {
                        entry.target.classList.add('card-visible');
                    }
                    
                    // 停止观察已显示的元素
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // 观察所有元素
        this.sections.forEach(section => observer.observe(section));
        this.cards.forEach(card => observer.observe(card));
        this.galleryItems.forEach(item => observer.observe(item));
    }
}

// 页面加载完成后初始化滚动动画
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimation();
});