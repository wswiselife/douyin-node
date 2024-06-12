import uploadService from '../service/videoUpload.service.js'
import path from 'path';

/**
 * 暂停使用-20240611注
 * @param request
 * @param response
 * @param next
 * @returns {Promise<void>}
 */
// const createVideoUploadController = async (request,response,next) => {
//     // 当前用户
//     const {user_id} = request.user
//
//     console.log('info',request.file)
//
//     const info = request.files
//
//     const host = request.get('host')
//
//     console.log(host)
//
//     // 用于视频的链接生成
//     const {protocol} = request
//
//     console.log('protocol')
//
//     // //文件信息
//     // const videoInfo = (request.file,[
//     //     'originalname',
//     //     "mimetype",
//     //     'filename',
//     //     'size'
//     // ])
//
//     try{
//         // 将数据存储
//         const result = await uploadService.uploadVideo({
//             protocol,
//             host,
//             info,
//             user_id
//
//         })
//
//
//         // console.log(request.file);
//         response.send({
//             code: 200,
//             data:result,
//             message:"上传成功"
//         });
//     }
//     catch(error){
//         next(error)
//     }
//
// };


// 这里即处理描述封面，又处理上传
const createVideoDescriptionController = async(request,response,next)=>{
    const {user_id} = request.user
    const {description} = request.body

    //20240611 这里的数据在files中，因为是多个，一个的话就在file中
    // const aa = request.files
    // 获取上传的视频文件和图片文件
    const videoFile = request.files ? request.files.video : null;
    const imageFile = request.files ? request.files.image : null;

    if (!videoFile || !imageFile) {
        return response.status(400).send('Both video and image files are required.');
    }

    // 上传视频链接参数
    const uploadInfo = {
        user_id,
        videoInfo: videoFile,
        imageInfo: imageFile,
        host:request.headers.host,
        protocol:request.protocol
    }


    try{
        // 先上传视频，把数据返回，再处理到视频信息中
        const videoUploadResult = await uploadService.uploadVideo(uploadInfo)
        // 返回的视频id
        const video_id = videoUploadResult[0].insertId
        const video_url = videoUploadResult[1]
        const cover_url = videoUploadResult[2]

        // 将视频的id对应的描述，视频链接，封面存到视频信息表中
        const videoDescriptionResult = await uploadService.videoDescriptionService(user_id,description,video_id,video_url,cover_url)

        console.log(videoDescriptionResult)
        if(videoDescriptionResult){
            response.status(200).send({
                code:200,
                data:videoDescriptionResult,
                message:"发布成功"
            })
        }
    }
    catch(error){
        // console.log('err',error)
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
    // createVideoUploadController,
    getOneVideo,
    createVideoDescriptionController
}

