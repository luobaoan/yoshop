/**
 * 仓储管理
 *
 */
const StorageService = require('../service/storage')

module.exports = {
  // 跳转到 仓储管理——仓库管理
  warehouse: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('storage/storage_warehouse', {
      session: ctx.session,
      title: "仓库管理",
      pagename: 'storage-warehouse',
      pageclass: 'storage storage-warehouse'
    })
  },
  // 跳转到 仓储管理——采购入库
  purchase: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('storage/storage_purchase', {
      session: ctx.session,
      title: "采购入库",
      pagename: 'storage-purchase',
      pageclass: 'storage storage-purchase'
    })
  },
  // 跳转到 仓储管理——销售出库
  sale: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('storage/storage_sale', {
      session: ctx.session,
      title: "销售出库",
      pagename: 'storage-sale',
      pageclass: 'storage storage-sale'
    })
  },
  // 跳转到 仓储管理——销售退货
  return: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('storage/storage_return', {
      session: ctx.session,
      title: "销售退货",
      pagename: 'storage-return',
      pageclass: 'storage storage-return'
    })
  },
  // 跳转到 仓储管理——库存盘点
  check: async (ctx, next) => {
    await ctx.render('storage/storage_check', {
      session: ctx.session,
      title: "库存盘点",
      pagename: 'storage-check',
      pageclass: 'storage storage-check'
    })
  },
  // 跳转到 仓储管理——库存清单
  lists: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('storage/storage_lists', {
      session: ctx.session,
      title: "库存清单",
      pagename: 'storage-lists',
      pageclass: 'storage storage-lists'
    })
  }
}