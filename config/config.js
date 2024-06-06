// jwt
const jwtSecret = 'SECRET'

// mysql
const mysql = {
    host:'localhost',
    // user:'root',
    // password:"admin",
    // 服务器
    user:"manager",
    password:"manager",
    database:"node_20240424"
}

// https 配置-20240606


export default {
    jwtSecret,
    mysql,
}