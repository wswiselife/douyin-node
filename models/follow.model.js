import db from '../db/mysql.js'

const followTable = `
    create table if not exists follow(
        id int not null primary key auto_increment,
        follower int not null,
        following int not null,
        create_time timestamp default current_timestamp,
        foreign key (follower) references user(id),
        foreign key (following) references user(id)
    )
`

db.query(followTable,(error)=>{
    if(error){
        console.log('follow table create error',error)
    }
})
/**
 * 关注别人
 * @param user_id 自己
 * @param follow_id 需要关注的人
 * @returns {Promise<unknown>}
 */
const createFollowModel = (user_id,follow_id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `insert into follow (follower,following) values (?,?)`
        db.query(sql,[follow_id,user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}
/**
 * 取消关注别人
 * @param user_id 自己
 * @param follow_id 取消关注的人
 * @returns {Promise<unknown>}
 */
const deleteFollowModel = (user_id,follow_id)=>{
    return new Promise((resolve,reject)=>{
        const statement = `delete from follow where follower = ? and following = ?`

        db.query(statement,[follow_id,user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

/**
 * 我关注的（博主）
 * @param user_id 我的user_id
 * @returns {Promise<unknown>}
 */
const getFollowerCountModel = (user_id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `select * from follow where following = ?`

        db.query(sql,[user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}
/**
 * 关注我的（粉丝）
 * @param user_id 我的user_id
 * @returns {Promise<unknown>}
 */
const getFollowingCountModel = (user_id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `select * from follow where follower = ?`

        db.query(sql,[user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

/**
 * 用户是否关注视频作者
 * @param user_id
 * @param follow_id
 * @returns {Promise<unknown>}
 */
const getFollowStatusModel = (user_id,follow_id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `select id from follow where follower = ? and following = ?`

        db.query(sql,[follow_id,user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    createFollowModel,
    deleteFollowModel,
    getFollowerCountModel,
    getFollowingCountModel,
    getFollowStatusModel
}