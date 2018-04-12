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
  /** 通过字典编码 查询父字典分类对应的字段列表
   * @param code：字典编码
   */
  findParentDicByCode: async (code) => {
    let _sql = `select * from t_dictionary where parent_id is not null and code ="${code}"`
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
  },
  /**
   *  新增商品字典记录
   *  code: 商品编号
   *  title: 商品名称
   *  abbr: 商品简称
   *  brand_id: 品牌id
   *  brand_name: 品牌名称
   *  category_id: 分类id
   *  category_name: 分类名称
   *  unit_id: 计量单位id
   *  unit_name: 计量单位名
   *  sale_price:  销售单价
   *  sort: 排序
   *  goods_desc: 图文详情
   */
  insertGoods: async (value) => {
    let _sql = 'insert into t_goods (create_time,code,title,abbr,brand_id,brand_name,category_id,category_name,unit_id,unit_name,sale_price,sort,goods_desc) values(now(),?,?,?,?,?,?,?,?,?,?,?,?);'
    return sqlQuery.query(_sql, value)
  },
  /** 通过 id删除商品字典记录
   * @param id:商品字典 id
   */
  deleteGoodsById: async (id) => {
    let _sql = `delete from t_goods where id=${id}`
    return sqlQuery.query(_sql)
  },
  /** 更新商品字典记录
   *  code: 商品编号
   *  title: 商品名称
   *  abbr: 商品简称
   *  brand_id: 品牌id
   *  brand_name: 品牌名称
   *  category_id: 分类id
   *  category_name: 分类名称
   *  unit_id: 计量单位id
   *  unit_name: 计量单位名
   *  sale_price:  销售单价
   *  sort: 排序
   *  goods_desc: 图文详情
   *  id: 商品id
   */
  updateGoodsById: async (values) => {
    let _sql = `update t_goods set edit_time = now()`
    let code = values[0]
    if (code) {
      _sql += `,code=?`
    }
    let title = values[1]
    if (title) {
      _sql += `,title=?`
    }
    let abbr = values[2]
    if (abbr) {
      _sql += `,abbr=?`
    }
    let brand_id = values[3]
    if (brand_id) {
      _sql += `,brand_id=?`
    }
    let brand_name = values[4]
    if (brand_name) {
      _sql += `,brand_name=?`
    }
    let category_id = values[5]
    if (category_id) {
      _sql += `,category_id=?`
    }
    let category_name = values[6]
    if (category_name) {
      _sql += `,category_name=?`
    }
    let unit_id = values[7]
    if (unit_id) {
      _sql += `,unit_id=?`
    }
    let unit_name = values[8]
    if (unit_name) {
      _sql += `,unit_name=?`
    }
    let sale_price = values[9]
    if (sale_price) {
      _sql += `,sale_price=?`
    }
    let sort = values[10]
    if (sort) {
      _sql += `,sort=?`
    }
    let goods_desc = values[11]
    if (goods_desc) {
      _sql += `,goods_desc=?`
    }
    let id = values[12]
    if (id) {
      _sql += ` where id=?`
    }
    return sqlQuery.query(_sql, values)
  },
  /** 通过id查找对应商品字典记录
   * @param  id:商品id
   */
  findGoodsById: async (id) => {
    let _sql = `select * from t_goods where id = ${id}`
    return sqlQuery.query(_sql)
  },
  /** 查询全部商品字典列表
   * @param goodsName:商品名称
   * @param goodsBrandId:商品品牌Id
   * @param goodsCategoryId:商品分类Id
   * @param goodsUnit:商品单位
   * @param priceSort:价格排序 desc： 降序，asc： 升序
   */
  findGoodsLists: async (values) => {
    let _sql = `select * from t_goods where 1=1`
    let goodsName = values[0]
    if (goodsName) {
      _sql += ` and title like "%"?"%"`
    }
    let goodsBrandId = values[1]
    if (goodsBrandId) {
      _sql += ` and brand_id = '${goodsBrandId}'`
    }
    let goodsCategoryId = values[2]
    if (goodsCategoryId) {
      _sql += ` and category_id = '${goodsCategoryId}'`
    }
    let goodsUnit = values[3]
    if (goodsUnit) {
      _sql += ` and unit_id = '${goodsUnit}'`
    }
    let sortFlag = values[4];
    // 替换排序字符串
    if (sortFlag) {
      _sql += ` order by sale_price ${sortFlag}`
    }
    return sqlQuery.query(_sql, values)
  },
  /** 查询商品字典最后一条记录
   *
   */
  findLastGoodsId: async () => {
    let _sql = "select id from t_goods order by id desc limit 1"
    return sqlQuery.query(_sql)
  }
}