import messageRouter from "./Messages/Messages.router.js";
import authRouter from "./Auth/Auth.router.js";
import userRouter from "./Users/User.router.js";
import connectDB from "../../DB/Connection.js";
import cors from 'cors';



const initApp=(app,express) => {
    connectDB();
    app.use(cors())
    app.use(express.json());
    app.use('/messages',messageRouter)
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.get('/',(req, res) => {
        return res.json({message:"welcome mesage"})
    })
    app.use('/*',(req,res)=>{
        return res.json({message :"page not found"})
    })
}

export default initApp;