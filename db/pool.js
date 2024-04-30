// const mysql = require('mysql');
import mysql from 'mysql'
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'test_schema'
});

// 从连接池中获取连接，并执行查询
pool.query('SELECT * FROM test_table', (err, results, fields) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Query results:', results);

    // 在查询完成后关闭连接池
    pool.end((err) => {
        if (err) {
            console.error('Error closing pool:', err);
            return;
        }
        console.log('Pool closed');
    });
});
