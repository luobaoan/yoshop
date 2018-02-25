// 数据库
const userModel = require('../lib/mysql')
// 加密
const md5 = require('md5')

module.exports = {
  // 用户登录
  login: async (account, password) => {
    let data,
      accountInfo,
      userInfo,
      uid,
      username,
      avator;

    if (!account || !password) {
      data = {
        status: false,
        msg: '用户名或密码不能空'
      }
      return data;
    }

    // 查找用户名存在与否
    await userModel.accountSql.findAccountByAccount(account)
      .then(result => {
        accountInfo = JSON.parse(JSON.stringify(result))
      }).catch(err => {
        console.log(err)
      })
    // 存在该用户
    if (accountInfo.length != 0) {
      // 通过 uid 查看用户个人资料
      uid = accountInfo[0]['id']
      await userModel.accountSql.findUserInfoByUID(uid)
        .then(info => {
          userInfo = JSON.parse(JSON.stringify(info))
          // 获取用户的 名称和头像
          username = userInfo[0]['username']
          avator = userInfo[0]['avator']
        })
      // 验证密码
      if (md5(account + password) == accountInfo[0]['password']) {
        data = {
          status: true,
          data: {
            uid: uid,
            username: username,
            avator: avator
          },
          msg: '登录成功'
        }
      } else {
        data = {
          status: false,
          msg: '密码错误'
        }
      }
    } else {
      data = {
        status: false,
        msg: '用户不存在'
      }
    }
    return data;
  },
  // 用户注册
  register: async (user) => {
    let data;
    await userModel.accountSql.findAccountByAccount(user.account)
      .then(accountInfo => {
        if (accountInfo.length) {
          data = {
            status: '1',
            msg: '用户已存在'
          }
        } else if (user.password == ''){
          data = {
            status: '2',
            msg: '密码输入不能为空'
          }
        } else if (user.password !== user.repeatpass) {
          data = {
            status: '3',
            msg: '两次密码输入不一致'
          }
        } else {
          // 注册账户
          userModel.accountSql.insertAccount([user.account, md5(user.account + user.password)])
          // 通过账户名查找用户 id
          userModel.accountSql.findAccountByAccount(user.account)
            .then(result => {
              let res = JSON.parse(JSON.stringify(result))
              uid = res[0]['id'];
              // console.log("UID:" + uid)
              // 生成用户个人资料
              userModel.accountSql.insertUser([uid])
            })
          data = {
            status: '4',
            msg: '用户注册成功'
          }
        }
      })
    return data;
  },
  /**
   * 通过 uid 查询个人资料
   * uid：用户 id
   */
  findUserInfoByUID: async (uid) => {
    let data;
    await userModel.accountSql.findUserInfoByUID([uid])
      .then(info => {
        let userInfo = JSON.parse(JSON.stringify(info))
        // console.log(userInfo)
        data = {
          status: true,
          data: userInfo[0],
          msg: '用户资料'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '查询异常，稍后重试'
        }
      })
    return data;
  },

}