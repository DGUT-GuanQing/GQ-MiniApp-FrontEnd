export function navigateTo(url) {
  wx.navigateTo({
    url: url,
    success: function (res) {
      // 从全局变量中获取当前页面的上下文信息
      const page = getApp().globalData.currentPage;
      // 在当前页面上下文中调用回调函数
      if (page && page.onNavigateSuccess) {
        page.onNavigateSuccess(res);
      }
    },
    fail: function () {
      const page = getApp().globalData.currentPage;
      if (page && page.onNavigateFail) {
        page.onNavigateFail();
      }
    }
  });
}