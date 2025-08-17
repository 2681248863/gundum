// 页面加载进度条控制
class LoadingBar {
    constructor() {
        this.bar = document.createElement('div');
        this.bar.id = 'loading-bar';
        document.body.appendChild(this.bar);
        
        // 添加样式
        this.addStyles();
    }
    
    start() {
        this.bar.classList.add('loading-start');
    }
    
    complete() {
        this.bar.classList.remove('loading-start');
        this.bar.classList.add('loading-complete');
        
        // 动画完成后移除进度条
        setTimeout(() => {
            this.bar.remove();
        }, 1000);
    }
    
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #loading-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: transparent;
                z-index: 9999;
            }
            
            #loading-bar::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 100%;
                background: linear-gradient(90deg, #ff3e00, #0066cc);
                transition: width 0.3s ease;
            }
            
            #loading-bar.loading-start::before {
                width: 30%;
                transition: width 1s ease;
            }
            
            #loading-bar.loading-complete::before {
                width: 100%;
                opacity: 0;
                transition: width 0.5s ease, opacity 0.5s ease 0.5s;
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化加载进度条
const loadingBar = new LoadingBar();

// 页面开始加载
loadingBar.start();

// 页面加载完成
window.addEventListener('load', () => {
    loadingBar.complete();
});

// 如果页面加载时间过长，进度条也会继续前进
setTimeout(() => {
    if (document.readyState !== 'complete') {
        loadingBar.bar.style.setProperty('--progress', '70%');
    }
}, 2000);