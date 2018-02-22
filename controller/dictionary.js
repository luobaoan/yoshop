/**
 * 字典管理
 * 分类字典、商品字典、客户列表
 */
const DictionaryService = require('../service/dictionary')

module.exports = {
  // 跳转到分类字典
  category: async (ctx, next) => {
    await ctx.render('dictionary/dictionary_category', {
      session: ctx.session,
      title: "分类字典",
      pagename: 'dictionary-category',
      pageclass: 'dictionary-category'
    })
  },
  // 跳转到商品字典
  goods: async (ctx, next) => {
    await ctx.render('dictionary/dictionary_goods', {
      session: ctx.session,
      title: "商品字典",
      pagename: 'dictionary-goods',
      pageclass: 'dictionary-goods'
    })
  },
  // 跳转到创建商品——基本信息页
  goodsBase: async (ctx, next) => {
    await ctx.render('dictionary/new_goods/goods_base', {
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到创建商品——轮播图
  goodsSlideshow: async (ctx, next) => {
    await ctx.render('dictionary/new_goods/goods_slideshow', {
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到创建商品——图文介绍
  goodsInfo: async (ctx, next) => {
    await ctx.render('dictionary/new_goods/goods_info', {
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到创建商品——规格参数
  goodsSpecification: async (ctx, next) => {
    await ctx.render('dictionary/new_goods/goods_specification', {
      session: ctx.session,
      title: "商品字典——创建商品",
      pagename: 'dictionary-goods',
      pageclass: 'new-goods'
    })
  },
  // 跳转到客户列表
  customer: async (ctx, next) => {
    console.log(ctx.session)
    await ctx.render('dictionary/dictionary_customer', {
      session: ctx.session,
      title: "客户列表",
      pagename: 'dictionary-customer',
      pageclass: 'dictionary-customer'
    })
  },
  /**
   * 增加字典列表
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   */
  addDictionary: async (ctx, next) => {
    let params = ctx.request.body;
    let dictionary = [
      params.name,
      params.sort,
      params.code
    ]

    let result = await DictionaryService.addDictionary(dictionary)
    console.log(result)
    ctx.body = result
  },
  /**
   * 通过 id删除字典记录
   * id：字典 id
   */
  deleteDictionaryById: async (ctx, next) => {
    let params = ctx.request.body;
    let id = params.id;
    let result = await DictionaryService.deleteDictionaryById(id)
    console.log(result)
    ctx.body = result
  },
  /**
   * 通过 ids 批量删除字典记录
   * ids：批量字典 id
   */
  deleteDictionaryByIds: async (ctx, next) => {
    let params = ctx.request.body;
    let ids = params.ids;
    let result = await DictionaryService.deleteDictionaryByIds(ids)
    console.log(result)
    ctx.body = result
  },
  /**
   * 通过 id 修改对应字典记录
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   * id：字典 id
   */
  updateDictionaryById: async (ctx, next) => {
    let params = ctx.request.body;
    let dictionary = [
      params.name,
      params.sort,
      params.code,
      params.id
    ]
    let result = await DictionaryService.updateDictionaryById(dictionary)
    ctx.body = result
  },
  /**
   * 查询全部字典列表
   */
  findAllParentLists: async (ctx, next) => {
    let result = await DictionaryService.findAllParentLists()
    ctx.body = result
  },
  /**
   * 根据字典 id 查询字段列表
   */
  findFieldsById: async (ctx, next) => {
    let params = ctx.request.body;
    let id = params.id;
    let result = await DictionaryService.findFieldsById(id)
    ctx.body = result
  },
  /**
   * 增加字段列表
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   */
  addField: async (ctx, next) => {
    let params = ctx.request.body;
    let dictionary = [
      params.parent_id,
      params.name,
      params.sort,
      params.code
    ]

    let result = await DictionaryService.addField(dictionary)
    console.log(result)
    ctx.body = result
  },
  /**
   * 通过 id 修改对应字段记录
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   * id：字典 id
   */
  updateFieldById: async (ctx, next) => {
    let params = ctx.request.body;
    let field = [
      params.name,
      params.sort,
      params.id
    ]
    let result = await DictionaryService.updateFieldById(field)
    ctx.body = result
  }
}