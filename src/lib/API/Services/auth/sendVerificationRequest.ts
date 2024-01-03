import { SendVerificationRequestParams } from 'next-auth/providers';

import transporter from './transporter';

export const sendVerificationRequest = async ({
  url,
  identifier
}: SendVerificationRequestParams) => {
  try {
    await transporter.sendMail({
      to: identifier,
      subject: 'Activate your account',
      text: url
      //html
    });
  } catch (error) {
    throw new Error('Failed to send verification email.');
  }
};
