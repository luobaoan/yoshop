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
  router.get('/home', AccountController.home)

  /*-------------账户管理开始-----------*/

  // 首页重定向到登录页面
  router.get('/', AccountController.signin)
  // 跳转到登录页面
  router.get('/signin', AccountController.signin)
  // 跳转到注册页
  router.get('/signup', AccountController.signup)
  // 退出账号
  router.get('/signout', AccountController.signout)
  // 登录
  router.post('/login', AccountController.login)
  // 注册用户
  router.post('/register', AccountController.register)

  /*-------------账户管理结束-----------*/
  /*-------------订单管理开始-----------*/

  // 跳转到订单——新订单
  router.get('/orders/new', OrdersController.orderNew)
  // 跳转到订单——配送中
  router.get('/orders/sending', OrdersController.orderSending)
  // 跳转到订单——已完成
  router.get('/orders/end', OrdersController.orderEnd)

  /*-------------订单管理结束-----------*/

  /*-------------商品管理开始-----------*/
  // 跳转到商品上下架
  router.get('/goods/shelf', GoodsController.goodsShelf)

  /*-------------商品管理结束-----------*/

  /*-------------会员管理开始-----------*/
  // 跳转到会员列表
  router.get('/member/lists', MemberController.memberLists)
  // 跳转到会员地址
  router.get('/member/address', MemberController.address)

  // 获取全部会员列表
  router.get('/member/findAllMembers', MemberController.findAllMembers)
  // 通过条件查询会员列表
  router.post('/member/findMembersByParams', MemberController.findMembersByParams)
  // 获取全部地址
  router.get('/member/findAllAddress', MemberController.findAllAddress)
  // 通过条件查询地址列表
  router.post('/member/findAddressByParams', MemberController.findAddressByParams)

  /*-------------会员管理结束-----------*/
  /*-------------仓储管理开始-----------*/

  // 跳转到 仓储管理——仓库管理
  router.get('/storage/warehouse', StorageController.warehouse)
  // 跳转到 仓储管理——采购入库
  router.get('/storage/purchase', StorageController.purchase)
  // 跳转到 仓储管理——销售出库
  router.get('/storage/sale', StorageController.sale)
  // 跳转到 仓储管理——销售退货
  router.get('/storage/return', StorageController.return)
  // 跳转到 仓储管理——库存盘点
  router.get('/storage/check', StorageController.check)
  // 跳转到 仓储管理——库存清单
  router.get('/storage/lists', StorageController.lists)

  /*-------------仓储管理结束-----------*/
  /*-------------基础资料开始-----------*/
  // 跳转到分类字典
  router.get('/dictionary/category', DictionaryController.category)
  // 跳转到商品字典
  router.get('/dictionary/goods', DictionaryController.goods)
  // 跳转到创建商品——基本信息页
  router.get('/dictionary/goods/base', DictionaryController.goodsBase)
  // 跳转到创建商品——轮播图
  router.get('/dictionary/goods/slideshow', DictionaryController.goodsSlideshow)
  // 跳转到创建商品——图文介绍
  router.get('/dictionary/goods/info', DictionaryController.goodsInfo)
  // 跳转到创建商品——规格参数
  router.get('/dictionary/goods/specification', DictionaryController.goodsSpecification)
  // 跳转到客户列表
  router.get('/dictionary/customer', DictionaryController.customer)

  // 增加字典列表
  router.post('/dictionary/addDictionary', DictionaryController.addDictionary)
  // 通过字典 id 删除记录
  router.post('/dictionary/deleteDictionaryById', DictionaryController.deleteDictionaryById)
  // 通过批量字典 id 删除多条记录
  router.post('/dictionary/deleteDictionaryByIds', DictionaryController.deleteDictionaryByIds)
  // 通过 id 修改对应字典记录
  router.post('/dictionary/updateDictionaryById', DictionaryController.updateDictionaryById)
  // 查询全部字典记录
  router.get('/dictionary/findAllParentLists', DictionaryController.findAllParentLists)
  // 根据字典 id 查询字段列表
  router.post('/dictionary/findFieldsById', DictionaryController.findFieldsById)
  // 增加字段列表
  router.post('/dictionary/addField', DictionaryController.addField)
  // 通过 id 修改对应字段记录
  router.post('/dictionary/updateFieldById', DictionaryController.updateFieldById)

  // 增加客户资料
  router.post('/dictionary/addCustomer', DictionaryController.addCustomer)
  // 通过客户 id 删除记录
  router.post('/dictionary/deleteCustomerById', DictionaryController.deleteCustomerById)
  // 通过 id 修改对应客户记录
  router.post('/dictionary/updateCustomerById', DictionaryController.updateCustomerById)
  // 查询全部客户列表
  router.get('/dictionary/findAllCustomers', DictionaryController.findAllCustomers)

  /*-------------基础资料结束-----------*/
  /*-------------账户设置开始-----------*/

  // 跳转到 修改密码页
  router.get('/setting/changepwd', SettingController.changepwd)
  // 跳转到 修改个人资料页
  router.get('/setting/changeinfo', SettingController.changeinfo)
  // 跳转到 切换账号页
  router.get('/setting/changeaccount', SettingController.changeaccount)

  // 获取个人资料
  router.get('/setting/findUserInfoByUID', AccountController.findUserInfoByUID)
  // 更新密码
  router.post('/setting/updatePwd', SettingController.updatePwd)
  // 更新个人资料
  router.post('/setting/updateUserInfo', SettingController.updateUserInfo)
  // 获取关联账号列表
  router.post('/setting/findLinkAccountByMainId', SettingController.findLinkAccountByMainId)
  // 关联账号免密登录
  router.post('/setting/linkAccountLogin', SettingController.linkAccountLogin)
  /*-------------账户设置结束-----------*/

  app.use(router.routes())
    .use(router.allowedMethods())

}