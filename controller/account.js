/**
 * 账户管理
 * 登录、注册、退出
 */

const AccountService = require('../service/account')

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
      session: ctx.session
    })
  },
  // 跳转注册
  signup: async (ctx, next) => {
    await ctx.render('account/signup', {
      session: ctx.session
    })
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
    let res = await AccountService.login(account, password)
    console.log(res)
    // 登录成功，设置 session
    if (res.status) {
      ctx.session = {
        id: res.data.uid,
        username: res.data.username,
        avator: res.data.avator
      }
    }
    ctx.body = res;

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
    console.log("uid:" + uid)
    let res = await AccountService.findUserInfoByUID(uid)
    // console.log(res)
    ctx.body = res
  }
}
