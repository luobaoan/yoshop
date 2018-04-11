// 当前商品字典记录
let currGoods = {};
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
   *  goods_desc: 图文详情
   */
  let url = '/dictionary/addGoods'
  if (currGoods.goods_id) {
    url = '/dictionary/updateGoodsById'
  }
  $.ajax({
    url: url,
    type: 'POST',
    data: {
      'code': $('#goodsCode').val(),
      'title': $('#goodsTitle').val(),
      'abbr': $('#goodsAbbr').val(),
      'sale_price': $('#salePrice').val(),
      'brand_id': $('#goodsBrand').val(),
      'brand_name': $('#goodsBrand').attr('selectname'),
      'category_id': $('#goodsCategory').val(),
      'category_name': $('#goodsCategory').attr('selectname'),
      'unit_id': $('#goodsUnit').val(),
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
        //添加成功
        $('.msg-success').text(info.msg)
        utils.fadeTip('.msg-success')
        // $('.add-form')[0].reset();
        window.location.reload();
      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }
    }
  })
} //通过字典编码查询父字典分类对应的字段列表
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