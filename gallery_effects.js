// 高达风格画廊特效初始化
class GalleryEffects {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.initItems();
    }

    initItems() {
        this.galleryItems.forEach(item => {
            // 添加机械纹理层
            const mechPattern = document.createElement('div');
            mechPattern.className = 'mech-pattern';
            item.appendChild(mechPattern);

            // 添加能量指示器
            const energyIndicator = document.createElement('div');
            energyIndicator.className = 'energy-indicator';
            
            const energyLevel = document.createElement('div');
            energyLevel.className = 'energy-level';
            energyIndicator.appendChild(energyLevel);
            
            item.appendChild(energyIndicator);

            // 添加高达标志
            const gundamBadge = document.createElement('div');
            gundamBadge.className = 'gundam-badge';
            item.appendChild(gundamBadge);

            // 添加粒子效果
            for (let i = 0; i < 4; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                item.appendChild(particle);
            }
        });
    }
}

// 页面加载完成后初始化画廊特效
document.addEventListener('DOMContentLoaded', () => {
    new GalleryEffects();
});