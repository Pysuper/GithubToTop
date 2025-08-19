// 检查当前页面是否是GitHub网站
if (window.location.hostname.includes('github.com')) {
    // 创建回到顶部按钮
    const button = document.createElement('button');
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #2ea44f;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
        transform: translateY(20px);
        z-index: 9999;
    `;
    
    // 添加到页面
    document.body.appendChild(button);
    
    // 点击按钮回到顶部
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 监听滚动事件，控制按钮显示/隐藏
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // 当滚动超过300px时显示按钮
            button.style.opacity = '1';
            button.style.visibility = 'visible';
            button.style.transform = 'translateY(0)';
        } else { // 否则隐藏按钮
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
            button.style.transform = 'translateY(20px)';
        }
    });
    
    // 接收来自popup的消息
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "scrollToTop") {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}
