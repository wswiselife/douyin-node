import db from '../db/mysql.js'

const videoInfoTable = `
    create table if not exists video_info(
        id int not null primary key auto_increment,
        description varchar(255) not null,
        video_id int not null,
        music int,
        digg_count int not null,
        comment_count int not null,
        collect_count int not null,
        share_count int not null,
        auth_id int not null,
        suggest_words varchar(255) not null,
        create_time timestamp default current_timestamp,
        foreign key (auth_id) references auth(id),
        foreign key (video_id) references video(id)
    )
`

db.query(videoInfoTable,(error)=>{
    if(error){
        console.log('create videotable error',error)
    }
})

/**
 * 根据用户的id进行视频的推送，推送算法,但是查找还是按照视频id查找
 */
const findVideoById = (id)=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from video_info where id = ?',[id],(error,result) =>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    findVideoById
}