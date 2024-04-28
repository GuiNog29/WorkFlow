import path from 'path';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import EtheralMail from '@config/mail/EtherealMail';

export async function SendPasswordResetEmail(
  mailService: typeof SESMail | typeof EtheralMail,
  name: string,
  email: string,
  token: string,
) {
  const forgotPasswordTemplate = path.resolve(
    __dirname,
    '..',
    '..',
    'user',
    'views',
    'forgot_password.hbs',
  );

  if (mailConfig.driver === 'ses') {
    await mailService.sendMail({
      to: {
        name,
        email,
      },
      subject: 'WorkFlow - Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: name,
          link: `${process.env.APP_WEB_URL}/resetPassword?token=${token}`,
        },
      },
    });
  }
}
