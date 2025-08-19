// 检测页面是否已有回到顶部功能
function hasExistingBackToTop() {
    // 常见的回到顶部按钮选择器
    const selectors = [
        'a[href="#top"]',
        'button[aria-label*="top"]',
        '.back-to-top',
        '.scroll-to-top',
        '[data-action="scroll-to-top"]',
        '[id*="top"]'
    ];

    // 检查是否有匹配的元素
    for (const selector of selectors) {
        if (document.querySelector(selector)) {
            return true;
        }
    }

    // 检查是否有滚动到顶部的事件监听相关元素
    const elements = document.querySelectorAll('a, button');
    for (const el of elements) {
        const text = (el.textContent || '').toLowerCase();
        const title = (el.title || '').toLowerCase();
        if (text.includes('top') || title.includes('top') ||
            text.includes('顶部') || title.includes('顶部')) {
            return true;
        }
    }

    return false;
}

// 创建并添加回到顶部按钮
function addBackToTopButton() {
    // 检查是否已添加按钮
    if (document.getElementById('github-back-to-top-btn')) {
        return;
    }

    // 创建按钮元素
    const button = document.createElement('button');
    button.id = 'github-back-to-top-btn';
    button.innerHTML = '↑';
    button.title = '回到顶部';

    // 设置按钮样式
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.backgroundColor = '#2ea44f';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '50%';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.fontSize = '20px';
    button.style.cursor = 'pointer';
    button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    button.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    button.style.opacity = '0';
    button.style.visibility = 'hidden';
    button.style.zIndex = '9999';

    // 添加点击事件
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加到页面
    document.body.appendChild(button);

    // 滚动监听，控制按钮显示/隐藏
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// 页面加载完成后执行
window.addEventListener('load', () => {
    // 延迟执行，确保页面完全加载
    setTimeout(() => {
        if (!hasExistingBackToTop()) {
            addBackToTopButton();
        }
    }, 1000);
});

