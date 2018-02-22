/**
 * 订单管理
 * 首页、新订单、配送中、已完成
 */

const OrderService = require('../service/orders')

module.exports = {
  // 新订单
  orderNew: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('orders/orders_new', {
      session: ctx.session,
      title: "新订单",
      pagename: 'order-new',
      pageclass: 'order-new orders'
    })
  },
  orderSending: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('orders/orders_sending', {
      session: ctx.session,
      title: "配送中",
      pagename: 'order-sending',
      pageclass: 'order-sending orders'
    })
  },
  orderEnd: async (ctx, next) => {
    await ctx.render('orders/orders_end', {
      session: ctx.session,
      title: "已完成",
      pagename: 'order-end',
      pageclass: 'order-end orders'
    })
  }
}