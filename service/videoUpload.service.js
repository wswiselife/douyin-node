import videoUploadModel from '../models/videoUpload.model.js'

const uploadVideo = async({user_id,info})=>{
    console.log('user',user_id)
    console.log('info-service',info)
    let originalname = info.originalname
    let mimetype = info.mimetype
    let filename = info.filename
    const {size} = info

    const data = await videoUploadModel.createModel({
        originalname,
        mimetype,
        filename,
        size,
        user_id
    })

    return data
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

export {
    uploadVideo,
    findVideoById
}