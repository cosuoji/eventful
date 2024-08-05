import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text, image, filepath) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: subject,
            text: text,
            attachments:[{
                filename: image, 
                path: filepath
            }]
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};


export const sendEmailWithoutAttachment = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

