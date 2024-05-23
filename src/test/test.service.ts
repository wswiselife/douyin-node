// import conn from '../app/database/mysql'

/**
 * 处理逻辑
 */

export const testService =async ()=>{

    // sql语句
    const statement = `
        select
            post.id,
            post.title
        from post
    `

    const [data] = await conn.promise().query(statement)

    return data
}

/**
 * 创建内容
 */
export const createPost = ()=>{
    
}


export default {
    testService
}