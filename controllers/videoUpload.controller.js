import {uploadVideo,findVideoById} from '../service/videoUpload.service.js'
import path from 'path';

export const store = async (request,response,next) => {
    // 当前用户
    const {user_id} = request.user

    // console.log('info',request.file)

    const info = request.file

    // //文件信息
    // const videoInfo = (request.file,[
    //     'originalname',
    //     "mimetype",
    //     'filename',
    //     'size'
    // ])

    // 将数据存储
    const data = await uploadVideo({
        user_id,
        info
    })

    // console.log(request.file);
    response.send({
        code: 200,
        message: data,
    });
};

export const getOneVideo =async(request,response)=>{

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

