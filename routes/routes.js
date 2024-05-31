import auth from './auth.js'
import post from './post.routes.js'
import user from './userInfo.router.js'
import videoUpload from './videoUpload.router.js'
import videoInfo from './videoInfo.router.js'
import comment from './comment.router.js'
import videoLike from './videoLike.router.js'
import follow from './follow.router.js'
import collection from './collection.router.js'

// 这里的导出的作用？-20240424
export default (app) =>{
    app.use('/v0/auth',auth)
    app.use('/v0/post',post)

    // me 页面用户信息【20240511】
    app.use('/v1/user',user)
    // 文件上传【20240522】
    app.use('/v1/upload',videoUpload)
    // 获取视频信息
    app.use('/v1/video',videoInfo)
    // 评论2024-05-29
    app.use('/v1/comment',comment)
    // 喜欢2024-05-29
    app.use('/v1/like',videoLike)
    // 关注2024-05-30
    app.use('/v1/follow',follow)
    // 收藏2024-05-30
    app.use('/v1/collection',collection)
}

// export default auth