import db from '../db/mysql.js'

const collectionTable = `
    create table if not exists collection(
        collection_id int not null primary key auto_increment,
        video_id int not null,
        user_id int not null,
        create_time timestamp default current_timestamp,
        foreign key (user_id) references user(id),
        foreign key (video_id) references video(id)
    )
`

db.query(collectionTable,(error)=>{
    if(error){
        console.log('create collection table error',error)
    }
})

const createModel = ({video_id,user_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `insert into collection (video_id,user_id) values (?,?)`

        db.query(sql,[video_id,user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

const deleteCollectionModel =  ({video_id,user_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `delete from collection where video_id = ? and user_id = ?`

        db.query(sql,[video_id,user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

const getOneVideoCollectionCountModel = ({video_id})=>{
    return new Promise((resolve,reject)=>{
        const sql =`select user_id from collection where video_id = ?`

        db.query(sql,[video_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    createModel,
    deleteCollectionModel,
    getOneVideoCollectionCountModel
}