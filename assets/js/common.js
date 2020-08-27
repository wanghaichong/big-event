$.ajaxPrefilter(function (option) {


  // 统一配置url
  option.url = 'http://ajax.frontend.itheima.net' + option.url;
  if (option.url.includes('/my/')) {
    // 2. headers，请求头加token（是以 /my 开头的 接口，需要这个配置）
    option.headers = {
      Authorization: localStorage.getItem('token')
    }
    //增加header头
    option.headers = {
      Authorization: localStorage.getItem('token')
    }
    //判断token是真是假
    option.complete = function (xhr) {
      if (xhr.responseJSON && xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
        // 删除假token
        localStorage.removeItem('token');
        // 跳转到登录页面
        location.href = '/login.html';
      }

    }
  }

})