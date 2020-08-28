var whc = layui.whc;
function renderForm () {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      //第一种方式
      // $('input[name=username]').val(res.data.username);
      // $('input[name=nickname]').val(res.data.nickname);
      // $('input[name=email]').val(res.data.email);
      // $('input[name=id]').val(res.data.id);
      form.val("whc", res.data)
    }
  })
};
renderForm();
//修改
$('form').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: data,
    success: function (res) {
      layer.msg(res.message);
      if (res.status === 0) {
        window.parent.getUserInfo();
      }
    }
  })
})

// 表单验证
var form = layui.form;
form.verify(
  {
    chang: [/^\S{3,8}$/, "长度不够，请输入3~8位的昵称"]

  }
)
//恢复初始值
$('button[type=reset]').on('click', function (e) {
  e.preventDefault();
  renderForm();
})