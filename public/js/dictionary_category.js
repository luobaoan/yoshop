// 当前字典记录
let dictionary = {};
// 当前字段记录
let field = {};
// 当前要删除记录类别 delete-category:字典记录；delete-field：字段记录
let deleteType;
$(function() {
  // 查询全部字典记录
  findAllParentLists();

  // 关闭【删除确认】弹出层
  $('.delete-quit').click(() => {
    utils.hideOverlay()
    $('.confirm').hide();
  })
  // 增加分类
  $('.add-category').click(() => {
    // 初始化数值
    dictionary = {}
    $('.category-form .title-name').text('新增分类').attr('type', 'category-add')
    utils.showOverlay()
    $('.category-form').show();
  })
  // 修改分类
  $('.edit-category').click(() => {
    let id = dictionary.id
    if (!id) {
      $('.msg-error').text("请先选择一条记录")
      utils.fadeTip('.msg-error')
      return;
    }
    $('.category-form .title-name').text('修改分类').attr('type', 'category-edit')
    // 铺数据
    $("#categoryId").val(dictionary.id)
    $("#categoryName").val(dictionary.name)
    $("#categoryCode").val(dictionary.code)
    $("#categorySort").val(dictionary.sort)
    utils.showOverlay()
    $('.category-form').show();
  })

  // 关闭【增加分类】弹出层
  $('.category-quit').click(() => {
    utils.hideOverlay()
    $('.category-form').hide();
    $('.category-form')[0].reset();
  })
  // 增加字段
  $('.add-field').click(() => {
    $('.field-form .title-name').text('新增字段').attr('type', 'field-add')
    utils.showOverlay()
    $('.field-form').show();
  })
  // 关闭【增加字段】弹出层
  $('.field-quit').click(() => {
    utils.hideOverlay()
    $('.field-form').hide();
    $('.field-form')[0].reset();
  })

  // 点击【字典分类】保存
  $('.category-save').click(() => {
    let type = $('.category-form .title-name').attr('type')
    let url = '';
    if (type == "category-add") {
      // 新增保存
      url = '/dictionary/addDictionary'
    } else {
      // 修改保存
      url = '/dictionary/updateDictionaryById'
    }
    $.ajax({
      url: url,
      data: $('.category-form').serialize(),
      type: 'POST',
      cache: false,
      dataType: 'json',
      success: function(info) {
        // console.log(info)
        if (info.status) {
          $('.msg-success').text(info.msg)
          utils.fadeTip('.msg-success')
          utils.hideOverlay()
          $('.category-form').hide();
          $('.category-form')[0].reset();
          // 重新查询字典列表
          findAllParentLists()
        } else {
          $('.msg-error').text(info.msg)
          utils.fadeTip('.msg-error')
        }
      }
    })
  })
  // 点击【字段】保存
  $('.field-save').click(() => {
    let type = $('.field-form .title-name').attr('type')
    let url = '';
    if (type == "field-add") {
      // 新增保存
      url = '/dictionary/addField'
    } else {
      // 修改保存
      url = '/dictionary/updateFieldById'
    }
    $.ajax({
      url: url,
      data: $('.field-form').serialize(),
      type: 'POST',
      cache: false,
      dataType: 'json',
      success: function(info) {
        console.log(info)
        if (info.status) {
          $('.msg-success').text(info.msg)
          utils.fadeTip('.msg-success')
          utils.hideOverlay()
          $('.field-form').hide();
          $('.field-form')[0].reset();
          // 重新查询字段列表
          findFieldsById(dictionary.id)
        } else {
          $('.msg-error').text(info.msg)
          utils.fadeTip('.msg-error')
        }
      }
    })
  })

  // 点击【删除字典记录】
  $('.delete-category').click(function() {
    let id = dictionary.id
    if (!id) {
      $('.msg-error').text("请先选择一条记录")
      utils.fadeTip('.msg-error')
      return
    } else {
      // 给删除弹出层添加类别  delete-category
      deleteType = 'delete-category'
      utils.showOverlay()
      $('.confirm').show();
    }
  })
  // 【确认】删除所选字典记录
  $('.delete-confirm').click(function() {
    let deleteId = '';
    // 判断删除类别
    if (deleteType == 'delete-category') {
      deleteId = dictionary.id
    } else(
      deleteId = field.id
    )
    deleteIt(deleteId)
  })

})
// 查询全部字典记录
function findAllParentLists() {
  $.ajax({
    url: '/dictionary/findAllParentLists',
    type: 'GET',
    cache: false,
    dataType: 'json',
    success: function(info) {
      // console.log(info)
      if (info.status) {
        let data = info.data;
        // console.log(data)
        let str = '';
        for (let i = 0; i < data.length; i++) {
          str += '<tr class="">';
          str += '<td><input categoryid="' + data[i].id + '" categoryname="' + data[i].name + '" code="' + data[i].code + '" sort="' + data[i].sort + '" class="category-list" type="radio" name="category" ></td>';
          str += '<td>' + data[i].name + '</td>';
          str += '<td>' + data[i].code + '</td>';
          str += '</tr>';
        }
        // 铺数据
        $('.lf-main .data-lists tbody').empty()
        $('.lf-main .data-lists tbody').append(str)

        // 选中字典列表记录操作
        $(".category-list").click(function() {
          $(this).parent().parent().addClass('active')
          $(this).parent().parent().siblings().removeClass('active')
          let id = $(this).attr("categoryid")
          let name = $(this).attr("categoryname")
          let code = $(this).attr("code")
          let sort = $(this).attr("sort")
          dictionary.id = id;
          dictionary.name = name;
          dictionary.code = code;
          dictionary.sort = sort;

          // 查询该字典对应的字段列表
          findFieldsById(id);

          // 设置所选字典 parent_id,code，便于保存字段表单
          $("#parentId").val(id)
          $("#parentCode").val(code)

        })

      } else {
        console.log("出错了")
      }
    }
  })
}
// 通过字典 id 查询字段列表
function findFieldsById(id) {
  $.ajax({
    url: '/dictionary/findFieldsById',
    data: {
      "id": id
    },
    type: 'POST',
    cache: false,
    dataType: 'json',
    success: function(info) {
      console.log(info)
      if (info.status) {
        // $('.msg-success').text(info.msg)
        // utils.fadeTip('.msg-success')
        // 铺数据
        let data = info.data;
        // console.log(data)
        let str = '';
        for (let i = 0; i < data.length; i++) {
          str += '<tr>';
          str += '<td class="code">' + (i + 1) + '</td>';
          str += '<td>' + data[i].name + '</td>';
          str += '<td class="sort">' + data[i].sort + '</td>';
          str += '<td class="operate" fieldid="' + data[i].id + '" fieldname="' + data[i].name + '" fieldsort="' + data[i].sort + '">';
          str += '<span class="field-edit right20">编辑</span>';
          str += '<span class="field-delete color-red">删除</span>';
          str += '</td>';
          str += '</tr>';
        }
        // 铺数据
        $('.rg-lists .data-lists tbody').empty()
        $('.rg-lists .data-lists tbody').append(str)

        // 编辑字段
        $('.field-edit').click(function() {
          let id = $(this).parent().attr("fieldid")
          let name = $(this).parent().attr("fieldname")
          let sort = $(this).parent().attr("fieldsort")
          field.id = id;
          field.name = name;
          field.sort = sort;
          // 铺数据
          $('#fieldId').val(id)
          $('#fieldName').val(name)
          $('#fieldSort').val(sort)

          $('.field-form .title-name').text('编辑字段').attr('type', 'field-edit')
          utils.showOverlay()
          $('.field-form').show();
        })
        $('.field-delete').click(function() {
          let id = $(this).parent().attr("fieldid")
          console.log(id)
          field.id = id;
          // 给删除弹出层添加类别  delete-field
          deleteType = 'delete-field'
          utils.showOverlay()
          $('.confirm').show();
        })
      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }
    }
  })
}
// 删除所选记录
function deleteIt(id) {
  $.ajax({
    url: '/dictionary/deleteDictionaryById',
    data: {
      "id": id
    },
    type: 'POST',
    cache: false,
    dataType: 'json',
    success: function(info) {
      if (info.status) {
        $('.msg-success').text(info.msg)
        utils.fadeTip('.msg-success')
        utils.hideOverlay()
        $('.confirm').hide();
        // 判断删除类别
        if (deleteType == 'delete-category') {
          // 重新查询字典列表
          findAllParentLists()
        } else(
          // 重新查询字段列表
          findFieldsById(dictionary.id)
        )

      } else {
        $('.msg-error').text(info.msg)
        utils.fadeTip('.msg-error')
      }
    }
  })
}
