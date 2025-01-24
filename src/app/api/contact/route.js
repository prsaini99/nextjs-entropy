import nodemailer from "nodemailer";

export async function POST(request) {
	try {
		const body = await request.json(); // Parse the request body
		const { name, email, message } = body;

		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({ message: "All fields are required." }),
				{ status: 400 }
			);
		}

		// Configure Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "gmail", // Use your email provider's service,
			secure: true,
			port: 587,
			auth: {
				user: process.env.EMAIL, // Your email address
				pass: process.env.EMAIL_PASSWORD, // Your email password or app password
			},
		});

		// Send email
		await transporter.sendMail({
			from: "contact@stackbinary.io", // Sender's email
			to: email, // Recipient's email
			subject: `Hi ${name}, Thanks for contacting us!`,
      		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
		});

		// Return success response
		return new Response(
			JSON.stringify({ message: "Email sent successfully." }),
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending email:", error);
		return new Response(JSON.stringify({ message: "Failed to send email." }), {
			status: 500,
		});
	}
}
