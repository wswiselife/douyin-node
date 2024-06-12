import userInfoModel from '../models/userInfo.model.js'
import videoUploadModel from '../models/videoUpload.model.js'
// 放弃使用视频的信息接口处理获赞数量--2024-06-10处理我的作品
import videoInfoModel from '../models/videoInfo.model.js'
import followModel from '../models/follow.model.js'
import videoLikeModel from '../models/videoLike.model.js'

/**
 * 更新我的个人信息
 * @param userData
 * @param user_id
 * @returns {Promise<{}>}
 */
const updateUserInfoService = async(userData,user_id)=>{

    try{
        const result = await userInfoModel.updateModel(userData,user_id)

        if(result.affectedRows>0){
            return {}
        }
    }
    catch(error){
        throw new Error(error)
    }
}

/**
 * 获取我的个人信息
 * @param user_id
 * @returns {Promise<unknown>}
 */
const getUserInfoService = async(user_id)=>{
    try{
        /**
         * 【增加练习】作品数量【aweme_count】-收藏数-喜欢数-todo-2024-05-31
         * @type {unknown}
         */
        const aweme_count_result = await videoUploadModel.getVideoUploadCountModel({user_id})
        // console.log('作品数量',aweme_count_result)
        let allAweme = aweme_count_result.map(item =>item.id)
        // 统一处理单个字段修改
        // 修改：后续和粉丝数，关注数一起处理
        // const userData = {
        //     aweme_count:allAweme.length
        // }
        // const awemeResult = await userInfoModel.updateModel(userData,user_id)

        // console.log(awemeResult)
        // 总点赞数
        let totalLikesCount = 0

        // 遍历每一个作品，获取每个作品的点赞数
        // 可以从video_info表获取数量，然后相加，但是这个表获取不到具体的信息，所以需要从video_like表中获取
        /**
         * 所有视频的点赞数总和【favoriting_count】
         */
        for(let video_id of allAweme){
            // 根据视频id获取点赞数量
            // 这里存在bug，因为当没有更新获取的视频的时候，点赞不会记录到video_info表中，所以应该直接从喜欢表中获取
            const result = await videoLikeModel.getOneVideoLikeCountModel({video_id})
            // const result = await videoInfoModel.findVideoById(video_id)
            // console.log(result)
            // console.log(result.length)
            // totalLikesCount += result[0].like_count
            totalLikesCount += result.length
        }

        // 修改我的个人信息中的总点赞数量信息
        const favoritingResult = await userInfoModel.updateFavoritingCountModel(totalLikesCount,user_id)
        // console.log(favoritingResult)

        /**
         * 【关注数-follower_count】
         * @type {unknown}
         */
        const followerResult = await followModel.getFollowerCountModel(user_id)
        const followingResult = await followModel.getFollowingCountModel(user_id)

        // console.log(followerResult.length)
        // console.log(followingResult.length)

        // const follower_count = followerResult.length
        // const following_count = followingResult.length

        // 将用户信息处理到信息表中
        const userData = {
            aweme_count:allAweme.length,
            follower_count:followerResult.length,
            following_count:followingResult.length
        }

        // console.log(userData)

        //更新信息
        // 将用户信息处理到信息表中
        const userInfoResult = await userInfoModel.updateModel(userData,user_id)

        // console.log(userInfoResult)

        // 将处理好的用户信息查询出来
        const result = await userInfoModel.findManyModel(user_id)
        if(result){
            return result
        }
    }
    catch(error){
        throw new Error(error)
    }
}


/**
 * 获取我的所有作品的封面和播放地址（tab栏）
 * @param user_id
 * @returns {Promise<void>}
 */
const getMyVideoService = async(user_id)=>{

    try{
        const result = await videoInfoModel.findUserVideoModel(user_id)
        if(result){
            return result
        }
    }
    catch(error){
        throw new Error(error)
    }
}
/**
 * 获取我收藏的所有视频的封面和地址
 * @param user_id
 * @returns {Promise<void>}
 */
const getMyCollectionInfoService = async (user_id)=>{

}
/**
 * 获取我喜欢的所有视频的封面和地址
 * @param user_id
 * @returns {Promise<void>}
 */
const getMyLikeInfoService = async(user_id)=>{

}

export default {
    updateUserInfoService,
    getUserInfoService,
    getMyVideoService
}