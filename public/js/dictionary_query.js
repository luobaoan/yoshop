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
        utils.fade('.msg-error')
      }
    }
  })
}
$(function () {
  // 查询商品品牌
  findParentDicByCode('brand')
  // 查询商品分类
  findParentDicByCode('category')
  // 查询计量单位
  findParentDicByCode('unit')
})
