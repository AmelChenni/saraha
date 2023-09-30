import messageRouter from "./Messages/Messages.router.js";
import authRouter from "./Auth/Auth.router.js";
import userRouter from "./Users/User.router.js";
import connectDB from "../../DB/Connection.js";
import cors from 'cors';

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {
      res.status(204).end()
    }
    next();
  }

const initApp=(app,express) => {
    connectDB();
    app.use(cors())
    app.use(ignoreFavicon);
    app.use(express.json());
    app.use('/messages',messageRouter)
    app.use('/auth',authRouter)
    app.use('/user',userRouter)
    app.use('/*',(req,res)=>{
        return res.json({message :"page not found"})
    })
}

export default initApp;