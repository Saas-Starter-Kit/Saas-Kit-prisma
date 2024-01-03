// Used for local development and e2e testing

import nodemailer from 'nodemailer';

const host = 'localhost';
const port = 1025;

const transporter = nodemailer.createTransport({
  host,
  port
});

export default transporter;
