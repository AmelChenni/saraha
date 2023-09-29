import { createTransport } from "nodemailer";

async function sendEmail(to,subject,html){
const transporter = createTransport({
service:'gmail',
  auth: {
    user: process.env.SENDEMAIL,
    pass: process.env.SENDPASSWORD,
  },
});


  const info = await transporter.sendMail({
    from: `'Amel chenni 👻" <${process.env.SENDEMAIL}>`, // sender address
    to,
    subject,
    html,
  });
}
 export default sendEmail;