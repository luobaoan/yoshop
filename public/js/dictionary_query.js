// 当前商品字典记录
let currGoods = {};
$(function() {
  /** 创建商品步骤 **/
  // Step1 基本信息
  $('.tab-nav .base-info').click(() => {
    location.href = '/dictionary/goods/base'
  })
  // Step2 规格参数
  $('.tab-nav .goods-spec').click(() => {
    location.href = '/dictionary/goods/specification'
  })
  // Step3 轮播图
  $('.tab-nav .goods-slides').click(() => {
    location.href = '/dictionary/goods/slideshow'
  })

})

// 通过id查询商品字典记录
function findGoodsById(id) {
  // console.log(currGoods.goods_id);
  $.ajax({
    url: '/dictionary/findGoodsById?id=' + id,
    type: 'GET',
    catche: false,
    dataType: 'json',
    async: false,
    success: function(info) {
      console.log(info);
      if (info.status) {
        // 铺数据
        let data = info.data;
        $('#goodsCode').val(data.code)
        $('#goodsTitle').val(data.title)
        $('#goodsAbbr').val(data.abbr)
        $('#salePrice').val(data.sale_price)
        currGoods.brand_id = data.brand_id;
        currGoods.brand_name = data.brand_name;
        currGoods.category_id = data.category_id;
        currGoods.category_name = data.category_name;
        currGoods.unit_id = data.unit_id;
        currGoods.unit_name = data.unit_name;
        $('#sortNum').val(data.sort)
        if (data.goods_desc) {
          ue.addListener("ready", function() {
            // editor准备好之后才可以使用
            ue.setContent(data.goods_desc);
          });
        }
      }
    }
  })
}

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
          if (currGoods.brand_id) {
            $('#goodsBrand').val(currGoods.brand_id).attr('selectname', currGoods.brand_name)
          }
          // select 选择事件
          $('#goodsBrand').change(function() {
            let txt = $("#goodsBrand option:selected").text();
            $(this).attr('selectname', txt)
          })
        } else if (code == 'category') {
          // 商品分类
          $("#goodsCategory").empty().append(str)
          if (currGoods.category_id) {
            $('#goodsCategory').val(currGoods.category_id).attr('selectname', currGoods.category_name)
          }
          // select 选择事件
          $('#goodsCategory').change(function() {
            let txt = $("#goodsCategory option:selected").text();
            $(this).attr('selectname', txt)
          })
        } else if (code == 'unit') {
          // 计量单位
          $("#goodsUnit").empty().append(str)
          if (currGoods.unit_id) {
            $('#goodsUnit').val(currGoods.unit_id).attr('selectname', currGoods.unit_name)
          }
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