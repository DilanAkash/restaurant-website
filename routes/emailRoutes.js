import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Set up the Nodemailer transport configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services (Yahoo, Outlook, etc.)
    auth: {
      user: 'dilanakash27@gmail.com',
      pass: 'feqs aqfj rzxx wwdz',
    },
  });

  const mailOptions = {
    from: email,
    to: 'dilanakash27@gmail.com',
    subject: `ABC Restaurant got a new message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});

export default router;
