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
          resolve(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }
}