
import multer from "multer";
// 读取图片
import Jimp from 'jimp';
// 读取视频
import ffmpeg from 'fluent-ffmpeg';

/**
 * 创建
 */
const fileUpload = multer({
    // 设置文件存放的位置
    dest: "uploads/",
    // 也可以设置文件名
});

/**
 * 文件拦截器
 */
// single('前端表单字段名称必须相同')
export const fileInterceptor = fileUpload.single("file");

// 文件忽略.ignore

/**
 * 文件处理器
 */
export const fileProcessor = async (request,response,next)=>{
    // 这里的file也要保持一致
    const res = request.file

    // 读取图片
    // const a = await Jimp.read(res.path)
    // console.log('aa',a)

    //读取视频
    const mimeType = res.mimetype

    if(!mimeType.startsWith('video/')){
        console.log('error')
    }

    const videoPath = res.path

    // ffmpeg(videoPath).ffprobe((err,metadata)=>{
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log('video metadata',metadata)
    //
    //     next()
    // })

    //暂不处理
    next()


}