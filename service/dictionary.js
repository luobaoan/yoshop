// 数据库
const userModel = require('../lib/mysql')

module.exports = {
  /**
   * 增加字典列表
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   */
  addDictionary: async (dictionary) => {
    let data;
    console.log(dictionary)
    await userModel.dictionarySql.insertDictionary(dictionary)
      .then(() => {
        data = {
          status: true,
          msg: '增加成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '新增失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id删除字典记录
   * id：字典 id
   */
  deleteDictionaryById: async (id) => {
    let data;
    console.log(id)
    await userModel.dictionarySql.deleteDictionaryById(id)
      .then(() => {
        data = {
          status: true,
          msg: '删除成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '删除失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 ids批量删除字典记录
   * ids：批量字典 id
   */
  deleteDictionaryByIds: async (ids) => {
    let data;
    console.log(id)
    await userModel.dictionarySql.deleteDictionaryByIds(ids)
      .then(() => {
        data = {
          status: true,
          msg: '删除成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '删除失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id 修改对应字典记录
   * name：名称
   * sort：排序数字
   * code：字典编码（方便查询）
   * id：字典 id
   */
  updateDictionaryById: async (dictionary) => {
    let data;
    await userModel.dictionarySql.updateDictionaryById(dictionary)
      .then(() => {
        data = {
          status: true,
          msg: '更新成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '更新失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 查询全部字典列表
   */
  findAllParentLists: async () => {
    let data;
    await userModel.dictionarySql.findAllParentLists()
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        console.log(res)
        data = {
          status: true,
          data: res,
          msg: '全部字典列表'
        }
      }).catch((err) => {
        data = {
          status: false,
          msg: '更新失败，请稍后重试'
        }
      })
    return data
  },
  /**
   * 根据字典 id 查询字段列表
   */
  findFieldsById: async (id) => {
    let data;
    await userModel.dictionarySql.findFieldsById(id)
      .then((result) => {
        let res = JSON.parse(JSON.stringify(result))
        console.log(res)
        data = {
          status: true,
          data: res,
          msg: '字段列表'
        }
      }).catch((error) => {
        console.log(error)
        data = {
          status: false,
          msg: '查询失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 增加字段列表
   * parent_id：对应字典 id
   * name：名称
   * sort：排序数字
   * code：字典编码（对应字典 code）
   */
  addField: async (field) => {
    let data;
    console.log(field)
    await userModel.dictionarySql.insertField(field)
      .then(() => {
        data = {
          status: true,
          msg: '增加成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '新增失败，请稍后重试'
        }
      })
    return data;
  },
  /**
   * 通过 id 修改对应字段记录
   * name：名称
   * sort：排序数字
   */
  updateFieldById: async (field) => {
    let data;
    await userModel.dictionarySql.updateFieldById(field)
      .then(() => {
        data = {
          status: true,
          msg: '更新成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '更新失败，请稍后重试'
        }
      })
    return data;
  }
}