import express from 'express';
import * as authController from "./Controller/Auth.controller.js"
import { asyncHandler } from '../../Middleware/erroeHandling.js';
import validation from '../../Middleware/Validation.js';
import { signInSchema, signUpSchema } from './Auth.Validation.js';
const app = express();


app.post('/signUp',validation(signUpSchema),asyncHandler(authController.signUp));
app.post('/signIn',validation(signInSchema),asyncHandler(authController.signIn));
app.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));
app.get('/newConfirmEmail/:refreshToken',asyncHandler(authController.newConfirmEmail));



export default app;