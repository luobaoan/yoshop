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
      $(".nav-title").attr("flag", "close")
      $that.attr("flag", "open")
      $(".nav-title .icon-down-arrow").removeClass("flipy")
      $that.find('.icon-down-arrow').addClass("flipy")
    } else {
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
          utils.fade('.msg-success')
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
