import videoInfoService from '../service/videoInfo.service.js'

const getVideo =async (request,response)=>{

    const {user_id} = request.user

    let defaultId = user_id
    //没有登录时，默认用户-todo代办
    if(!defaultId) {
        defaultId = 1
    }

    const data = await videoInfoService.getVideoInfo(defaultId)

    response.send({
        code:200,
        message:data
    })
}

export default {
    getVideo
}