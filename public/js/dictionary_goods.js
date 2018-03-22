/**
 * 商品字典
 */
$(function() {
  // 查询商品字典类表
  findGoodsLists();


  // 点击查询
  $('.btn-search').click(function() {
    findGoodsLists();
  })
})

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
        utils.fade('.msg-error')
      }
    }
  })
}
