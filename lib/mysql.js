/**
 * 数据库操作汇总
 */
const accountSql = require('./sql_account')
const settingSql = require('./sql_setting')
const memberSql = require('./sql_member')
const dictionarySql = require('./sql_dictionary')

module.exports = {
  // 账户管理接口
  accountSql: accountSql,
  // 账户设置接口
  settingSql: settingSql,
  // 会员管理接口
  memberSql: memberSql,
  // 字典管理接口
  dictionarySql: dictionarySql
}