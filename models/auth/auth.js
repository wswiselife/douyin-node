import db from '../../db/mysql.js'

// 建表
const userTable = `
    create table if not exists auth(
        id int primary key auto_increment,
        password varchar(255) not null ,
        account varchar(255) not null unique,
        create_time timestamp default current_timestamp
    )
`

db.query(userTable,(err,results,fields)=>{
    if(err){
        console.log('err message',err);
    }
})


const findManyModel = (account)=>{
    // const sql = xxx
    // 这里的数据需要使用字符串
    return new Promise((resolve,reject)=>{
        db.query(`select * from auth where account = ?`,account,(error,result,fields)=>{
            if(error){
                reject(error)
            }else{
                // console.log('result',fields)
                resolve([result,fields])
            }
        })
    })
}

const createModel = (account,password)=>{
    return new Promise((resolve,reject)=>{
        db.query(`insert into auth (account,password) values(?,?)`,[`${account}` ,`${password}`],(error,result)=>{
            if(error){ 
                // 当需求是用户名唯一时，注册时要先查数据库，而不是直接抛异常
                // console.log('reject',reject);
                reject(error)
            }
            // callback()
            // console.log('results',result);
            resolve(result)
        })
    })
}

export default {
    findManyModel,
    createModel
}