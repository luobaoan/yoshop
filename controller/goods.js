/**
 * 发布商品
 */

const AccountService = require('../service/goods')

module.exports = {
  // 跳转到商品上下架
  goodsShelf: async (ctx, next) => {
    await ctx.render('goods/goods_shelf', {
      session: ctx.session,
      title: "商品上下架",
      pagename: 'goods-shelf',
      pageclass: 'goods-shelf'
    })
  }
}