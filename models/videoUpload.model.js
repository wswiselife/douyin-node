import db from "../db/mysql.js";

const videoTable = `
    create table if not exists video(
        id int not null auto_increment primary key,
        originalname varchar(255) not null,
        mimetype varchar(255) not null,
        filename varchar(255) not null,
        size int(11) not null,
        auth_id int(11) not null,
        foreign key (auth_id) references auth(id)
    )

`

db.query(videoTable,(error)=>{
    if(error){
        console.log('create file table error',error)
    }
})

const createModel = ({originalname, mimetype, filename, size, user_id})=>{
    return new Promise((resolve,reject)=>{
        db.query('insert into video (originalname,mimetype,filename,size,auth_id) values (?,?,?,?,?)',
            [originalname,mimetype,filename,size,user_id],
            (error,result)=>{
                if(error){
                    reject(error)
                }
                resolve(result)
            })
    })
}

const findOneModel = ({id})=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from video where id = ?',id,(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    createModel,
    findOneModel
}