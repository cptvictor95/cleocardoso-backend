require("dotenv").config();

const emailUser = process.env.API_EMAIL_USER;
const emailPass = process.env.API_EMAIL_PASS;
const emailSMTP = process.env.API_EMAIL_SMTP;
const emailSMTP_PORT = process.env.API_EMAIL_SMTP_PORT;

module.exports = {
  USER: emailUser,
  PASS: emailPass,
  SMTP_HOST: emailSMTP,
  SMTP_PORT: emailSMTP_PORT,
};
