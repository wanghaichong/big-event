// 加载 layui 的 form 模块
var form = layui.form;
// 自定义验证规则
form.verify({
  // 1) 长度6~12位，不能有空格
  len: [/^\S{6,12}$/, '密码长度必须是6~12且不能有空格'],

  // 2) 新密码不能和原密码相同
  diff: function (val) {
    var oldPwd = $('input[name=oldPwd]').val();
    if (val === oldPwd) {
      return '新密码不能和原密码相同';
    }
  },
  same: function (val) {
    // val 表示填写的重复密码
    // 获取新密码
    var newPwd = $('input[name=newPwd]').val();
    if (newPwd !== val) {
      return '两次密码不一样哟~';
    }
  }
});

//更改密码到服务器
$('.layui-form').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    data: data,
    success: function (res) {
      console.log(res);
      layer.msg(res.message);
      if (res.status === 0) {
        $('form')[0].reset();
      }
    }
  })
})