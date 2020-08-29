//-------------------------------- 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);


//---------------------------------点击上传可以选择文件--------------
$('button:contains("上传")').click(function () {
  $('#file').click();
})

// 文件域发生改变
$('#file').change(function () {
  // 3.1) 先找到文件对象
  // console.dir(this)
  var fileObj = this.files[0];
  // 3.2) 为选择的图片生成一个临时的url
  var url = URL.createObjectURL(fileObj);
  // console.log(url);
  // 3.3) 更换图片的src属性即可（销毁剪裁区 --> 更换src属性 --> 重新创建剪裁框）
  $image.cropper('destroy').attr('src', url).cropper(options);
});

// --------------------------------点击确认按钮，剪裁图片，把图片转成base64格式，ajax提交字符串，完成更新-----
$('button:contains("确定")').click(function () {
  // 创建一个 Canvas 画布
  var canvas = $image.cropper('getCroppedCanvas', {
    width: 100,
    height: 100
  })
  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  var base64 = canvas.toDataURL('image/png');
  $.ajax({
    type: 'POST',
    url: '/my/update/avatar',
    data: { avatar: base64 },
    success: function (res) {
      layer.msg(res.message);
      if (res.status === 0) {
        window.parent.getUserInfo();
      }
    }

  });
})
