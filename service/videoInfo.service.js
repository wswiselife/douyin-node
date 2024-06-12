import videoInfoModel from '../models/videoInfo.model.js'
// 获取视频点赞数
import videoLikeModel from '../models/videoLike.model.js'
// 获取评论数
import commentModel from '../models/comment.model.js'
// 获取收藏数
import collectionModel from '../models/collection.model.js'
// 获取视频链接
import videoUpload from '../models/videoUpload.model.js'
// 获取关注状态
import followModel from '../models/follow.model.js'
// 获取用户名
import userInfoModel from '../models/userInfo.model.js'

const getVideoInfo = async(user_id,videoId)=>{
    let generatedNumbers = []; // 用来存储已经生成的随机数

    function getUniqueRandomNumber() {
        if (generatedNumbers.length >= 20) {
            console.log("All numbers have been generated.");
            return null; // 所有数字都已生成，返回null表示没有更多的数字
        }

        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 20) + 1;
        } while (generatedNumbers.includes(randomNumber));

        generatedNumbers.push(randomNumber);
        return randomNumber;
    }

    let video_id
    if(videoId == 0){
        // 用户账号
        video_id = getUniqueRandomNumber();
        // 根据用户id推荐视频，用视频的id来查找视频，然后返回
        // 假定返回的id为1
    }else{
        video_id = videoId
    }

    console.log('返回视频id(22行)',video_id)
    // 根据视频的id，获取喜欢、评论、收藏的数量，添加到信息中

    // 获取视频喜欢数
    const like_count_result = await videoLikeModel.getOneVideoLikeCountModel({video_id})
    const like_count = like_count_result.length

    // 获取视频评论数
    const comment_count_result = await commentModel.findMany({video_id})
    const comment_count = comment_count_result.length

    // 获取视频收藏数
    const collection_count_result = await collectionModel.getOneVideoCollectionCountModel({video_id})
    const collection_count = collection_count_result.length

    // 将得到的互动信息更新到video表中
    const result = await videoInfoModel.updateEngagementModel({like_count,comment_count,collection_count,video_id})

    // 根据video_id查询到video表中的video_url,方便直接获取，而不是现在的加进去
    // 改进-todo-2024-06-01 video_info表中增加video_url字段
    const videoUrlResult = await videoUpload.findOneModel(video_id)
    // console.log('url',videoUrlResult[0].video_url
     const video_url = videoUrlResult[0].video_url

    // 获取得到的最新数据
    const data = await videoInfoModel.findVideoById(video_id)

    // 将已知数据处理
    // console.log('视频数据',data)

    // 获取视频作者
    const auth_id = data[0].user_id
    // 获取视频对于个人的作者关注状态，视频点赞状态，收藏状态-2024-06-02，而不是直接给新增和删除接口让前端处理（根据视频id查状态，然后改变）
    // 获取视频作者id【得到视频的数据再获取，不用重复根据视频id查，这会多写一个请求，因为信息表中用作者信息】
    const followStatusResult =await followModel.getFollowStatusModel(user_id,auth_id)
    let followStatus = 0
    if(followStatusResult.length == 1){
        // 长度为1，说明已经关注作者，将状态设置为1
         followStatus = 1
    }

    // 获取视频喜欢状态
    const likeStatusResult = await videoLikeModel.getLikeStatusModel(user_id,video_id)
    let likeStatus = 0
    if(likeStatusResult.length == 1){
        likeStatus = 1
    }

    // 获取收藏状态、
    const collectionStatusResult = await collectionModel.getCollectionStatusModel(user_id,video_id)
    let collectionStatus = 0
    if(collectionStatusResult.length ==1){
        collectionStatus = 1
    }

    // 获取作品作者名称，根据作者id返回作者名称
    // console.log('视频作者id',auth_id)
    const userResult = await userInfoModel.getUserInfoByUserId(auth_id)
    let nickname = userResult[0].nickname
    let avatar = userResult[0].avatar
    let videoAuthId = userResult[0].id
    // console.log(userResult[0].nickname)

    const newData = {...data[0],video_url,followStatus,likeStatus,collectionStatus,nickname,avatar,videoAuthId}

    return newData
}

export default {
    getVideoInfo
}