/**
 * 商品字典
 */
let goods = {};
$(function() {
  // 查询商品品牌
  findParentDicByCode('brand')
  // 查询商品分类
  findParentDicByCode('category')
  // 查询计量单位
  findParentDicByCode('unit')
  // 查询商品字典类表
  findGoodsLists();
  // 点击查询
  $('.btn-search').click(function() {
    findGoodsLists();
  })
  // 关闭【删除确认】弹出层
  $('.delete-quit').click(() => {
    utils.hideOverlay()
    $('.confirm').hide();
  })
  // 确认删除
  $('.delete-confirm').click(function() {
    deleteGoodsById(goods.id)
    // 隐藏弹出层
    utils.hideOverlay()
    $('.confirm').hide();
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
          str += '<td>' + (Number(i) + 1) + '</td>';
          str += '<td>' + list.code + '</td>';
          str += '<td class="goods-name">' + list.title + '</td>';
          str += '<td>' + list.abbr + '</td>';
          str += '<td>' + list.brand_name + '</td>';
          str += '<td>' + list.category_name + '</td>';
          str += '<td>' + list.unit_name + '</td>';
          let salePrice = '0';
          if (list.sale_price) {
            salePrice = list.sale_price
          }
          str += '<td>' + salePrice + '</td>';
          str += '<td class="operate" goodsid="' + list.id + '">';
          str += '<span class="edit right10">编辑</span>';
          str += '<span class="color-red delete">删除</span>';
          str += '</td>';
          str += '</tr>';
        }
        // 数据呈现
        $('.data-lists tbody').empty().append(str)

        //删除操作
        $('.delete').click(function() {
          goods.id = $(this).parent().attr('goodsid');
          utils.showOverlay();
          $('.confirm').show();
        })

        // 编辑操作
        $('.edit').click(function() {
          goods.id = $(this).parent().attr('goodsid');
          window.location.href = '/dictionary/goods/base?goodsId=' + goods.id
        })

      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }
    }
  })
}

// 通过id删除商品字典记录
function deleteGoodsById(id) {
  $.ajax({
    url: '/dictionary/deleteGoodsById',
    data: {
      'id': id
    },
    type: 'POST',
    cache: false,
    dataType: 'json',
    success: function(info) {
      console.log(info);
      if (info.status) {
        //删除成功
        $('.msg-success').text(info.msg)
        utils.fadeTip('.msg-success')
        // 重新加载商品列表
        findGoodsLists()
      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }
    }
  })
}
