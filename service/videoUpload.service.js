import videoUploadModel from '../models/videoUpload.model.js'
import videoInfoModel from '../models/videoInfo.model.js'

const uploadVideo = async({user_id,info,host,protocol})=>{

    let originalname = info.originalname
    let mimetype = info.mimetype
    let filename = info.filename
    const {size} = info

    // 视频链接的地址，可通过访问这个获取视频
    const video_url = `${protocol}://${host}/uploads/${filename}`;

    // console.log('video_url',video_url)
    // 将信息存储到video表中，也要存储到video_info表中-2024-06-01todo
    try{
        const result = await videoUploadModel.createModel({
            originalname,
            mimetype,
            filename,
            size,
            user_id,
            video_url
        })

        // console.log('上传视频的id',result.insertId)

        if(result.affectedRows>0){
            // return {}
            // 因为创建描述信息的时候，需要知道video_id,固返回整个对象，至于返回的前端，在controller层进行处理

            return result.insertId
        }
    }
    catch(error){
        throw new Error(error)
    }

}

const videoDescriptionService = async ({user_id,description,cover,video_id})=>{


    try{
        const result = await videoInfoModel.createVideoInfoModel({video_id,user_id,cover,description})

        if(result.affectedRows>0){
            return {}
        }
    }
    catch(error){
        throw new Error(error)
    }
}

/**
 * 跟据视频id查找视频
 */
const findVideoById = async(id)=>{
    // sql
    const data = await videoUploadModel.findOneModel({id})

    // console.log('data-service',data)

    return data
}

export default {
    uploadVideo,
    findVideoById,
    videoDescriptionService
}