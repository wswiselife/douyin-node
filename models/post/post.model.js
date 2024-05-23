// import db from "../../db/mysql.js";

// // 处理文章表为主表，用户（作者）表作为从表
// const postTable = `
//     create table if not exists post(
//         id int not null primary key auto_increment,
//         author_id int not null,
//         title varchar(255) not null,
//         content varchar(255) not null, 
//         create_time timestamp default current_timestamp,
//         foreign key (author_id) references auth(id)
//     )
// `

// db.query(postTable,(err,result,fields)=>{
//     if(err){
//         console.log('create post table error',err)
//     }
// })

// const findManyModel = (id)=>{
//     return new Promise((resolve,reject)=>{
//         db.query('select * from post where author_id=?',id,(error,result,fields)=>{
//             if(error){
//                 reject(error)
//             }
//             resolve([result,fields])
//         })
//     })
// }

// const createModel = (author_id,title,content)=>{
//    return new Promise((resolve,reject)=>{
//         db.query('insert into post (author_id,title,content) values(?,?,?)',[`${author_id}`,`${title}`,content],(err,result)=>{
//             if(err){
//                 reject(err)
//             }
//             resolve(result)
//         })
//    })
// }

// export default {
//     findManyModel,
//     createModel
// }