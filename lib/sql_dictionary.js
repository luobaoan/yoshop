/**
 * 分类字典
 */

const sqlQuery = require('./sql_query')

module.exports = {
  /**
   * 增加字典列表
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   */
  insertDictionary: async (value) => {
    let _sql = `insert into t_dictionary(create_time,name,sort,code) values(now(),?,?,?); `
    return sqlQuery.query(_sql, value)
  },
  /**
   * 通过 id删除字典记录
   * id:字典 id
   */
  deleteDictionaryById: async (id) => {
    let _sql = `delete from t_dictionary where id=${id}`
    return sqlQuery.query(_sql)
  },
  /**
   * 通过ids 批量删除字典记录
   * ids：批量字典 id
   */
  deleteDictionaryByIds: async (ids) => {
    let _sql = `delete from t_dictionary where id in (${ids})`
    return sqlQuery.query(_sql)
  },
  /**
   * 通过 id 修改对应字典记录
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   * id：字典 id
   */
  updateDictionaryById: async (value) => {
    let _sql = `update t_dictionary set edit_time=now(),name=?,sort=? ,code=? where id=?`
    return sqlQuery.query(_sql, value)
  },
  /**
   * 查询全部字典列表
   */
  findAllParentLists: async () => {
    let _sql = 'select * from t_dictionary where parent_id is null'
    return sqlQuery.query(_sql)
  },
  /**
   * 根据字典 id 查询字段列表
   */
  findFieldsById: async (id) => {
    let _sql = `select * from t_dictionary where parent_id = ${id}`
    return sqlQuery.query(_sql)
  },
  /**
   * 增加字段列表
   * parent_id：对应字典 id
   * name：名称
   * sort：排序数字
   * code：字典编码（对应字典 code）
   */
  insertField: async (value) => {
    let _sql = `insert into t_dictionary(create_time,parent_id,name,sort,code) values(now(),?,?,?,?); `
    return sqlQuery.query(_sql, value)
  },
  /**
   * 通过 id 修改对应字段记录
   * name：名称
   * sort：排序数字
   */
  updateFieldById: async (value) => {
    let _sql = `update t_dictionary set edit_time=now(),name=?,sort=? where id=?`
    return sqlQuery.query(_sql, value)
  },
  /**
   *  新增客户
   *  code：客户编号
   *  name：客户公司名称
   *  contact：联系人
   *  phone：联系电话/手机
   *  address：地址
   *  sort：排序
   *  remark：备注
   */
  insertCustomer: async (value) => {
    let _sql = 'insert into t_customer (create_time,code,name,contact,phone,address,sort,remark) values(now(),?,?,?,?,?,?,?);'
    return sqlQuery.query(_sql, value)
  },
  /**
   * 通过 id删除客户记录
   * id: 客户 id
   */
  deleteCustomerById: async (id) => {
    let _sql = `delete from t_customer where id=${id}`
    return sqlQuery.query(_sql)
  },
  /**
   * 通过 id 修改对应客户记录
   *  code：客户编号
   *  name：客户公司名称
   *  contact：联系人
   *  phone：联系电话/手机
   *  address：地址
   *  sort：排序
   *  remark：备注
   *  id: 客户 id
   */
  updateCustomerById: async (value) => {
    let _sql = `update t_customer set edit_time = now(), code=?,name=?,contact=?,phone=?,address=?,sort=?,remark=? where id=?`
    return sqlQuery.query(_sql, value)
  },
  /**
   * 查询全部客户列表
   */
  findAllCustomers: async () => {
    let _sql = 'select * from t_customer'
    return sqlQuery.query(_sql)
  }
}