import db from '../db/mysql.js'

const commentTable = `
    create table if not exists comment(
        comment_id int not null primary key auto_increment,
        video_id int not null,
        user_id int not null,
        parent_id int,
        content varchar(255) not null,
        location varchar(100),
        status int,
        create_time timestamp default current_timestamp,
        foreign key (video_id) references video(id),
        foreign key (user_id) references user(id)
    )
`

db.query(commentTable,(error)=>{
    if(error){
        console.log('create comment table error',error)
    }
})

const findMany = ({video_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `select * from comment where video_id = ?`
        db.query(sql,[video_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

const create = ({video_id,user_id,parent_id = null,location = '未知' ,status = 1,content})=>{
    return new Promise((resolve,reject)=>{
        const sql = `insert into comment (video_id, user_id, parent_id, content, location, status) values (?, ?, ?, ?, ?, ?)`
        db.query(sql,[video_id,user_id,parent_id,content,location,status],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

const deleteModel = ({comment_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `delete from comment where comment_id = ?`
        db.query(sql,[comment_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    create,
    findMany,
    deleteModel
}