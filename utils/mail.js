import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT), //every thing for the env is string so you have to convert in to number
  secure: true,
  auth: { user: process.env.SMTP_MAIL, pass: process.env.SMTP_PASSWORD },
});

const sendMail = async (email, subject, content) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: content,
    });
    console.log("✅ Mail sent:", info.messageId);
    console.log(
      "📨 Preview URL (for testing):",
      nodemailer.getTestMessageUrl(info)
    );
    return info; // optional if you want to handle info later
  } catch (error) {
    console.log(error.messsgae);
  }
};

export { sendMail };
