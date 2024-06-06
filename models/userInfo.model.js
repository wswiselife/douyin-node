import db from "../db/mysql.js";


//   foreign key (auth_id) references auth(id) 建表时好像不用这个
const userTable = `
    create table if not exists user(
        id int not null primary key auto_increment,
        auth_id int not null,
        avatar varchar(255) ,
        nickname varchar(255) ,
        signature varchar(255) ,
        gender int ,
        birthday varchar(255),
        country varchar(100) ,
        province varchar(100) ,
        city varchar(100) ,
        school varchar(255) ,
        unique_id varchar(255) ,
        cover_url varchar(255) ,
        ip_location varchar(255) ,
        aweme_count int,
        friends int,
        following_count int,
        follower_count int,
        favoriting_count int,
        foreign key (auth_id) references auth(id)
    )

`

db.query(userTable,(err,result,fields)=>{
    if(err){
        console.log('create post table error',err)
    }
})

const createModel = (id)=>{
    return new Promise((resolve,reject)=>{
        db.query('insert into user (auth_id) values (?)',id,(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

// const updateModel = ({avatar,nickname,signature,gender,birthday,country,
//             province,city,school,unique_id,cover_url,ip_location},user_id)=>{
//     return new Promise((resolve,reject)=>{
//         const sql = `update user set avatar = '${avatar}',nickname = '${nickname}',signature = '${signature}',gender = ${gender},
//                     birthday = '${birthday}',country = '${country}',province = '${province}',city = '${city}',school = '${school}',
//                     unique_id = '${unique_id}',cover_url = '${cover_url}',ip_location = '${ip_location}' where auth_id = ${user_id}`
//         db.query(sql,(error,result)=>{
//                 if(error){
//                     reject(error)
//                 }
//                 resolve(result)
//
//             })
//     })
// }

const updateModel = (userData, user_id) => {
    return new Promise((resolve, reject) => {
        let sql = "UPDATE user SET ";
        let updates = [];

        // 构建更新语句
        for (const key in userData) {
            if (userData.hasOwnProperty(key) && userData[key] !== undefined) {
                switch (key) {
                    case 'avatar':
                    case 'nickname':
                    case 'signature':
                    case 'gender':
                    case 'birthday':
                    case 'country':
                    case 'province':
                    case 'city':
                    case 'school':
                    case 'unique_id':
                    case 'cover_url':
                    case 'aweme_count':
                    case 'ip_location':
                    case 'friends':
                    case 'follower_count':
                    case 'following_count':
                        updates.push(`${key} = '${userData[key]}'`);
                        break;
                    default:
                        // 忽略不支持更新的属性
                        break;
                }
            }
        }

        if (updates.length === 0) {
            reject(new Error("No fields provided to update"));
            return;
        }

        sql += updates.join(", ") + ` WHERE auth_id = ${user_id}`;
        db.query(sql, (error, result) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};



const findManyModel = (user_id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `select * from user where auth_id = ${user_id}`
        db.query(sql,(error,result,filed)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

/**
 * 这里可以处理成一个更新接口的数据
 * @param totalLikesCount
 * @param user_id
 * @returns {Promise<unknown>}
 */
const updateFavoritingCountModel = (totalLikesCount,user_id)=>{
    return new Promise((resolve, reject) => {
        const sql = `update user set favoriting_count = ? where id = ?`
        db.query(sql,[totalLikesCount,user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

const getUserInfoByUserId = (user_id)=>{
    return new Promise((resolve,reject)=>{
        const sql = `select * from user where id = ?`
        db.query(sql,[user_id],(error,result)=>{
            if(error){
                reject(error)
            }
            resolve(result)
        })
    })
}

export default {
    updateModel,
    findManyModel,
    createModel,
    updateFavoritingCountModel,
    getUserInfoByUserId
}