import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async message => {
  try {
    return await sgMail.send(message);
  } catch (error) {
    throw error;
  }
};

export default sendMail;
