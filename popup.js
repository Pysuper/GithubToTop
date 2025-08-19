// 回到顶部按钮点击事件
document.getElementById('backToTopBtn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    window.close();
});

// 检查当前页面状态
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: () => {
            // 检测页面是否有原生回到顶部功能
            function hasExistingBackToTop() {
                const selectors = [
                    'a[href="#top"]',
                    'button[aria-label*="top"]',
                    '.back-to-top',
                    '.scroll-to-top',
                    '[data-action="scroll-to-top"]',
                    '[id*="top"]'
                ];

                for (const selector of selectors) {
                    if (document.querySelector(selector)) {
                        return true;
                    }
                }

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

            return {
                hasNative: hasExistingBackToTop(),
                hasOurButton: document.getElementById('github-back-to-top-btn') !== null
            };
        }
    }, (results) => {
        if (results && results[0]) {
            const statusEl = document.getElementById('statusText');
            if (results[0].result.hasNative) {
                statusEl.textContent = "页面已有回到顶部功能";
            } else if (results[0].result.hasOurButton) {
                statusEl.textContent = "已添加回到顶部按钮";
            } else {
                statusEl.textContent = "点击按钮回到顶部";
            }
        }
    });
});

