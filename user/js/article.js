var form = layui.form;
var laypage = layui.laypage;
//--------------------------------------- 渲染页面-----------------
var data = {
  pagenum: 1,
  pagesize: 2,
  // state: '草稿',
  // cate_id: 1
}
function renderArticle () {
  $.ajax({
    url: '/my/article/list',
    data: data,
    success: function (res) {
      if (res.status === 0) {
        var html = template('tpl-list', res);
        $('tbody').html(html);
        //调用创建分页的函数
        createPage(res.total)
      }
    }
  });


}
renderArticle()

//-------------------------发布jaxa请求，获取所有分类---------
$.ajax({

  url: '/my/article/cates',
  success: function (res) {
    if (res.status === 0) {
      var html = template('tpl-category', res);
      $('#category').html(html)
      //更新渲染 layui规定
      // form.render('select')
      form.render('select');
      createPage(res.total)
    }

  }

})


//---------------------layui的分页模块----------------------

function createPage (total) {
  laypage.render({
    elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号,是页面中的id
    , count: total, //数据总数，从服务端得到
    limit: data.pagesize,
    limits: [2, 3, 5, 8],
    curr: data.pagenum,//起始页是第一页
    layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],//自定义排版
    // 跳转页面触发回调函数
    jump: function (obj, first) {
      console.log(obj);
      if (!first) {
        data.pagenum = obj.curr;
        data.pagesize = obj.limit;
        renderArticle()

      }
    }
  });
}
createPage()





// ---------------------筛选-------------------
$('#search').on('submit', function (e) {
  e.preventDefault();
  var cate_id = $('#category').val();
  var state = $('#state').val();
  data.cate_id = cate_id;
  data.state = state;
  data.pagesize = 1;
  renderArticle()
})




//-------------------------------定义模板过滤器函数处理时间------------------------
template.defaults.imports.whc = function (t) {
  var date = new Date(t);
  var y = date.getFullYear();
  var m = addZero(date.getMonth() + 1);
  var d = addZero(date.getDate());
  var hh = addZero(date.getHours());
  var mm = addZero(date.getMinutes());
  var ss = addZero(date.getSeconds());
  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
}
//------------------------------定义补零函数
function addZero (n) {
  return n < 10 ? '0' + n : n;
}