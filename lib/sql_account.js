/**
 * 账户管理
 * 注册、登录
 */

const sqlQuery = require('./sql_query')

module.exports = {
  /**
   *  注册用户
   *  account：用户名
   *  password：密码
   */
  insertAccount: async (value) => {
    let _sql = 'insert into t_account(create_time,account,password) values(now(),?,?);'
    return sqlQuery.query(_sql, value)
  },
  /**
   * 通过用户 id 查找注册信息
   * id：用户 id
   */
  findAccountById: async (id) => {
    let _sql = `select * from t_account where id="${id}"`
    return sqlQuery.query(_sql)
  },
  /**
   *  通过用户名查找注册用户
   *  name：用户名
   */
  findAccountByAccount: async (account) => {
    let _sql =
      `select * from t_account where account ="${account}"`
    return sqlQuery.query(_sql)
  },
  /**
   * 添加注册用户资料
   *  uid:用户 id
   *  username：用户名称
   *  sex：性别，默认 'secret'
   *  avator：头像，默认 '/avator.png'
   */
  insertUser: async (value) => {
    let _sql = 'insert into t_user(create_time,uid,username,sex,avator) values(now(),?,"匿名","secret","/avator.png")'
    return sqlQuery.query(_sql, value)
  },

  /**
   *  通过 uid查找个人资料
   *  uid：用户 id
   */
  findUserInfoByUID: async (uid) => {
    let _sql = `select * from t_user where uid = "${uid}"`
    return sqlQuery.query(_sql)
  }

}
