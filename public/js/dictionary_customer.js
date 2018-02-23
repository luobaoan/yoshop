// 当前客户记录
let customer = {}
$(function() {
  // 查询全部客户记录
  findAllCustomers();

  // 增加客户
  $('.rg-operate').click(() => {
    // 初始化数值
    customer = {}
    $('.customer-form .title-name').text('新增客户').attr('type', 'add')
    showOverlay()
    $('.customer-form').show();
  })
  // 关闭弹出层
  $('.customer-quit').click(() => {
    hideOverlay()
    $('.customer-form').hide();
    $('.customer-form')[0].reset();
  })

  // 点击【弹窗】保存
  $('.customer-save').click(() => {
    let type = $('.customer-form .title-name').attr('type')
    console.log(type)
    let url = '';
    if (type == "add") {
      // 新增保存
      url = '/dictionary/addCustomer'
    } else {
      // 修改保存
      url = '/dictionary/updateCustomerById'
    }
    $.ajax({
      url: url,
      data: $('.customer-form').serialize(),
      type: 'POST',
      cache: false,
      dataType: 'json',
      success: function(info) {
        if (info.status) {
          $('.msg-success').text(info.msg)
          fade('.msg-success')
          hideOverlay()
          $('.customer-form').hide();
          $('.customer-form')[0].reset();
          // 重新查询字典列表
          findAllCustomers()
        } else {
          $('.msg-error').text(info.msg)
          fade('.msg-error')
        }
      }
    })
  })
  // 【确认】删除所选字典记录
  $('.delete-confirm').click(function() {
    let deleteId = customer.id
    deleteIt(deleteId)
  })
})

function findAllCustomers() {
  $.ajax({
    url: '/dictionary/findAllCustomers',
    type: 'GET',
    cache: false,
    dataType: 'json',
    success: function(info) {
      if (info.status) {
        let data = info.data;
        let str = '';
        for (let i = 0; i < data.length; i++) {
          str += '<tr>';
          str += '<td>' + (i + 1) + '</td>';
          str += '<td class="code">' + data[i].code + '</td>';
          str += '<td class="name">' + data[i].name + '</td>';
          str += '<td class="contact">' + data[i].contact + '</td>';
          str += '<td class="phone">' + data[i].phone + '</td>';
          str += '<td class="address">' + data[i].address + '</td>';
          str += '<td class="sort">' + data[i].sort + '</td>';
          str += '<td class="remark">' + data[i].remark + '</td>';
          str += '<td class="operate"  id="' + data[i].id + '">';
          str += '<p class="customer-edit" >编辑</p>';
          str += '<p class="color-red customer-delete">删除</p>';
          str += '</td>';
          str += '</tr>';
        }
        // 铺数据
        $('.data-lists tbody').empty()
        $('.data-lists tbody').append(str)

        // 编辑字段
        $('.customer-edit').click(function() {
          let $parent = $(this).parent();
          let id = $parent.attr("id")
          let code = $parent.siblings('.code').text();
          let name = $parent.siblings('.name').text();
          let contact = $parent.siblings('.contact').text();
          let phone = $parent.siblings('.phone').text();
          let address = $parent.siblings('.address').text();
          let sort = $parent.siblings('.sort').text();
          let remark = $parent.siblings('.remark').text();
          customer.id = id;
          customer.code = code;
          customer.name = name;
          customer.contact = contact;
          customer.phone = phone;
          customer.address = address;
          customer.sort = sort;
          customer.remark = remark;
          // 铺数据
          $('#customerId').val(id)
          $('#customerCode').val(code)
          $('#customerName').val(name)
          $('#customerContact').val(contact)
          $('#customerPhone').val(phone)
          $('#customerAddress').val(address)
          $('#customerSort').val(sort)
          $('#customerRemark').val(remark)

          $('.customer-form .title-name').text('编辑客户资料').attr('type', 'edit')
          showOverlay()
          $('.customer-form').show();
        })
        $('.customer-delete').click(function() {
          let id = $(this).parent().attr("id")
          customer.id = id;
          showOverlay()
          $('.confirm').show();
        })

      } else {
        console.log("出错了")
      }
    }
  })
}

// 删除所选记录
function deleteIt(id) {
  $.ajax({
    url: '/dictionary/deleteCustomerById',
    data: {
      "id": id
    },
    type: 'POST',
    cache: false,
    dataType: 'json',
    success: function(info) {
      if (info.status) {
        $('.msg-success').text(info.msg)
        fade('.msg-success')
        hideOverlay()
        $('.confirm').hide();

        // 重新查询客户列表
        findAllCustomers()
      } else {
        $('.msg-error').text(info.msg)
        fade('.msg-error')
      }
    }
  })
}