import videoInfoModel from '../models/videoInfo.model.js'
// 获取视频点赞数
import videoLikeModel from '../models/videoLike.model.js'
// 获取评论数
import commentModel from '../models/comment.model.js'
// 获取收藏数
import collectionModel from '../models/collection.model.js'
// 获取视频链接
import videoUpload from '../models/videoUpload.model.js'


const getVideoInfo = async({user_id})=>{
    // 用户账号

    const video_id = Math.floor(Math.random() * 13) + 1;
    // 根据用户id推荐视频，用视频的id来查找视频，然后返回
    // 假定返回的id为1

    console.log('返回视频id',video_id)
    // 根据视频的id，获取喜欢、评论、收藏的数量，添加到信息中

    const like_count_result = await videoLikeModel.getOneVideoLikeCountModel({user_id,video_id})
    const like_count = like_count_result.length

    const comment_count_result = await commentModel.findMany({video_id})
    const comment_count = comment_count_result.length

    const collection_count_result = await collectionModel.getOneVideoCollectionCountModel({video_id})
    const collection_count = collection_count_result.length

    // 将得到的互动信息更新到video表中
    const result = await videoInfoModel.updateEngagementModel({like_count,comment_count,collection_count,video_id})

    // 根据video_id查询到video表中的video_url,方便直接获取，而不是现在的加进去
    // 改进-todo-2024-06-01 video_info表中增加video_url字段
    const videoUrlResult = await videoUpload.findOneModel(video_id)

    // console.log('url',videoUrlResult[0].video_url)

     const video_url = videoUrlResult[0].video_url
    // 获取得到的最新数据
    const data = await videoInfoModel.findVideoById(video_id)

    const newData = {...data[0],video_url}


    return newData
}

export default {
    getVideoInfo
}