import videoUploadModel from '../models/videoUpload.model.js'
import videoInfoModel from '../models/videoInfo.model.js'

const uploadVideo = async({user_id,videoInfo,host,protocol,imageInfo})=>{

    // console.log('info',videoInfo[0])

    let originalname = videoInfo[0].originalname
    let mimetype = videoInfo[0].mimetype
    let filename = videoInfo[0].filename
    const {size} = videoInfo[0]

    // 视频链接的地址，可通过访问这个获取视频
    const video_url = `${protocol}://${host}/uploads/videos/${filename}`;

    const cover_url = `${protocol}://${host}/uploads/images/${imageInfo[0].filename}`;
    // console.log('image',imageInfo)

    // console.log('video_url',video_url)
    // 将信息存储到video表中，也要存储到video_info表中-2024-06-01todo
    // try{
        const result = await videoUploadModel.createModel({
            originalname,
            mimetype,
            filename,
            size,
            user_id,
            video_url,
            cover_url
        })

        // console.log('上传视频的id',result.insertId)

        if(result.affectedRows>0){
            // return {}
            // 因为创建描述信息的时候，需要知道video_id,固返回整个对象，至于返回的前端，在controller层进行处理

            // 把数据返回，包括视频连接-20240611
            return [result,video_url,cover_url]
        }
    // }
    // catch(error){
    //     // throw new Error(error)
    // }

}

const videoDescriptionService = async (user_id,description,video_id,video_url,cover_url)=>{


    // try{
        const result = await videoInfoModel.createVideoInfoModel(video_id,description,user_id,video_url,cover_url)

        if(result.affectedRows>0){
            return {}
        }
    // }
    // catch(error){
    //     throw new Error(error)
    // }
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