import nodemailer from "nodemailer"; //nodemailer
import 'dotenv/config';
import path from "path";
import { json } from "express";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.CLIENT_ID_MAIL,
    pass: process.env.CLIENT_ID_SECRET,
  },
});

export default function Mail(req) {
    const info = {
      from: {
                name: "EdTech",
                address: process.env.CLIENT_ID_MAIL,
      }, // sender address
      to: [`${req.body.email}`], // list of receivers
      subject: `Welcome to EdTech ${req.body.user} - Your Account Has Been Successfully Created!`, // Subject line
      text: "Hi, there", // plain text body
      html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to EdTech, ${req.body.user}!</h2>
          <p>We are excited to have you on board. Our platform is designed to provide you with the best educational resources and help you achieve your learning goals.</p>
          <p>Here are some things you can do next:</p>
          <ul>
              <li>Explore our course library to start learning.</li>
              <li>Check out our community forum to connect with other learners.</li>
              <li>Visit my <a href="https://github.com/unknonman" style="color: #1a73e8;">Git profile</a> to personalize your experience.</li>
          </ul>
          <p>If you have any questions or need support, feel free to reach out to us at any time.</p>
          <p>Happy Learning!</p>
          <p>The EdTech Team</p>
          <footer style="margin-top: 20px; font-size: 12px; color: #999;">
              <p>&copy; 2024 EdTech. All rights reserved.</p>
          </footer>
      </div>
  `, // html body
      attachments: [
        //   {
        //     filename: "logo.png",
        //     path: path.join(__dirname, "logo.png"),
        //     contentType: "image/png",
        //   },
        //   {
        //     filename: "test.pdf",
        //     path: path.join(__dirname, "test.pdf"),
        //     contentType: "application/pdf",
        //   }
      ]
    };
  

const SendMail = async (transporter, info) => {
    try {
        await transporter.sendMail(info);
        console.log("Message sent: %s", info);
        return info;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
}

SendMail(transporter, info).then(async() => {
    console.log("Email sent successfully");
    return info;
}).catch((error) => {
    console.error("Error sending email:", error);
    throw error;
});
}