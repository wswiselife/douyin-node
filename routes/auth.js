import express from 'express'
import AuthController from '../controllers/auth/auth.js'
import authValidate from '../validates/auth.js'
import errorHandler from '../error/error.js'

const router = express.Router()

// router.get('/',(req,res,next)=>{
//     res.json({
//         code:200,
//         data:'success'
//     })
// })

// router.post('/login',(req,res,next)=>{
//     // data params query body
//     console.log('req',req.body);
//     let {account,password} = req.body
//     res.json({
//         code:200,
//         data:{
//             account,
//             password
//         }
//     })
// })

router.post('/login',authValidate,AuthController.loginController,errorHandler)
router.post('/register',AuthController.registerController)

export default router
