// 语言切换功能
let currentLang = localStorage.getItem('language') || 'zh';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateContent();
}

function updateContent() {
    const lang = languages[currentLang];
    
    // 更新导航栏
    document.querySelectorAll('.nav-links a').forEach(link => {
        const key = link.getAttribute('data-lang-key');
        if (key) {
            link.textContent = lang.nav[key];
        }
    });

    // 更新页面内容
    document.querySelectorAll('[data-lang]').forEach(element => {
        const keys = element.getAttribute('data-lang').split('.');
        let value = lang;
        for (const key of keys) {
            value = value[key];
        }
        if (value) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });
}

// 初始化语言
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    
    // 添加语言切换按钮事件监听
    document.querySelectorAll('.lang-switch').forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// 轮播图功能
class Carousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        if (!this.container) return;

        this.carousel = this.container.querySelector('.carousel');
        this.items = this.container.querySelectorAll('.carousel-item');
        this.indicators = this.container.querySelectorAll('.indicator');
        this.prevBtn = this.container.querySelector('.prev');
        this.nextBtn = this.container.querySelector('.next');
        
        this.currentIndex = 0;
        this.interval = null;
        
        this.init();
    }

    init() {
        // 绑定按钮事件
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // 绑定指示器事件
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goTo(index));
        });

        // 自动播放
        this.startAutoPlay();
        
        // 鼠标悬停时暂停自动播放
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    goTo(index) {
        // 移除当前活动项的active类
        this.items[this.currentIndex].classList.remove('active');
        this.indicators[this.currentIndex].classList.remove('active');
        
        // 更新当前索引
        this.currentIndex = index;
        
        // 添加新活动项的active类
        this.items[this.currentIndex].classList.add('active');
        this.indicators[this.currentIndex].classList.add('active');
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.goTo(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.goTo(prevIndex);
    }

    startAutoPlay() {
        this.interval = setInterval(() => this.next(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.interval);
    }
}

// 初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 添加 EmailJS 初始化代码
(function() {
    emailjs.init("82kn8yudyKFB8jPOb");
})();

// 处理表单提交
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: this.querySelector('[name="name"]').value,
                phone: this.querySelector('[name="phone"]').value,
                email: this.querySelector('[name="email"]').value,
                message: this.querySelector('[name="message"]').value
            };

            // 发送邮件
            emailjs.send('service_mynywza', 'template_jzrqhl9', {
                to_email: '2477532394@qq.com',
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert(currentLang === 'zh' ? '感谢您的留言，我们会尽快回复！' : 'Thank you for your message. We will reply soon!');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert(currentLang === 'zh' ? '发送失败，请稍后重试。' : 'Failed to send message. Please try again later.');
            });
        });
    }
});

// 产品卡片动画
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 