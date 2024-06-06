import db from '../db/mysql.js'

const videoLikeTable = `
    create table if not exists video_like(
        id int not null primary key auto_increment,
        video_id int not null,
        user_id int not null,
        create_time timestamp default current_timestamp,
        foreign key (video_id) references video(id),
        foreign key (user_id) references user(id)
    )
`

db.query(videoLikeTable,(error)=>{
    if(error) {
        console.log('create video like table error',error)
    }
})

const createModel = ({user_id,video_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `insert into video_like (user_id,video_id) values (?,?)`

        db.query(sql,[user_id,video_id],(error,result)=>{
            if(error){
                console.log(error)
                reject(error)
            }
            resolve(result)
        })
    })
}

const deleteModel = ({user_id,video_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `delete from video_like where user_id = ? and video_id = ?`

        db.query(sql,[user_id,video_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}
/**
 * 获取一个视频的喜欢数量（首页）
 * @param user_id
 * @param video_id
 * @returns {Promise<unknown>}
 */
const getOneVideoLikeCountModel = ({video_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `select * from video_like where video_id = ?`

        db.query(sql,[video_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}
/**
 * 获取我所有的点赞的视频的数量
 * @param user_id
 * @param video_id
 * @returns {Promise<unknown>}
 */
const getAllVideoLikeCountModel = ({user_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `select * from video_like where user_id`

        db.query(sql,[user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

/**
 * 获取用户是否点赞视频
 * @param user_id
 * @param video_id
 * @returns {Promise<unknown>}
 */
const getLikeStatusModel = (user_id,video_id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `select id from video_like where user_id = ? and video_id = ?`

        db.query(sql,[user_id,video_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    createModel,
    deleteModel,
    getAllVideoLikeCountModel,
    getOneVideoLikeCountModel,
    getLikeStatusModel
}