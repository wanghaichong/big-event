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
//---------------------完成添加文章-----------------------
$('#add-form').on('submit', function (e) {
  e.preventDefault();
  var fd = new FormData(this);
  fd.forEach((val, key) => {
    console.log(key, val);
  })
  $.ajax({
    type: 'POST',
    data: fd,
    url: '/my/article/add',
    success: function (res) {
      alert(res.message)
      if (res.status === 0) {
      }
    },
    processData: false,
    contentType: false

  });
})

