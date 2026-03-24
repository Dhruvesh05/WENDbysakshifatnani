import nodemailer from 'nodemailer';

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  receiver: string;
};

const readMailConfig = (): MailConfig => {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM_EMAIL?.trim();
  const receiver = process.env.CONTACT_RECEIVER_EMAIL?.trim();

  if (!host || !portRaw || !user || !pass || !from || !receiver) {
    throw new Error(
      'Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL, CONTACT_RECEIVER_EMAIL.',
    );
  }

  const port = Number(portRaw);
  if (!Number.isFinite(port) || port <= 0) {
    throw new Error('SMTP_PORT must be a valid positive number.');
  }

  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    from,
    receiver,
  };
};

let cachedTransporter: nodemailer.Transporter | null = null;

const getTransporter = (config: MailConfig) => {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  return cachedTransporter;
};

export const sendContactNotificationEmail = async (payload: {
  name: string;
  email: string;
  service: string;
  message: string;
}) => {
  const config = readMailConfig();
  const transporter = getTransporter(config);

  const subject = `New Contact Enquiry: ${payload.service}`;
  const text = [
    'You received a new contact enquiry.',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Service: ${payload.service}`,
    '',
    'Message:',
    payload.message,
  ].join('\n');

  const html = `
    <h2>New Contact Enquiry</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Service:</strong> ${payload.service}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, '<br/>')}</p>
  `;

  await transporter.sendMail({
    from: config.from,
    to: config.receiver,
    replyTo: payload.email,
    subject,
    text,
    html,
  });
};
