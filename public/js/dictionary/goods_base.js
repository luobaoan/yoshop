//实例化编辑器 建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor', {
  toolbars: [
    [
      'undo', //撤销
      'redo', //重做
      'bold', //加粗
      'italic', //斜体
      'underline', //下划线
      'indent', //首行缩进
      'forecolor', //字体颜色
      'insertorderedlist', //有序列表
      'insertunorderedlist', //无序列表
      'fontfamily', //字体
      'fontsize', //字号
      'paragraph', //段落格式
      'subscript', //下标
      'superscript', //上标
      'horizontal', //分隔线
      'removeformat', //清除格式

      'link', //超链接
      'unlink', //取消链接
      'formatmatch', //格式刷
      'cleardoc', //清空文档
      'preview', //预览
      'fullscreen', //全屏
    ]
  ],
  autoHeightEnabled: true,
  autoFloatEnabled: true
});
$(function() {
  // 判断创建商品还是编辑商品
  let goodsId = $('#goodsId').val();
  console.log(goodsId);
  if (!goodsId) {
    /** 没有商品 id，表示创建商品 **/
    $('.page-title').text('商品字典——创建商品')
    // Step1 清空当前商品字典记录
    currGoods = {}
    // Step2 查询最新商品字典id
    let num = findLastGoodsId();
    let newCodeNum = 'SP000' + (
      ++num
    );
    $('#goodsCode').val(newCodeNum)
  } else {
    /** 编辑商品 **/
    $('.page-title').text('商品字典——编辑商品')
    currGoods.goods_id = goodsId;
    // Step1 查看该商品信息
    findGoodsById(goodsId)
  }
  // 查询商品品牌
  findParentDicByCode('brand')
  // 查询商品分类
  findParentDicByCode('category')
  // 查询计量单位
  findParentDicByCode('unit')
  // 保存修改的信息
  $('.save-info').click(function() {
    saveGoodsInfo();
  })

})
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
// 保存商品字典记录
function saveGoodsInfo() {
  /**
   *  code: 商品编号
   *  title: 商品名称
   *  abbr: 商品简称
   *  brand_id: 品牌id
   *  brand_name: 品牌名称
   *  category_id: 分类id
   *  category_name: 分类名称
   *  unit_id: 计量单位id
   *  unit_name: 计量单位名
   *  sale_price:  销售单价
   *  sort: 排序
   */
  let url = '/dictionary/addGoods'
  if (currGoods.goods_id) {
    url = '/dictionary/updateGoodsById'
  }
  // 商品品牌
  let brandId = $('#goodsBrand').val();
  if (!brandId) {
    $('.msg-error').text('请选择商品品牌')
    utils.fadeTip('.msg-error')
    return;
  }
  // 商品分类
  let categoryId = $('#goodsCategory').val();
  if (!categoryId) {
    $('.msg-error').text('请选择商品分类')
    utils.fadeTip('.msg-error')
    return;
  }
  // 商品单位
  let unitId = $('#goodsUnit').val();
  if (!unitId) {
    $('.msg-error').text('请选择商品单位')
    utils.fadeTip('.msg-error')
    return;
  }
  $.ajax({
    url: url,
    type: 'POST',
    data: {
      'code': $('#goodsCode').val(),
      'title': $('#goodsTitle').val(),
      'abbr': $('#goodsAbbr').val(),
      'sale_price': $('#salePrice').val(),
      'brand_id': brandId,
      'brand_name': $('#goodsBrand').attr('selectname'),
      'category_id': categoryId,
      'category_name': $('#goodsCategory').attr('selectname'),
      'unit_id': unitId,
      'unit_name': $('#goodsUnit').attr('selectname'),
      'sort': $('#sortNum').val(),
      'goods_desc': ue.getPlainTxt(),
      'goods_id': currGoods.goods_id
    },
    catche: false,
    dataType: 'json',
    success: function(info) {
      console.log(info);
      if (info.status) {
        //成功
        $('.msg-success').text(info.msg)
        utils.fadeTip('.msg-success')
        let currGoodsId = info.data.goodsId;
        setInterval(() => {
          location.href = '/dictionary/goods/specification?goodsId=' + currGoodsId
        }, 1000)
      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }
    }
  })
}