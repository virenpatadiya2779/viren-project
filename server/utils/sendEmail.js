import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const sendEmail = async (email, subject, data) => {
    try {
        

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            // text: text,
            html: data
        });
        console.log("Email sent Successful")
    } catch(error) {
        console.log("Email not sent");
        console.log(error);
    }
}

export default sendEmail