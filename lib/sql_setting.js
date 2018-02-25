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
  },
  /**
   * 增加关联账号记录
   * main_account_id：主账号id 第一次登入的账号
   * link_account_id:关联账号id  关联的账号
   */
  insertLinkAccount: async (value) => {
    let _sql = 'insert into t_link_account(create_time,main_account_id,link_account_id) values(now(),?,?);'
    return sqlPool.query(_sql, value)
  },
  /**
   * 查询是否有关联记录
   * main_account_id：主账号id 第一次登入的账号
   * link_account_id:关联账号id  关联的账号
   */
  findLinkAccount: async (value) => {
    let _sql = `select * from t_link_account where main_account_id =? and link_account_id = ?;`
    return sqlPool.query(_sql, value)
  },
  /**
   * 根据主账号查询关联账号
   * mainId：主账号 id
   */
  findLinkAccountByMainId: async (mainId) => {
    let _sql = `select * from t_link_account where main_account_id ="${mainId}";`
    return sqlPool.query(_sql)
  },
  /**
   * 删除关联账号
   * main_account_id：主账号id 第一次登入的账号
   * link_account_id:关联账号id  关联的账号
   */
  deleteLinkAccount: async (value) => {
    let _sql = `delete from t_link_account where main_account_id=? and link_account_id=?`
    return sqlPool.query(_sql, value)
  }
}