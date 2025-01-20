// 监听来自其他扩展组件的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "callDeepseekAPI") {
      fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${request.apiKey}`, // 从消息中获取 apiKey
        },
        body: JSON.stringify({
          model: "deepseek-coder",
          messages: request.messages,
          stream: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          sendResponse({ result: data.choices[0].message.content });
        })
        .catch((error) => {
          sendResponse({ error: error.message });
        });
      return true; // 保持消息通道打开以进行异步响应
    }
  });