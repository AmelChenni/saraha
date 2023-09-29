import userModel from '../../../../DB/User.model.js';
import MessageModel from '../../../../DB/Message.model.js';
export const getMessages =async(req,res)=>{
    const messagesList = await MessageModel.find({receiverId:req.user._id});
    return res.json({messages:"messages",messagesList})
}
export const sendMessages =async(req,res)=>{
    const {receiverId} = req.params;
    const {messages} =req.body;

    const user  = await userModel.findById(receiverId);
    if(!user) {
        return res.status(404).json({messages:"user not found"});
    }
    const createMessage = await MessageModel.create({messages,receiverId});
    
    return res.status(201).json({messages:"success"});
}