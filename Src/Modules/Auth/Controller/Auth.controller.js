import userModel from "../../../../DB/User.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { signInSchema, signUpSchema } from "../Auth.Validation.js"
import sendEmail from "../../../Services/SendEmail.js"


export const signUp =async(req,res,next)=>{
   
    const{userName,email,password, gender}= req.body
    // check Email
    // userName = "aaa";
    const user = await userModel.findOne({ email});
    if(user){
        return res.status(409).json({message : "email already exists"})
    }
    // crypt passsword
    const hashedPassword = bcrypt.hashSync(password,parseInt(process.env.SALTROUND));

    // Creat User
    const creatUser = await userModel.create({
        userName,email,password:hashedPassword,gender
    });
    const token =jwt.sign({email},process.env.EMAILTOKEN,{expiresIn:'1h'})
    const refreshToken = jwt.sign({email},process.env.EMAILTOKEN,{expiresIn:'3h'});
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const refreshLink = `${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${refreshToken}`;
    const html = `<a href=${link}>verify email</a> or <a href=${refreshLink}>request new email to verify your email</a>`
    sendEmail(email,"confirm email",html)
    return res.status(201).json({messages:"success",user:creatUser._id})

}

// Signin User

export const signIn = async(req,res) => {
 
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    // check email and password
    if(!user){
        return res.status(404).json({messages:"data invalid"})
    }
    if(!user.confirmEmail){
        return res.status(400).json({messages:"plz confirm email"})
    }

    const match  =  bcrypt.compareSync(password,user.password);
    if(!match){
        return res.status(404).json({messages:"data invalid"});
    }

    // token 
    const token = jwt.sign({id:user._id},process.env.LOGINSIGNATURE,{expiresIn:'1h'})
    return res.status(200).json({messages:"success",token});

}

export const confirmEmail = async(req, res,next) => {
    const {token} = req.params;
    const decoded =jwt.verify(token,process.env.EMAILTOKEN);
    const user = await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true});
    if(!user){
        return res.status(404).json({messages:"your email is verified"});
    }
    // return res.json({messages:"your email is confirmed,plz login"});
    else{
        return res.redirect(process.env.FRONTEND_LOGIN)
    }

}
export const newConfirmEmail=async (req, res, next) => {
    const {refreshToken} = req.params;
    const decoded =jwt.verify(refreshToken,process.env.EMAILTOKEN);
    const token =jwt.sign({email:decoded.email},process.env.EMAILTOKEN,{expiresIn:'1h'})
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`;
    const html = `<a href=${link}>verify email</a>`
    sendEmail(decoded.email,"confirm email",html)
    return res.status(201).json({messages:"new email sent successfully"})
}