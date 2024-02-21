import { SendVerificationRequestParams } from 'next-auth/providers';
import transporter from './transporter';

export const sendVerificationRequest = async ({ url, identifier }: SendVerificationRequestParams) => {
  try {
    await transporter.sendMail({
      to: identifier,
      subject: 'Activate your account',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #f7f7f7;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .content {
                background-color: #fff;
                padding: 30px;
                border-radius: 5px;
              }
              .footer {
                text-align: center;
                padding-top: 20px;
              }
              a {
                color: #007bff;
                text-decoration: none;
              }
              h2 {
                font-size: 24px;
                margin-bottom: 20px;
              }
              p {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Activate Your Account</h1>
              </div>
              <div class="content">
                <h3>Get started with saas-prisma!</h3>
                <p>Please click the button below to verify your email address:</p>
                <a href="${url}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Verify Email</a>
              </div>
              <div class="footer">
                <p>If you didn't request this, please ignore this email. </p>
              </div>
            </div>
          </body>
        </html>
      `
    });
  } catch (error) {
    throw new Error('Failed to send verification email.');
  }
};