const router = require('koa-router')();

// 引入 controller
const AccountController = require('./controller/account')
const OrdersController = require('./controller/orders')
const SettingController = require('./controller/setting')
const GoodsController = require('./controller/goods')

const DictionaryController = require('./controller/dictionary')
const MemberController = require('./controller/member')
const StorageController = require('./controller/storage')

module.exports = (app) => {

  // 中间件测试返回JSON数据
  router.get('/api', AccountController.responseJson)
    .get('/home', AccountController.home)

    /*-------------账户管理开始-----------*/

    // 首页重定向到登录页面
    .get('/', AccountController.signin)
    // 跳转到登录页面
    .get('/signin', AccountController.signin)
    // 跳转到注册页
    .get('/signup', AccountController.signup)
    // 退出账号
    .get('/signout', AccountController.signout)
    // 登录
    .post('/login', AccountController.login)
    // 注册用户
    .post('/register', AccountController.register)

    /*-------------账户管理结束-----------*/
    /*-------------订单管理开始-----------*/

    // 跳转到订单——新订单
    .get('/orders/new', OrdersController.orderNew)
    // 跳转到订单——配送中
    .get('/orders/sending', OrdersController.orderSending)
    // 跳转到订单——已完成
    .get('/orders/end', OrdersController.orderEnd)

    /*-------------订单管理结束-----------*/

    /*-------------商品管理开始-----------*/
    // 跳转到商品上下架
    .get('/goods/shelf', GoodsController.goodsShelf)

    /*-------------商品管理结束-----------*/

    /*-------------会员管理开始-----------*/
    // 跳转到会员列表
    .get('/member/lists', MemberController.memberLists)
    // 跳转到会员地址
    .get('/member/address', MemberController.address)

    // 获取全部会员列表
    .get('/member/findAllMembers', MemberController.findAllMembers)
    // 通过条件查询会员列表
    .post('/member/findMembersByParams', MemberController.findMembersByParams)
    // 获取全部地址
    .get('/member/findAllAddress', MemberController.findAllAddress)
    // 通过条件查询地址列表
    .post('/member/findAddressByParams', MemberController.findAddressByParams)

    /*-------------会员管理结束-----------*/
    /*-------------仓储管理开始-----------*/

    // 跳转到 仓储管理——仓库管理
    .get('/storage/warehouse', StorageController.warehouse)
    // 跳转到 仓储管理——采购入库
    .get('/storage/purchase', StorageController.purchase)
    // 跳转到 仓储管理——销售出库
    .get('/storage/sale', StorageController.sale)
    // 跳转到 仓储管理——销售退货
    .get('/storage/return', StorageController.return)
    // 跳转到 仓储管理——库存盘点
    .get('/storage/check', StorageController.check)
    // 跳转到 仓储管理——库存清单
    .get('/storage/lists', StorageController.lists)

    /*-------------仓储管理结束-----------*/
    /*-------------基础资料开始-----------*/
    // 跳转到分类字典
    .get('/dictionary/category', DictionaryController.category)
    // 跳转到商品字典
    .get('/dictionary/goods', DictionaryController.goods)
    // 跳转到创建商品——基本信息页
    .get('/dictionary/goods/base', DictionaryController.goodsBase)
    // 跳转到创建商品——轮播图
    .get('/dictionary/goods/slideshow', DictionaryController.goodsSlideshow)
    // 跳转到创建商品——图文介绍
    .get('/dictionary/goods/info', DictionaryController.goodsInfo)
    // 跳转到创建商品——规格参数
    .get('/dictionary/goods/specification', DictionaryController.goodsSpecification)
    // 跳转到客户列表
    .get('/dictionary/customer', DictionaryController.customer)

    // 增加字典列表
    .post('/dictionary/addDictionary', DictionaryController.addDictionary)
    // 通过字典 id 删除记录
    .post('/dictionary/deleteDictionaryById', DictionaryController.deleteDictionaryById)
    // 通过批量字典 id 删除多条记录
    .post('/dictionary/deleteDictionaryByIds', DictionaryController.deleteDictionaryByIds)
    // 通过 id 修改对应字典记录
    .post('/dictionary/updateDictionaryById', DictionaryController.updateDictionaryById)
    // 查询全部字典记录
    .get('/dictionary/findAllParentLists', DictionaryController.findAllParentLists)
    // 通过字典编码查询 字典
    .get('/dictionary/findParentDicByCode', DictionaryController.findParentDicByCode)
    // 根据字典 id 查询字段列表
    .post('/dictionary/findFieldsById', DictionaryController.findFieldsById)
    // 增加字段列表
    .post('/dictionary/addField', DictionaryController.addField)
    // 通过 id 修改对应字段记录
    .post('/dictionary/updateFieldById', DictionaryController.updateFieldById)

    // 增加客户资料
    .post('/dictionary/addCustomer', DictionaryController.addCustomer)
    // 通过客户 id 删除记录
    .post('/dictionary/deleteCustomerById', DictionaryController.deleteCustomerById)
    // 通过 id 修改对应客户记录
    .post('/dictionary/updateCustomerById', DictionaryController.updateCustomerById)
    // 查询全部客户列表
    .get('/dictionary/findAllCustomers', DictionaryController.findAllCustomers)

    // 添加商品字典记录
    .post('/dictionary/addGoods', DictionaryController.addGoods)
    // 查询商品字典列表
    .post('/dictionary/findGoodsLists', DictionaryController.findGoodsLists)
    // 查询商品字典最后一条记录Id
    .get('/dictionary/findLastGoodsId', DictionaryController.findLastGoodsId)

    /*-------------基础资料结束-----------*/
    /*-------------账户设置开始-----------*/

    // 跳转到 修改密码页
    .get('/setting/changepwd', SettingController.changepwd)
    // 跳转到 修改个人资料页
    .get('/setting/changeinfo', SettingController.changeinfo)
    // 跳转到 切换账号页
    .get('/setting/changeaccount', SettingController.changeaccount)

    // 获取个人资料
    .get('/setting/findUserInfoByUID', AccountController.findUserInfoByUID)
    // 更新密码
    .post('/setting/updatePwd', SettingController.updatePwd)
    // 更新个人资料
    .post('/setting/updateUserInfo', SettingController.updateUserInfo)
    // 获取关联账号列表
    .post('/setting/findLinkAccountByMainId', SettingController.findLinkAccountByMainId)
    // 关联账号免密登录
    .post('/setting/linkAccountLogin', SettingController.linkAccountLogin)
    // 删除关联账号
    .post('/setting/deleteLinkAccount', SettingController.deleteLinkAccount)
  /*-------------账户设置结束-----------*/

  app.use(router.routes())
    .use(router.allowedMethods())

}