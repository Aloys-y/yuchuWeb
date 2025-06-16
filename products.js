// 产品分类筛选功能
document.addEventListener('DOMContentLoaded', function() {
    console.log('产品页面加载完成');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    console.log('找到的筛选按钮数量:', filterButtons.length);
    console.log('找到的产品卡片数量:', productCards.length);
    
    // 初始设置：确保"全部产品"按钮激活
    filterButtons[0].classList.add('active');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // 防止可能的默认行为
            
            console.log('点击了筛选按钮:', button.getAttribute('data-category'));
            
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            button.classList.add('active');

            const category = button.getAttribute('data-category');
            console.log('选中的分类:', category);
            
            // 筛选产品
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                console.log('产品卡片分类:', cardCategory);
                
                if (category === 'all' || cardCategory === category) {
                    console.log('显示产品:', cardCategory);
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    console.log('隐藏产品:', cardCategory);
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}); 