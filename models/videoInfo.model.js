import db from '../db/mysql.js'

const videoInfoTable = `
    create table if not exists video_info(
        id int not null primary key auto_increment,
        description varchar(255) not null,
        video_url varchar(255) not null,
        cover varchar(255) not null,
        video_id int not null,
        music int,
        like_count int,
        comment_count int ,
        collection_count int ,
        share_count int ,
        user_id int not null,
        suggest_words varchar(255) ,
        create_time timestamp default current_timestamp,
        foreign key (user_id) references user(id),
        foreign key (video_id) references video(id)
    )
`

db.query(videoInfoTable, (error) => {
    if (error) {
        console.log('create video table error', error)
    }
})

/**
 * 根据用户的id进行视频的推送，推送算法,但是查找还是按照视频id查找
 */
const findVideoById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('select * from video_info where id = ?', [id], (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        })
    })
}

const createVideoInfoModel = (video_id,description,user_id,video_url,cover_url)=>{
    return new Promise((resolve,reject)=>{
        const sql = `insert into video_info (video_id,description,user_id,video_url,cover) values (?,?,?,?,?)`
        // cover 处理成url-2024-05-31todo
        //music 待处理
        db.query(sql,[video_id,description,user_id,video_url,cover_url],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

/**
 * 实际为修改用户互动信息
 * @param like_count
 * @param comment_count
 * @param collection_count
 * @param video_id
 * @returns {Promise<unknown>}
 */
const updateEngagementModel = ({like_count,comment_count,collection_count,video_id})=>{
    return new Promise((resolve,reject)=>{
        const sql = `update video_info set like_count = ?,comment_count = ?,collection_count = ? where video_id = ?`
        db.query(sql,[like_count,comment_count,collection_count,video_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

const findUserVideoModel = (userId)=>{
    return new Promise((resolve,reject)=>{
        const sql = `SELECT id, video_id, cover, like_count FROM video_info WHERE user_id = ?`
        db.query(sql,[userId],(error,results)=>{
            if(error){
                reject(error)
            }
            resolve(results)
        })
    })
}


export default {
    findVideoById,
    createVideoInfoModel,
    updateEngagementModel,
    findUserVideoModel
}