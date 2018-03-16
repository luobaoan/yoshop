/**
 * 商品字典
 */
$(function() {
  // 查询商品字典类表
  findGoodsLists();
  // 查询商品品牌
  findParentDicByCode('brand')
  // 查询商品分类
  findParentDicByCode('category')
  // 查询计量单位
  findParentDicByCode('unit')

  // 点击查询
  $('.btn-search').click(function() {
    findGoodsLists();
  })
})
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
          console.log(data[i].id + ' ' + data[i].name);
          str += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
        }
        if (code == 'brand') {
          // 品牌数据
          $("#goodsBrandId").empty().append(str)
        } else if (code == 'category') {
          // 商品分类
          $("#goodsCategoryId").empty().append(str)
        } else if (code == 'unit') {
          // 计量单位
          $("#goodsUnit").empty().append(str)
        }
      } else {
        $('.msg-error').text(info.msg)
        fade('.msg-error')
      }

    }
  })
}
// 查询商品字典列表
function findGoodsLists() {
  $.ajax({
    url: '/dictionary/findGoodsLists',
    data: $('#searchGoods').serialize(),
    type: 'POST',
    cache: false,
    dataType: 'json',
    success: function(info) {
      // console.log(info)
      if (info.status) {
        let data = info.data;
        let str = '';
        for (let i in data) {
          let list = data[i];
          str += '<tr>';
          str += '<td>' + (i + 1) + '</td>';
          str += '<td>' + list.code + '</td>';
          str += '<td class="goods-name">' + list.title + '</td>';
          str += '<td>' + list.abbr + '</td>';
          str += '<td>' + list.brand_name + '</td>';
          str += '<td>' + list.category_name + '</td>';
          str += '<td>' + list.unit_name + '</td>';
          str += '<td>' + list.purchase_price + '</td>';
          str += '<td class="operate">';
          str += '<p class="edit">编辑</p>';
          str += '<p class="color-red delete">删除</p>';
          str += '</td>';
          str += '</tr>';
        }
        // 数据呈现
        $('.data-lists tbody').empty().append(str)
      } else {
        $('.msg-error').text(info.msg)
        fade('.msg-error')
      }
    }
  })
}