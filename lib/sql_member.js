/**
 * 会员管理
 * 会员列表、会员收货地址
 */

const sqlQuery = require('./sql_query')

module.exports = {
  /**
   * 查询全部会员列表
   */
  findAllMembers: async () => {
    let _sql = 'select * from t_member'
    return sqlQuery.query(_sql)
  },
  /**
   * 通过姓名或者性别查找会员列表
   * name：姓名
   * sex：性别
   */
  findMembersByParams: async (name, sex) => {
    let params = '1=1 ';
    if (name) {
      params += ' and  name like  "%' + name + '%"'
    }
    if (sex) {
      params += ' and  sex = "' + sex + '"'
    }

    let _sql = 'select * from t_member where ' + params;
    return sqlQuery.query(_sql)
  },
  /**
   * 查询全部收货地址
   */
  findAllAddress: async () => {
    let _sql = 'select * from  t_address'
    return sqlQuery.query(_sql)
  },
  /**
   * 通过姓名、手机号、省市区查询
   * name：姓名
   * phone：手机号
   * provinceId：省 id
   * cityId：市区 id
   * areaId：区县 id
   */
  findAddressByParams: async (name, phone, provinceId, cityId, areaId) => {
    let params = '1=1 ';
    if (name) {
      params += ' and  name like  "%' + name + '%"'
    }
    if (phone) {
      params += ' and  phone like  "%' + phone + '%"'
    }
    if (provinceId) {
      params += ' and  province_id = "' + provinceId + '"'
    }
    if (cityId) {
      params += ' and  city_id = "' + cityId + '"'
    }
    if (areaId) {
      params += ' and  area_id = "' + areaId + '"'
    }
    let _sql = 'select * from t_address where ' + params
    return sqlQuery.query(_sql)
  }


}