const mysql = require('mysql');
const config = require('../config/default');

// 数据库连接池
const pool = mysql.createPool({
  host: config.database.HOST,
  database: config.database.DATABASE,
  user: config.database.USERNAME,
  password: config.database.PASSWORD
})

module.exports = {
  // 查询数据库
  query: function(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          console.log('===============连接报错了===============');
          resolve(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              console.log('=========查询报错了=========');
              console.log(err);
              reject(err)
            } else {
              console.log(rows);
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }
}