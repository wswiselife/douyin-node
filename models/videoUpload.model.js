import db from "../db/mysql.js";

const videoTable = `
    create table if not exists video(
        id int not null auto_increment primary key,
        originalname varchar(255) not null,
        mimetype varchar(255) not null,
        filename varchar(255) not null,
        size int(11) not null,
        user_id int(11) not null,
        video_url varchar(255) not null,
        cover_url varchar(255) not null,
        create_time timestamp default current_timestamp,
        foreign key (user_id) references user(id)
    )
`

db.query(videoTable,(error)=>{
    if(error){
        console.log('create file table error',error)
    }
})

const createModel = ({originalname, mimetype, filename, size, user_id,video_url,cover_url})=>{
    return new Promise((resolve,reject)=>{
        db.query('insert into video (originalname,mimetype,filename,size,user_id,video_url,cover_url) values (?,?,?,?,?,?,?)',
            [originalname,mimetype,filename,size,user_id,video_url,cover_url],
            (error,result)=>{
                if(error){
                    reject(error)
                }
                resolve(result)
            })
    })
}

const findOneModel = (id)=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from video where id = ?',id,(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// 根据用户id获取作品数量
const getVideoUploadCountModel = ({user_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `select video_url,id from video where user_id = ?`
        db.query(sql,[user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    createModel,
    findOneModel,
    getVideoUploadCountModel
}