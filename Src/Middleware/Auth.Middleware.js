import jwt from 'jsonwebtoken';
import userModel from '../../DB/User.model.js';
export const auth = async(req,res,next)=>{
    try{
    const {authorization} =req.headers;


    if(!authorization?.startsWith(process.env.BEARARKEY)){
        return res.json({message:"invalid authorization"})
    }
    const token = authorization.split(process.env.BEARARKEY)[1];
    if(!token){
        return res.json({messages:"data invalid"})
    }
    const decoded = jwt.verify(token,process.env.LOGINSIGNATURE)

    const authUser = await userModel.findById(decoded.id).select("userName email");
    if(!authUser){
        return res.json({message:"mot registering user"})
    }
    req.user= authUser;
    next();
}
catch(error){
    return res.json({message:"error registering user",error:error.stack})
}
}
 