import nodemailer from "nodemailer";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const emailOptions = { ...data, from: UKR_NET_EMAIL };
  await transporter.sendMail(emailOptions);
  return true;
};

export default sendEmail;
