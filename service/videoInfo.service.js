import videoModel from '../models/videoInfo.model.js'

const getVideoInfo = async(user_id)=>{
    // 用户账号
    const auth_id = user_id

    const randomNum = Math.floor(Math.random() * 3) + 1;
    // 根据用户id推荐视频，用视频的id来查找视频，然后返回
    // 假定返回的id为1

    console.log(randomNum)

    const data = await videoModel.findVideoById(randomNum)

    return data
}

export default {
    getVideoInfo
}