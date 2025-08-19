// 当点击弹出页面中的回到顶部按钮时，向内容脚本发送消息
document.getElementById('scrollTop').addEventListener('click', () => {
    // 获取当前活动标签页
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        // 向内容脚本发送滚动到顶部的消息
        chrome.tabs.sendMessage(tabs[0].id, {action: "scrollToTop"});
        // 关闭弹出页面
        window.close();
    });
});
