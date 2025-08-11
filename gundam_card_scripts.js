/* 高达模型卡片交互脚本 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化卡片特效
    initCardEffects();
    // 初始化板块特效
    initSectionEffects();
    // 初始化鼠标轨迹特效
    initMouseTrailEffect();
});

// 添加装甲线条装饰
function addArmorLines(element) {
    const effectsContainer = element.querySelector('.card-effects-container') || element;
    
    // 创建装甲线条
    const armorLineTopLeft = document.createElement('div');
    armorLineTopLeft.classList.add('armor-line-top-left');
    
    const armorLineTopRight = document.createElement('div');
    armorLineTopRight.classList.add('armor-line-top-right');
    
    const armorLineBottomLeft = document.createElement('div');
    armorLineBottomLeft.classList.add('armor-line-bottom-left');
    
    const armorLineBottomRight = document.createElement('div');
    armorLineBottomRight.classList.add('armor-line-bottom-right');
    
    const diagonalLine = document.createElement('div');
    diagonalLine.classList.add('diagonal-line');
    
    // 添加到特效容器
    effectsContainer.appendChild(armorLineTopLeft);
    effectsContainer.appendChild(armorLineTopRight);
    effectsContainer.appendChild(armorLineBottomLeft);
    effectsContainer.appendChild(armorLineBottomRight);
    effectsContainer.appendChild(diagonalLine);
}

// 添加能量充能效果
function addEnergyChargeEffect(element) {
    const effectsContainer = element.querySelector('.card-effects-container') || element;
    
    // 创建能量充能效果
    const energyCharge = document.createElement('div');
    energyCharge.classList.add('energy-charge');
    
    // 添加到特效容器
    effectsContainer.appendChild(energyCharge);
}

// 初始化板块特效
function initSectionEffects() {
    // 获取所有主要板块
    const sections = document.querySelectorAll('.hero-section, .series-section, .model-details, .about-section, .gallery-section, .chronicle-section');

    // 为每个板块添加效果
    sections.forEach(section => {
        // 添加gundam-section类
        section.classList.add('gundam-section');

        // 添加效果容器
        const effectsContainer = document.createElement('div');
        effectsContainer.classList.add('card-effects-container');
        section.appendChild(effectsContainer);

        // 添加装甲线条装饰
        addArmorLines(section);

        // 添加能量充能效果
        addEnergyChargeEffect(section);
    });
}

// 初始化鼠标轨迹特效
function initMouseTrailEffect() {
    // 监听鼠标移动事件
    document.addEventListener('mousemove', function(e) {
        // 创建轨迹粒子
        createTrailParticle(e.clientX, e.clientY);
    });
}

// 创建轨迹粒子
function createTrailParticle(x, y) {
    // 创建粒子元素
    const particle = document.createElement('div');
    particle.classList.add('trail-particle');

    // 设置粒子位置
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // 随机颜色 - 使用高达主题色
    const colors = ['#ff3e00', '#0066cc', '#00cc66', '#ffcc00', 'white'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = randomColor;

    // 添加发光效果
    particle.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;

    // 添加到文档
    document.body.appendChild(particle);

    // 动画结束后移除粒子
    setTimeout(() => {
        particle.remove();
    }, 1500);
}

// 初始化卡片特效
function initCardEffects() {
    // 获取所有模型卡片
    const seriesCards = document.querySelectorAll('.series-card, .chronicle-section .card');
    
    // 为每个卡片添加特效元素
    seriesCards.forEach(card => {
        // 创建特效容器
        const effectsContainer = document.createElement('div');
        effectsContainer.classList.add('card-effects-container');
        
        // 创建装甲线条
        const armorLineTopLeft = document.createElement('div');
        armorLineTopLeft.classList.add('armor-line-top-left');
        
        const armorLineTopRight = document.createElement('div');
        armorLineTopRight.classList.add('armor-line-top-right');
        
        const armorLineBottomLeft = document.createElement('div');
        armorLineBottomLeft.classList.add('armor-line-bottom-left');
        
        const armorLineBottomRight = document.createElement('div');
        armorLineBottomRight.classList.add('armor-line-bottom-right');
        
        const diagonalLine = document.createElement('div');
        diagonalLine.classList.add('diagonal-line');
        
        // 创建能量充能效果
        const energyCharge = document.createElement('div');
        energyCharge.classList.add('energy-charge');
        
        // 添加到特效容器
        effectsContainer.appendChild(armorLineTopLeft);
        effectsContainer.appendChild(armorLineTopRight);
        effectsContainer.appendChild(armorLineBottomLeft);
        effectsContainer.appendChild(armorLineBottomRight);
        effectsContainer.appendChild(diagonalLine);
        effectsContainer.appendChild(energyCharge);
        
        // 添加到卡片
        card.appendChild(effectsContainer);
        
        // 添加鼠标悬停粒子效果
        addParticleEffect(card);
    });
}

// 添加鼠标悬停粒子效果
function addParticleEffect(card) {
    // 鼠标进入卡片时创建粒子
    card.addEventListener('mouseenter', function(e) {
        // 创建10个随机粒子
        for (let i = 0; i < 10; i++) {
            createParticle(card);
        }
    });
}

// 创建单个粒子
function createParticle(card) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // 随机大小和位置
    const size = Math.random() * 6 + 2;
    const x = Math.random() * card.offsetWidth;
    const y = Math.random() * card.offsetHeight;
    
    // 随机颜色 - 高达主题色
    const colors = ['#ff3e00', '#0066cc', '#00cc66', '#ffcc00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // 设置粒子样式
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.boxShadow = `0 0 10px ${color}`;
    
    // 随机动画延迟
    particle.style.animationDelay = `${Math.random() * 2}s`;
    
    // 添加到卡片
    card.appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(() => {
        particle.remove();
    }, 2000);
}