// 数据库
const userModel = require('../lib/mysql')

module.exports = {
  /**
   * 查询全部会员列表
   */
  findAllMembers: async () => {
    let data;
    await userModel.memberSql.findAllMembers()
      .then(result => {
        let res = JSON.parse(JSON.stringify(result))
        data = {
          status: true,
          data: res,
          msg: '全部会员列表'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '查询出错，稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过姓名或者性别查找会员列表
   * name：姓名
   * sex：性别
   */
  findMembersByParams: async (member) => {
    // console.log(member)
    let data;
    await userModel.memberSql.findMembersByParams(member.name, member.sex)
      .then(result => {
        let res = JSON.parse(JSON.stringify(result))
        // console.log(res)
        data = {
          status: true,
          data: res,
          msg: '会员列表'
        }
      }).catch((e) => {
        // console.log(e)
        data = {
          status: false,
          msg: '查询出错，稍后重试'
        }
      })
    return data;
  },
  /**
   * 查询全部收货地址
   */
  findAllAddress: async () => {
    let data;
    await userModel.memberSql.findAllAddress()
      .then(result => {
        let res = JSON.parse(JSON.stringify(result))
        data = {
          status: true,
          data: res,
          msg: '全部收货地址'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '查询出错，稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过姓名、手机号、省市区查询
   * name：姓名
   * phone：手机号
   * provinceId：省 id
   * cityId：市区 id
   * areaId：区县 id
   */
  findAddressByParams: async (address) => {
    let data;
    await userModel.memberSql.findAddressByParams(address.name, address.phone, address.provinceId, address.cityId, address.areaId)
      .then(result => {
        let res = JSON.parse(JSON.stringify(result))
        console.log(res)
        data = {
          status: true,
          data: res,
          msg: '地址列表'
        }
      }).catch((e) => {
        console.log(e)
        data = {
          status: false,
          msg: '查询出错，稍后重试'
        }
      })
    return data;
  }

}