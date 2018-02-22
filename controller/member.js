/**
 * 会员管理
 * 会员列表、会员收货地址
 */

const MemberService = require('../service/member')

module.exports = {
  // 跳转到会员列表
  memberLists: async (ctx, next) => {
    await ctx.render('member/member_lists', {
      session: ctx.session,
      title: "会员列表",
      pagename: 'member-lists',
      pageclass: 'member-lists'
    })
  },
  // 跳转到会员收货地址
  address: async (ctx, next) => {
    await ctx.render('member/member_address', {
      session: ctx.session,
      title: "收货地址",
      pagename: 'member-address',
      pageclass: 'member-address'
    })
  },
  /**
   * 查询全部会员列表
   */
  findAllMembers: async (ctx, next) => {
    let res = await MemberService.findAllMembers()
    ctx.body = res
  },
  /**
   * 通过姓名或者性别查找会员列表
   * name：姓名
   * sex：性别
   */
  findMembersByParams: async (ctx, next) => {
    let params = ctx.request.body;
    let member = {
      name: params.name,
      sex: params.sex
    }
    let res = await MemberService.findMembersByParams(member)
    // console.log(res)
    ctx.body = res;
  },
  /**
   * 查询全部收货地址
   */
  findAllAddress: async (ctx, next) => {
    let res = await MemberService.findAllAddress()
    ctx.body = res
  },
  /**
   * 通过姓名、手机号、省市区查询
   * name：姓名
   * phone：手机号
   * provinceId：省 id
   * cityId：市区 id
   * areaId：区县 id
   */
  findAddressByParams: async (ctx, next) => {
    let params = ctx.request.body;
    let address = {
      name: params.name,
      phone: params.phone,
      provinceId: params.provinceId,
      cityId: params.cityId,
      areaId: params.areaId
    }
    let res = await MemberService.findAddressByParams(address)
    console.log(res)
    ctx.body = res;
  }
}