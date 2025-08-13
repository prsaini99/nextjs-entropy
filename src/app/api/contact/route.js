import nodemailer from "nodemailer";

export async function POST(request) {
	try {
		// Debug logging for environment variables
		console.log('=== CONTACT API DEBUG ===');
		console.log('EMAIL exists:', !!process.env.EMAIL);
		console.log('EMAIL value:', process.env.EMAIL);
		console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
		
		// Check if email is configured
		if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
			console.log('Email not configured - missing EMAIL or EMAIL_PASSWORD');
			return new Response(
				JSON.stringify({ message: "Email service not configured." }),
				{ status: 500 }
			);
		}

		let body;
		let attachmentFile = null;
		
		// Check if request contains FormData (file upload) or JSON
		const contentType = request.headers.get('content-type');
		
		if (contentType && contentType.includes('multipart/form-data')) {
			// Handle FormData (with file upload)
			const formData = await request.formData();
			body = {};
			
			// Convert FormData to object
			for (const [key, value] of formData.entries()) {
				if (key === 'attachmentFile' && value instanceof File) {
					attachmentFile = value;
				} else {
					body[key] = value;
				}
			}
		} else {
			// Handle JSON (no file upload)
			body = await request.json();
		}

		const { fullName, workEmail, service, budget, timeline, projectSummary, companyWebsite, phone, privacyConsent } = body;

		if (!fullName || !workEmail || !service || !timeline) {
			return new Response(
				JSON.stringify({ message: "Required fields are missing." }),
				{ status: 400 }
			);
		}

		// Configure Nodemailer transporter
		const transporter = nodemailer.createTransport({
			service: "gmail", // Use your email provider's service
			auth: {
				user: process.env.EMAIL, // Your email address
				pass: process.env.EMAIL_PASSWORD, // Your email password or app password
			},
		});

		// Create email content
		let emailContent = `New Project Inquiry\n\n`;
		emailContent += `Name: ${fullName}\n`;
		emailContent += `Email: ${workEmail}\n`;
		emailContent += `Service Needed: ${service}\n`;
		emailContent += `Budget Range: ${budget || 'Not specified'}\n`;
		emailContent += `Timeline: ${timeline}\n`;
		
		if (projectSummary) {
			emailContent += `\nProject Summary:\n${projectSummary}\n`;
		}
		
		if (companyWebsite) {
			emailContent += `\nCompany & Website: ${companyWebsite}\n`;
		}
		
		if (phone) {
			emailContent += `Phone: ${phone}\n`;
		}
		
		emailContent += `\nPrivacy Consent: ${privacyConsent ? 'Yes' : 'No'}\n`;
		
		if (attachmentFile) {
			emailContent += `\nAttachment: ${attachmentFile.name} (${attachmentFile.size} bytes)\n`;
		}
		
		emailContent += `\nSubmitted at: ${new Date().toLocaleString()}\n`;

		// Prepare email options
		const mailOptions = {
			from: process.env.EMAIL, // Sender's email
			to: "prateek@stackbinary.io", // Send to Prateek
			subject: `New Project Inquiry from ${fullName}`,
			text: emailContent,
		};

		// Add file attachment if present
		if (attachmentFile) {
			const buffer = await attachmentFile.arrayBuffer();
			mailOptions.attachments = [
				{
					filename: attachmentFile.name,
					content: Buffer.from(buffer),
					contentType: attachmentFile.type,
				}
			];
		}

		// Send email to prateek@stackbinary.io
		await transporter.sendMail(mailOptions);

		// Send confirmation email to user
		await transporter.sendMail({
			from: "contact@stackbinary.io", // Sender's email
			to: workEmail, // User's email
			subject: `Thanks for contacting StackBinary, ${fullName}!`,
			text: `Hi ${fullName},\n\nThank you for your project inquiry! We've received your request and will get back to you within one business day.\n\nBest regards,\nStackBinary Team\n\nhttps://stackbinary.io`,
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