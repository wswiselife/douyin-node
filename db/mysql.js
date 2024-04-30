// 引入 mysql 模块
import mysql from 'mysql'
import config from '../config/config.js';

// 创建连接配置
const db = mysql.createConnection({
    host: config.mysql.host,      // 数据库主机名
    user: config.mysql.user,           // 数据库用户名
    password: config.mysql.password,       // 数据库密码
    // 新项目不存在时
    database: config.mysql.database // 数据库名称
});

// 连接到数据库
db.connect((err) => {

    // 创建新的数据库-20240425-为什么不能创建后才应用数据库
    const databaseName = 'node_20240424'
    const sql = `create database if not exists ${databaseName}`
    db.query(sql,(error,results, fields)=>{
        if (error) {
            console.error('Error creating database:', error);
            return;
        }
        // console.log(`Database "${databaseName}" created or already exists`);
        // 选择新建的数据库
        db.changeUser({database:databaseName},(err)=>{
            if(err){
                console.error('Error selecting database:', err);
                return;
            }
        })
    })
    if (err) {
        console.error('连接数据库失败', err);
        return;
    }
    // console.log('成功连接到数据库');
});



// 执行查询
// db.query('SELECT * FROM test_table', (err, results, fields) => {
//     if (err) {
//         console.error('Error executing query:', err);
//         return;
//     }
//     console.log('Query results:', results);
// });

// 关闭连接
// db.end((err) => {
//     if (err) {
//         console.error('Error closing connection:', err);
//         return;
//     }
//     console.log('Connection closed');
// });

export default db