// 服务工作者脚本
const CACHE_NAME = 'gundam-site-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles.css',
  '/gundam_card_effects.css',
  '/responsive.css',
  '/scroll-animation.css',
  '/loading-bar.css',
  '/script.js',
  '/gundam_card_scripts.js',
  '/performance.js',
  '/scroll-animation.js',
  '/loading-bar.js',
  '/freedom1.jpg',
  '/freedom2.png',
  '/shunbian.jpg',
  '/shunbian2.jpg',
  '/unicorn.jpg',
  '/unicorn2.jpeg',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 安装阶段 - 缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 激活阶段 - 清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求 - 缓存优先策略
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 返回缓存资源或网络请求
        return response || fetch(event.request);
      })
      .catch(() => {
        // 如果请求失败且是HTML页面，返回离线页面
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }
      })
  );
});