//通过字典编码查询父字典分类对应的字段列表
function findParentDicByCode(code) {
  $.ajax({
    url: '/dictionary/findParentDicByCode?code=' + code,
    type: 'GET',
    cache: false,
    dataType: 'json',
    success: function(info) {
      // console.log(info)
      if (info.status) {
        let data = info.data;
        let str = '<option value="">请选择</option>';
        for (let i in data) {
          // console.log(data[i].id + ' ' + data[i].name);
          str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
        }
        if (code == 'brand') {
          // 品牌数据
          $("#goodsBrand").empty().append(str)
          // select 选择事件
          $('#goodsBrand').change(function() {
            let txt = $("#goodsBrand option:selected").text();
            $(this).attr('selectname', txt)
          })

        } else if (code == 'category') {
          // 商品分类
          $("#goodsCategory").empty().append(str)
          // select 选择事件
          $('#goodsCategory').change(function() {
            let txt = $("#goodsCategory option:selected").text();
            $(this).attr('selectname', txt)
          })
        } else if (code == 'unit') {
          // 计量单位
          $("#goodsUnit").empty().append(str)
          // select 选择事件
          $('#goodsUnit').change(function() {
            let txt = $("#goodsUnit option:selected").text();
            $(this).attr('selectname', txt)
          })
        }

      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }

    }
  })

}
// 查询商品字典最后一个记录Id
function findLastGoodsId() {
  let codeNum;
  $.ajax({
    url: '/dictionary/findLastGoodsId',
    type: 'GET',
    catche: false,
    dataType: 'json',
    async: false,
    success: function(info) {
      codeNum = info.data;
    }
  })
  return codeNum;
}
// 增加商品字典记录
function addGoods() {
  // *  code: 商品编号
  // *  title: 商品名称
  // *  abbr: 商品简称
  // *  brand_id: 品牌id
  // *  brand_name: 品牌名称
  // *  category_id: 分类id
  // *  category_name: 分类名称
  // *  unit_id: 计量单位id
  // *  unit_name: 计量单位名
  // *  sale_price:  销售单价
  // *  sort: 排序
  $.ajax({
    url: '/dictionary/addGoods',
    type: 'POST',
    data: {
      'code': $('#goodsCode').val(),
      'title': $('#goodsTitle').val(),
      'abbr': $('#goodsAddr').val(),
      'sale_price': $('#salePrice').val(),
      'brand_id': $('#goodsBrand').val(),
      'brand_name': $('#goodsBrand').attr('selectname'),
      'category_id': $('#goodsCategory').val(),
      'category_name': $('#goodsCategory').attr('selectname'),
      'unit_id': $('#goodsUnit').val(),
      'unit_name': $('#goodsUnit').attr('selectname'),
      'sort': $('#sortNum').val()
    },
    catche: false,
    dataType: 'json',
    success: function(info) {
      console.log(info);
      if (info.status) {
        //添加成功
        $('.msg-success').text(info.msg)
        utils.fadeTip('.msg-success')
        // $('.add-form')[0].reset();
      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }
    }
  })
}
$(function() {
  // 查询商品品牌
  findParentDicByCode('brand')
  // 查询商品分类
  findParentDicByCode('category')
  // 查询计量单位
  findParentDicByCode('unit')
})