import mongoose,{ Schema, model } from "mongoose";

const userSchema = new Schema({
    userName :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    gender :{
        type:String,
        default:'Male',
        enum:['Female','Male'],
    },age:{
        type:Number,
    }
  },{
    timestamps:true,
  });


  const userModel =mongoose.model.User || model('User',userSchema);//USer : table name

  export default userModel;