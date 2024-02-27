// Used for local development and e2e testing

import nodemailer from 'nodemailer';

const host = process.env.EMAIL_SERVER_HOST || '127.0.0.1';
const port = process.env.EMAIL_SERVER_PORT || 1025;
const from = process.env.EMAIL_FROM || 'default@test.com';

const transporter = nodemailer.createTransport({
  host,
  port,
  from
});

export default transporter;
