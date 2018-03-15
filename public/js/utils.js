var utils = {
  // 当前页面高度
  pageHeight: function() {
    return document.body.scrollHeight;
  },
  // 当前页面宽度
  pageWidth: function() {
    return document.body.scrollWidth;
  },
  //浏览器视口的高度
  windowHeight: function() {
    var de = document.documentElement;
    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
  },
  //浏览器视口的宽度
  windowWidth: function() {
    var de = document.documentElement;
    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
  },
  // 浏览器垂直滚动位置
  scrollY: function() {
    var de = document.documentElement;
    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
  },
  // 浏览器水平滚动位置
  scrollX: function() {
    var de = document.documentElement;
    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
  },
  // 动态加载 CSS
  dynamicLoadingCSS: function(path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    head.appendChild(link);
  },
  // 动态加载 JS
  dynamicLoadingJS: function(path) {
    if (!path || path.length === 0) {
      throw new Error('argument "path" is required !');
    }
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = path;
    body.appendChild(script);
  },
  // 显示遮罩层
  showOverlay: function() {
    // $("#overlay").remove();
    // $("body").prepend('<div id="overlay"></div>');
    if (utils.pageHeight() > utils.windowHeight()) {
      $("#overlay").height(utils.pageHeight());
    } else {
      $("#overlay").height(utils.windowHeight());
    }
    $("#overlay").width(utils.pageWidth());
    /*
     fadeTo第一个参数为速度，第二个为透明度;
     多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    */
    $("#overlay").fadeTo(200, 0.8);
  },
  // 隐藏覆盖层
  hideOverlay: function() {
    $("#overlay").fadeOut(200);
  },
  // 隐藏提示
  fadeTip: function(data) {
    if ($(data).css('display') !== 'none') {
      $(data).fadeOut(3000)
    } else {
      $(data).show()
      $(data).fadeOut(3000)
    }
  }
}
/* -- -- -- -- -- -- -- -- -- --判断终端类型开始-- -- -- -- -- -- -- -- */
//判断访问终端
var browser = {
  versions: function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
/* ================= 调用示例 =========
//判断是否IE内核
if (browser.versions.trident) { console.log("IE内核"); }
//判断是否webKit内核
if (browser.versions.webKit) { console.log("webKit内核"); }
//判断是否移动端
if (browser.versions.mobile || browser.versions.android || browser.versions.ios) {
    console.log("移动端");
}
// 检测浏览器语言
var currentLang = navigator.language; //判断除IE外其他浏览器使用语言
if (!currentLang) { //判断IE浏览器使用语言
    currentLang = navigator.browserLanguage;
}
console.log("浏览器语言：" + currentLang);
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    console.log("ios终端：" + navigator.userAgent);
} else if (/(Android)/i.test(navigator.userAgent)) {
    console.log("Android终端：" + navigator.userAgent);
} else {
    console.log("浏览器:" + navigator.userAgent);
};
*/
/* --------------------判断终端类型结束---------------- */