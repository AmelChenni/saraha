import express from 'express';
import * as userController from "./Controller/User.controller.js"
import {auth} from '../../Middleware/Auth.Middleware.js'
const app = express();


app.get('/',auth, userController.profile);
// app.post('/signIn', authController.signIn);



export default app;