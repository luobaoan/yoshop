$(function() {
  // 点击下一步，保存参数信息
  $('.btn-save').click(function() {
    saveSpecification();
  })
})
// 保存商品字典的规格参数信息
function saveSpecification() {
  /**
   *  goods_id: 关联商品id
   *  suitable_age: 适用年龄
   *  shelf_life: 保质期
   *  unit: 单位/包装
   *  related_parameters: 相关参数
   *  specification: 规格
   *  net_weight: 净重量
   */
  // 净重量
  let netWeight = $('#netWeight').val();
  if (!netWeight) {
    $('.msg-error').text('请填写净重量')
    utils.fadeTip('.msg-error ')
    return;
  }

  $.ajax({
    url: '/dictionary/addGoodsSpecification',
    type: 'POST',
    data: $('.add-form').serialize(),
    catche: false,
    dataType: 'json',
    success: function(info) {
      console.log(info);
      if (info.status) {
        // 成功
        $('.msg-success').text(info.msg)
        utils.fadeTip('.msg-success')

        setInterval(() => {
          // 跳转页面

        })
      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }

    }
  })

}