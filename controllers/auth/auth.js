// import db from '../../db/mysql.js'
import AuthModel from '../../models/auth/auth.js'
import userModel from '../../models/userInfo.model.js';
import errorHandler from '../../error/error.js';
import jwt from '../../utils/jwt.js';


const loginController = async(req,res,next)=>{
    // 从请求体中获取账号和密码
    const { account, password } = req.body;
    try {
        const [result,fields] = await AuthModel.findManyModel(account)
        // next(new Error(response))

        if(result.length >0){
            // 用户存在，判断密码是否正确
            // console.log('result[0]',result[0].password);
            // 处理token的数据
            const tokenPayload = {
                user_id : result[0].id,
                account: result[0].account
            }
            if(result[0].password == password){
                // 生成token
                const token  = jwt.generateToken(tokenPayload)
                // console.log('token',token);
                res.status(200).json({
                    code: 200,
                    message:'',
                    data: {
                        token  // 这里应该是根据用户信息生成的 token
                    }
                });
            }else{
                res.status(400).send({
                    code:400,
                    message:'用户密码错误。'
                })
            }

        }else{
            // 用户不存在
            res.status(400).send({
                code:400,
                messsage:'用户不存在，请先注册。'
            })
        }
    } catch (error) {
        console.log('error',error.message);
        next(new Error(error))
    }
    // option1 不存在账号 []
    // option2 存在账号 成功返回

    // 参数校验
    // 统一错误处理
    // 统一结果返回

}

const registerController = async(req,res,next)=>{
    const {account,password} = req.body
    
    const [result,fields] = await AuthModel.findManyModel(account)

    // errorHandler('Register Error',400)
    // throw new Error('register error',400)
    // 判断是否已存在账号
    if(result.length == 0){
        // 正式插入
        const result = await AuthModel.createModel(account,password)
        // 注册成功，则自动生成用户的信息
        if(result.affectedRows > 0){

            // 自动生成一条信息，对应me的页面
            const response = await userModel.createModel(result.insertId)

            if(response.affectedRows >0){
                res.status(200).json({
                    code: 200,
                    data: {
                        message: '注册成功！。',
                    }
                });
            }
            
        }else{
            res.status(500).send({
                code:500,
                message:"服务器开小差啦！"
            })
        }
        
    }else{
        // console.log('账号已存在。');
        res.status(400).json({
            code:400,
            message:"账号已存在。",
        })
    }
    
}


export default {
    loginController,
    registerController
}