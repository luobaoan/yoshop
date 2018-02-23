// 数据库
const userModel = require('../lib/mysql')
// 加密
const md5 = require('md5')

module.exports = {
  /**
   * 修改密码接口
   * user：用户数据
   */
  updatePwd: async (user) => {
    // let user = {
    //   uid: params.uid,
    //   oldpwd: params.oldpwd,
    //   newpwd: params.newpwd,
    //   confirmpwd: params.confirmpwd
    // }
    let data, // 返回信息
      userAccount, // 用户账号
      userpwd; // 用户密码

    // Step1 判断旧密码是否正确
    await userModel.accountSql.findAccountById(user.uid)
      .then(result => {
        let res = JSON.parse(JSON.stringify(result))
        userAccount = res[0]['account']
        userpwd = res[0]['password']
      })
    if (md5(userAccount + user.oldpwd) != userpwd) {
      data = {
        status: false,
        msg: '旧密码不正确'
      }
    }

    // Step2 判断新密码与旧密码是否一致
    else if (user.newpwd === user.oldpwd) {
      data = {
        status: false,
        msg: '新密码不能与旧密码一致'
      }
    }
    // Step3 判断确认密码与新密码是否一致
    else if (user.newpwd != user.confirmpwd) {
      data = {
        status: false,
        msg: '确认密码与新密码不一致'
      }
    }
    // Step4 修改用户密码 newpwd：新密码   uid：用户 id
    else {
      await userModel.settingSql.updatePwd([md5(userAccount + user.newpwd), user.uid])
        .then(() => {
          data = {
            status: true,
            msg: '修改密码成功，请重新登录'
          }
        }).catch(() => {
          data = {
            status: false,
            msg: '修改密码失败，请稍后重试'
          }
        })
    }
    return data;
  },
  /**
   * 更新注册用户个人资料
   * user：用户数据
   */
  updateUserInfo: async (user) => {
    // let user = {
    //   username: params.username,
    //   sex: params.sex,
    //   phone: params.phone,
    //   email: params.email,
    //   uid: params.uid
    // }
    let data;
    // console.log(user)
    //   更新个人资料
    await userModel.settingSql.updateUserInfo([user.username, user.sex, user.phone, user.email, user.uid])
      .then(() => {
        data = {
          status: true,
          msg: '更新个人资料成功'
        }
      }).catch(() => {
        data = {
          status: false,
          msg: '更新失败，稍后重试'
        }
      })
    return data;
  },
  /**
   * 关联账号记录
   * main_account_id：主账号id 第一次登入的账号
   * link_account_id:关联账号id  关联的账号
   */
   addLinkAccount: async(linkData)=>{
     let data;
     await userModel.settingSql.insertLinkAccount(linkData)
     .then(()=>{
       data={
         status:true,
         data:{
           type:'linkAccount'
         },
         msg:'关联成功'
       }
     }).catch(()=>{
       data={
         status:false,
         msg:'请求失败，请稍后重试'
       }
     })
     return data;
   }
}
