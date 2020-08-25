// 转换成注册
$('.login a').click(function () {
  $('.register').show().siblings('.login').hide()
})

// 转换为登录
$('.register a').click(function () {
  $('.login').show().siblings('.register').hide()
})


// 登录功能
$('.login form').on('submit', function (e) {
  //阻止默认提交
  e.preventDefault();
  // 获取账号密码
  var data = $(this).serialize();
  // 发送ajax
  $.ajax({
    type: 'POST',
    url: 'http://ajax.frontend.itheima.net/api/login',
    data: data,
    success: function (res) {
      if (res.status === 0) {
        console.log(res.message);
        localStorage.setItem('token', res.token)
        location.href = '/whc2.html';
      }
    }
  });
})


// 注册功能
$('.register form').on('submit', function (e) {
  e.preventDefault();
  // 收集表单数据（一定要按照接口要求来）
  var data = $(this).serialize();
  // console.log(data);
  $.ajax({
    type: 'POST',
    url: 'http://ajax.frontend.itheima.net/api/reguser',
    data: data,
    success: function (res) {
      layer.msg(res.message);
      // 报错，layer is not defined。说明layui.all.js没有加载
      if (res.status === 0) {
        $('.login').show().next().hide();
        // reset是清空表单数据是dom方法
        $('.register form')[0].reset();
      }
    }
  });
})


// ---------------------注册表单验证------------------
var form = layui.form;
form.verify({
  changdu: [/^\S{6,12}$/, '长度6-12位,不能有空格'],
  same: function (val) {
    var pwd = $('.pwd').val();

    if (pwd !== val) return '两次密码不一致哟~';


  }

})

