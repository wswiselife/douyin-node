import videoInfoService from '../service/videoInfo.service.js'

const getVideo =async (request,response,next)=>{
    let user_id
    if(request.user?.user_id){
        let id = request.user.user_id
        user_id = id
    }else{
        // 默认用户
        user_id = 0
    }

    console.log(user_id)

    try{
          const result = await videoInfoService.getVideoInfo(user_id)
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