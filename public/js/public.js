// 当前页面高度
function pageHeight() {
  return document.body.scrollHeight;
}
// 当前页面宽度
function pageWidth() {
  return document.body.scrollWidth;
}
//浏览器视口的高度
function windowHeight() {
  var de = document.documentElement;
  return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}
//浏览器视口的宽度
function windowWidth() {
  var de = document.documentElement;
  return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
}
// 浏览器垂直滚动位置
function scrollY() {
  var de = document.documentElement;
  return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}
// 浏览器水平滚动位置
function scrollX() {
  var de = document.documentElement;
  return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}
// 显示遮罩层
function showOverlay() {
  $("#overlay").remove();
  $("body").prepend('<div id="overlay"></div>');
  if (pageHeight() > windowHeight()) {
    $("#overlay").height(pageHeight());
  } else {
    $("#overlay").height(windowHeight());
  }
  $("#overlay").width(pageWidth());
  /*
   fadeTo第一个参数为速度，第二个为透明度;
   多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
  */
  $("#overlay").fadeTo(200, 0.6);
};
// 隐藏覆盖层
function hideOverlay() {
  $("#overlay").fadeOut(200);
};
// 隐藏提示
function fade(data) {
  if ($(data).css('display') !== 'none') {
    $(data).fadeOut(3000)
  } else {
    $(data).show()
    $(data).fadeOut(3000)
  }
}
$(function() {
  // 左侧菜单选中状态
  let activeNav = $(".container").attr("page");
  $(".left-nav li").removeClass("nav-active")
  $(".left-nav ." + activeNav).addClass("nav-active");
  let $navParent = $(".left-nav ." + activeNav).parent();
  $navParent.slideDown();
  $navParent.prev().attr("flag", "open").find('.icon-down-arrow').toggleClass("flipy")

  // 左侧菜单合并展开
  $(".nav-title").click(function() {
    let $that = $(this);
    let flag = $that.attr("flag");
    if (flag == "close") {
      console.log('打开');
      $(".nav-title").attr("flag", "close")
      $that.attr("flag", "open")
      $(".nav-title .icon-down-arrow").removeClass("flipy")
      $that.find('.icon-down-arrow').addClass("flipy")
    } else {
      console.log('合起来');
      $that.find('.icon-down-arrow').removeClass("flipy")
      $that.attr("flag", "close")
    }
    $(".nav-title").next().slideUp()
    $that.next().toggle();
  })

  // 退出登录
  $('.signout').click(() => {
    $.ajax({
      url: '/signout',
      type: "GET",
      cache: false,
      dataType: 'json',
      success: function(msg) {
        console.log(msg)
        if (msg) {
          $('.msg-success').text('退出成功')
          fade('.msg-success')
          setInterval(() => {
            window.location.href = '/signin'
          }, 1000)
        }
      },
      error: function(e) {
        alert('异常')
      }
    })
  })
})