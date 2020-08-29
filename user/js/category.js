var addIndex = null;
var editIndex = null;
//渲染页面
function renderCategory () {
  $.ajax({
    type: 'GET',
    url: 'http://ajax.frontend.itheima.net/my/article/cates',
    success: function (res) {
      console.log(res);
      if (res.status === 0) {
        var html = template('tpl-list', res)
        $('tbody').html(html);
      }
    },
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })
}
renderCategory();


//删除功能
$('tbody').on('click', 'button:contains("删除")', function () {
  id = $(this).data('id')
  console.log(id);
  // 弹出层
  layer.confirm('是否要删除?', { icon: 3, title: '提示' }, function (index) {
    //do something
    $.ajax({
      url: 'http://ajax.frontend.itheima.net/my/article/deletecate/' + id,
      headers: {
        Authorization: localStorage.getItem('token')
      },
      success: function (res) {
        // 提示是否删除成功，不成功也会提示
        layer.msg(res.message);
        if (res.status === 0) {
          renderCategory();
        }
      },
    })
    layer.close(index);
  });
})


// 添加弹出框功能
$('.layui-card').on('click', 'button:contains("添加类别")', function () {
  addIndex = layer.open({
    title: '添加文章分类',
    type: 1,
    area: ['500px', '250px'],
    content: $('#tpl-add').html()
  });
})


//增加分类
$('body').on('submit', '.add-tian', function (e) {
  // e.preventDefault();
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: 'http://ajax.frontend.itheima.net/my/article/addcates',
    data: data,
    success: function (res) {
      // 无论成功，还是失败，都给出提示
      layer.msg(res.message);
      layer.close(addIndex);
      if (res.status === 0) {
        renderCategory();
      }
    },
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
})


// 编辑
$('tbody').on('click', 'button:contains("编辑")', function () {
  addIndex = layer.open({
    title: '编辑文章分类',
    type: 1,
    area: ['500px', '250px'],
    content: $('#tpl-edit').html()
  });
  var zhi = $(this).data();
  console.log(zhi);
  $('.layui-form input[name="name"]').val(zhi.name)
  $('.layui-form input[name="alias"]').val(zhi.alias)
  $('.layui-form input[name="id"]').val(zhi.id)

})
// 提交修改的表单
$('body').on('submit', '.edit-form', function (e) {
  e.preventDefault();
  // 收集表单各项值
  var data = $(this).serializeArray();
  // id ===> Id
  data[2].name = 'Id';
  // console.log(data);
  // return;
  // ajax提交，完成修改
  $.ajax({
    type: 'POST',
    data: data,
    url: 'http://ajax.frontend.itheima.net/my/article/updatecate',
    success: function (res) {
      // 无论成功，还是失败，都给出提示
      layer.msg(res.message);
      if (res.status === 0) {
        renderCategory();
        layer.close(editIndex);
      }
    },
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });
})





