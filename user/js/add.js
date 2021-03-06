var form = layui.form
// ------------------------获取分类，渲染到下拉框位置-------------
$.ajax({
  url: '/my/article/cates',
  success: function (res) {
    var html = template('tpl-category', res);
    $('#category').html(html);
    form.render('select')
  }


})



//初始化文本编辑器
initEditor()
// ------------------------处理封面图片------------------
// 1. 初始化图片裁剪器
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
//-------------------点击选择封面能够选择图片--------------- 
$('button:contains("选择封面")').click(function () {

  $('#file').click()
})
//图片切换的时候，更换剪裁区的图片
$('#file').change(function () {
  // 找到对象
  var fileObj = this.files[0];
  // 创建url
  var url = URL.createObjectURL(fileObj);
  //更换图片
  $image.cropper('destroy').attr('src', url).cropper(options);
});


//---------------------完成添加文章-----------------------
$('#add-form').on('submit', function (e) {
  e.preventDefault();
  var fd = new FormData(this);
  //1.获取富文本编辑器里里面的内容
  fd.set('content', tinyMCE.activeEditor.getContent());
  // 2.剪裁图片，转成blob形参，追加到fd的内容
  var canvas = $image.cropper('getCroppedCanvas', {
    width: 400,
    height: 200
  });
  // 把canvas图片转换成二进制形式
  canvas.toBlob(function (blob) {

    fd.append('cover_img', blob);

    fd.forEach((val, key) => {
      console.log(key, val);
    })
    $.ajax({
      type: 'POST',
      data: fd,
      url: '/my/article/add',
      success: function (res) {
        layer.msg(res.message)

        if (res.status === 0) {
          location.href = '/user/article.html'
        }
      },
      processData: false,
      contentType: false

    });
  })



})



