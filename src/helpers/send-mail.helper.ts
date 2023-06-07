import * as nodemailer from 'nodemailer';

type smtpConfig = {
	host: string;
	user: string;
	pass: string;
};

type Content = {
	from: string;
	to: string;
	subject: string;
	html: string;
};

export const sendMail = async (content: Content, smtpConfig: smtpConfig) => {
	const transporter = nodemailer.createTransport({
		host: smtpConfig.host,
		port: 465,
		secure: true,
		auth: {
			user: smtpConfig.user,
			pass: smtpConfig.pass,
		},
	});

	const info = await transporter.sendMail({
		from: content.from,
		to: content.to,
		subject: content.subject,
		html: content.html,
	});

	console.log('Message sent: %s', info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
