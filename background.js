// 是否显示图片
var showImage;
chrome.storage.sync.get({ showImage: true }, function (items) {
  showImage = items;
});

console.log(showImage);

// 后台监听事件消息
// 如果manifest.json未配置 action.default_popup，点击扩展按钮会触发此事件
chrome.action.onClicked.addListener(function (tab) {
  chrome.action.setTitle({ tabId: tab.id, title: "You are on tab:" + tab.id });
});

// 后台监听事件消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let requestType = message.type;
  switch (requestType) {
    // 检测是否是扩展开启状态
    case "checkFlag":
      sendResponse({ runtime: true });
      break;

    // 开始学习
    case "startRun":
      sendResponse({ complete: 1 });
      break;
  }
});

// 插件安装监听事件
chrome.runtime.onInstalled.addListener(() => {
  // 清除插件所有的本地数据
  chrome.storage.local.clear();

  // 设置初始数据
  chrome.storage.local.set(
    {
      demo: "demo 数据",
      env: "dev",
    },
    function () {
      console.log("chrome extension is install.");
    }
  );
});
