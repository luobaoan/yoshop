/**
 * 账户设置
 * 修改账户密码、修改个人资料
 */

const sqlPool = require('./sql_query')

module.exports = {
  /**
   * 通过账户 id 修改密码
   * password：用户密码
   * id:用户 id
   */
  updatePwd: async (value) => {
    let _sql = 'update t_account set edit_time=now(),password= ? where id= ?'
    return sqlPool.query(_sql, value)
  },
  /**
   * 更新注册用户个人资料
   *  username：用户名
   *  sex：性别
   *  phone：手机号
   *  email：邮箱
   *  uid：用户 id
   */
  updateUserInfo: async (value) => {
    let _sql = 'update t_user set edit_time = now(),username=?,sex=?,phone=?,email=? where uid = ?'
    return sqlPool.query(_sql, value)
  }
}