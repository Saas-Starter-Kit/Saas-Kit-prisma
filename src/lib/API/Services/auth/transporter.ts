// Used for local development and e2e testing

import nodemailer from 'nodemailer';

const host = process.env.EMAIL_HOST || '127.0.0.1';
const port = process.env.EMAIL_PORT || 1025;

const transporter = nodemailer.createTransport({
  host,
  port,
  from
});

export default transporter;
