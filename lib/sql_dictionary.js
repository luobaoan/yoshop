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
  }
}