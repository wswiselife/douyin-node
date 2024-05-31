import videoInfoService from '../service/videoInfo.service.js'

const getVideo =async (request,response,next)=>{

    const {user_id} = request.user

    let defaultId = user_id
    //没有登录时，默认用户-todo代办
    if(!defaultId) {
        defaultId = 1
    }
    try{
          const result = await videoInfoService.getVideoInfo(defaultId)
          if(result){
              response.send({
                  code:200,
                  data:result,
                  message:'获取视频成功'
              })
          }
    }
    catch(error) {
            next(error)
        }
    }

export default {
    getVideo
}