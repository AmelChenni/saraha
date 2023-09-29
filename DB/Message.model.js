import mongoose, { Schema, model,Types } from "mongoose";

const MessageSchema = new Schema({
    messages :{
        type:String,
        required:true,
    },
    receiverId :{
        type : Types.ObjectId,
        ref:'User',
        required:true,

    }
  },{
    timestamps:true,
  });


  const MessageModel =mongoose.model.Message || model('Message',MessageSchema);//USer : table name

  export default MessageModel;