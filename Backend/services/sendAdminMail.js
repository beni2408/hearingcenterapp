import nodemailer from "nodemailer";
const sendAdminMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.ADMIN_EMAIL_HOST,
    port: process.env.ADMIN_EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.ADMIN_EMAIL_USER,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

export default sendAdminMail;
