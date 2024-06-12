
import multer from "multer";
// 读取图片
import Jimp from 'jimp';
// 读取视频
import ffmpeg from 'fluent-ffmpeg';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const mimeType = file.mimetype

        // console.log(mimeType)

        if (mimeType.startsWith('image/')) {
            cb(null, 'uploads/images/');
        } else if (mimeType.startsWith('video/')) {
            cb(null, 'uploads/videos/');
        } else {
            cb({ message: 'Unsupported file type' }, false);
        }
    }
})

/**
 * 创建
 */
const fileUpload = multer({
    // 设置文件存放的位置
    // dest: "uploads/",
    // 也可以设置文件名
    storage:storage
});

/**
 * 文件拦截器
 */
// single('前端表单字段名称必须相同')
export const fileInterceptor = fileUpload.fields([
    {name:'image',maxCount:1},
    {name:'video',maxCount:1}
])

// 文件忽略.ignore

/**
 * 文件处理器
 */
export const fileProcessor = async (request,response,next)=>{
    // 这里的file也要保持一致
    //
    const files = request.files

    if (!files) {
        return response.status(400).send('No files uploaded.');
    }

    // 2024-06-11 这里处理了两个next，会报错 Cannot set headers after they are sent to the client
    const imageFile = files.image ? files.image[0] : null;
    const videoFile = files.video ? files.video[0] : null;

    // 2024-06-11 这里处理了两个next，会报错 Cannot set headers after they are sent to the client
    // if (imageFile) {
    //     processImage(imageFile, request, response, next);
    // }
    // if(videoFile) {
    //     processVideo(videoFile, request, response, next);
    // }


    // 读取图片
    // const a = await Jimp.read(res.path)
    // console.log('aa',a)

    //读取视频
    // const mimeType = res.mimetype
    //
    // if(!mimeType.startsWith('video/')){
    //     console.log('error')
    // }
    //
    // const videoPath = res.path

    // ffmpeg(videoPath).ffprobe((err,metadata)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log('video metadata',metadata)
    //
    //     next()
    // })

    //暂不处理
    // 2024-06-11 这里处理了两个next，会报错 Cannot set headers after they are sent to the client
    next()

}

// 视频处理器
export const processVideo = (file, req, res, next) =>{
    // console.log('video file',file)
    next()
}

// 图片处理器
export const processImage = (file, req, res, next) =>{
    // console.log('image file',file)
    next()
}
