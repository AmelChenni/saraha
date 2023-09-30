import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import initApp from './Src/Modules/app.router.js';
// import sendEmail from './Src/Services/SendEmail.js';

const app = express()
const PORT = process.env.PORT || 3000;

initApp(app,express)
// sendEmail();
app.get('/',(req, res) => {
    return res.json({success});
})
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})