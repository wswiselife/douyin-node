import uploadService from '../service/videoUpload.service.js'
import path from 'path';

const createVideoUploadController = async (request,response,next) => {
    // 当前用户
    const {user_id} = request.user

    // console.log('info',request.file)

    const info = request.file

    const host = request.get('host')

    console.log(host)

    // 用于视频的链接生成
    const {protocol} = request

    console.log('protocol')

    // //文件信息
    // const videoInfo = (request.file,[
    //     'originalname',
    //     "mimetype",
    //     'filename',
    //     'size'
    // ])

    try{
        // 将数据存储
        const result = await uploadService.uploadVideo({
            protocol,
            host,
            info,
            user_id

        })


        // console.log(request.file);
        response.send({
            code: 200,
            data:result,
            message:"上传成功"
        });
    }
    catch(error){
        next(error)
    }

};

// 这里即处理描述封面，又处理上传
const createVideoDescriptionController = async(request,response,next)=>{
    const {user_id} = request.user
    const {description,cover} = request.body
    // 上传视频链接参数
    const uploadInfo = {
        user_id,
        info:request.file,
        host:request.headers.host,
        protocol:request.protocol
    }

    try{
        const videoUploadResult = await uploadService.uploadVideo(uploadInfo)
        const video_id = videoUploadResult

        const videoDescriptionResult = await uploadService.videoDescriptionService({user_id,description,cover,video_id})

        if(videoDescriptionResult){
            response.status(200).send({
                code:200,
                data:videoDescriptionResult,
                message:"发布成功"
            })
        }
    }
    catch(error){
        next(error)
    }

}

const getOneVideo =async(request,response)=>{

    const {id} = request.params

    console.log(id)

    const videos = await findVideoById(id)

    const video = videos[0]
    console.log(video.filename)

    const filePath = path.join('uploads',video.filename)

    // 返回文件

    response.setHeader('Content-Type', video.mimetype);// 设置响应头
    response.attachment(video.originalname); // 设置文件名
    response.sendFile(filePath,{root:'.'})

}

export default {
    createVideoUploadController,
    getOneVideo,
    createVideoDescriptionController
}

