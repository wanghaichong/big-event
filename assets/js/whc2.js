// ----------------------渲染头像和欢迎你------------
function getUserInfo () {
  $.ajax({
    // type: 'GET', // type不填，默认就是GET
    url: '/my/userinfo',
    success: function (res) {
      if (res.status === 0) {
        // 设置欢迎语
        var myname = res.data.nickname || res.data.username;
        $('.username').text(myname);
        //设置头像
        if (res.data.user_pic) {
          $('.layui-nav-img').attr('src', res.data.user_pic).show();
          $('.text-avatar').hide();
        } else {
          var t = myname.substr(0, 1).toUpperCase();
          // jQuery中的show方法，会设置元素 display:inline;
          $('.text-avatar').text(t).css('display', 'inline-block');
          $('.layui-nav-img').hide();
        }
      }
    }
  });
}
getUserInfo()


//----------------------退出功能--------------------------
$('.logout').on('click', function () {
  layer.confirm('是否要退出?', { icon: 3, title: '提示' }, function (index) {
    localStorage.removeItem('token');
    location.href = '/whc1.html'
    layer.close(index);
  });



































})