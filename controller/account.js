/**
 * 账户管理
 * 登录、注册、退出
 */

const AccountService = require('../service/account')
const SettingService = require('../service/setting')

module.exports = {
  // 中间件测试返回JSON数据
  responseJson: async (ctx, next) => {
    ctx.send({
      status: 200,
      name: 'bruce'
    })
  },
  home: async (ctx, next) => {
    await ctx.render('home/index', {
      title: '新订单',
      pagename: 'order-new',
      pageclass: 'order-new orders',
      session: ctx.session
    })
  },
  // 跳转到登录
  signin: async (ctx, next) => {
    await ctx.render('account/signin', {
      mainid: ctx.request.query.mainid
    })
  },
  // 跳转注册
  signup: async (ctx, next) => {
    await ctx.render('account/signup', {})
  },
  // 退出账户
  signout: async (ctx, next) => {
    ctx.session = null;
    ctx.body = 'true'
  },
  /** 登录接口
   *  account:账户名
   *  password:密码
   */
  login: async (ctx, next) => {
    let params = ctx.request.body;
    let account = params.account;
    let password = params.password;
    let mainId = params.mainid;
    // 反馈信息
    let bodyInfo;

    let res = await AccountService.login(account, password)
    // 正常登录成功，设置 session
    bodyInfo = res
    let linkId;
    if (res.status) {
      ctx.session = {
        id: res.data.uid,
        username: res.data.username,
        avator: res.data.avator
      }
      linkId = res.data.uid + "";
    }
    /**
     *  关联登录，需要判断是否插入关联账户成功
     */
    if (mainId && mainId != linkId) {
      let linkData = [mainId, linkId]
      // 此处还需要优化，比如linkId已经在数据库中存在了，不可重复插入，稍后优化
      let flag = await SettingService.findLinkAccount(linkData)
      let linkRes;
      if (!flag.status) {
        // 未曾关联过
        linkRes = await SettingService.addLinkAccount(linkData)
        bodyInfo = linkRes
      }
    }
    ctx.body = bodyInfo;
  },
  /** 注册接口
   * account：账户名
   * password：密码
   * repeatpass：确认密码
   */
  register: async (ctx, next) => {
    let params = ctx.request.body;
    let user = {
      account: params.account,
      password: params.password,
      repeatpass: params.repeatpass
    }
    let res = await AccountService.register(user)
    ctx.body = res;
  },
  /**
   * 通过 uid查找个人资料
   * uid：用户 id
   */
  findUserInfoByUID: async (ctx, next) => {
    let params = ctx.request.query
    let uid = params.uid;
    // console.log("uid:" + uid)
    let res = await AccountService.findUserInfoByUID(uid)
    // console.log(res)
    ctx.body = res
  }
}