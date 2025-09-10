import nodemailer from "nodemailer";
import { supabase, calculateLeadScore } from "@/lib/supabase";

export async function POST(request) {
	try {
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

		const { 
			fullName, workEmail, service, budget, timeline, 
			projectSummary, companyWebsite, phone, privacyConsent,
			utm_source, utm_medium, utm_campaign, utm_term, utm_content,
			attribution_data, landing_page, referrer
		} = body;

		if (!fullName || !workEmail || !service || !timeline) {
			return new Response(
				JSON.stringify({ message: "Required fields are missing." }),
				{ status: 400 }
			);
		}

		// Prepare lead data for database storage
		const leadData = {
			full_name: fullName,
			work_email: workEmail,
			service: service,
			budget: budget || null,
			timeline: timeline,
			project_summary: projectSummary || null,
			company_website: companyWebsite || null,
			phone: phone || null,
			privacy_consent: privacyConsent === 'true' || privacyConsent === true,
			utm_source: utm_source || null,
			utm_medium: utm_medium || null,
			utm_campaign: utm_campaign || null,
			utm_term: utm_term || null,
			utm_content: utm_content || null,
			landing_page: landing_page || null,
			referrer: referrer || null,
			attribution_data: attribution_data ? (typeof attribution_data === 'string' ? JSON.parse(attribution_data) : attribution_data) : null,
		};

		// Calculate lead score
		leadData.lead_score = calculateLeadScore(leadData);

		// Store lead in Supabase database
		let leadId = null;
		try {
			const { data: savedLead, error: supabaseError } = await supabase
				.from('leads')
				.insert([leadData])
				.select('id')
				.single();

			if (supabaseError) {
				console.error('Supabase error:', supabaseError);
				// Continue with email sending even if database storage fails
			} else {
				leadId = savedLead?.id;
				console.log('Lead saved to database with ID:', leadId);
			}
		} catch (dbError) {
			console.error('Database storage error:', dbError);
			// Continue with email sending even if database storage fails
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
		emailContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		emailContent += `CONTACT INFORMATION\n`;
		emailContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		emailContent += `Name: ${fullName}\n`;
		emailContent += `Email: ${workEmail}\n`;
		if (phone) {
			emailContent += `Phone: ${phone}\n`;
		}
		if (companyWebsite) {
			emailContent += `Company & Website: ${companyWebsite}\n`;
		}
		
		emailContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		emailContent += `PROJECT DETAILS\n`;
		emailContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		emailContent += `Service Needed: ${service}\n`;
		emailContent += `Budget Range: ${budget || 'Not specified'}\n`;
		emailContent += `Timeline: ${timeline}\n`;
		
		if (projectSummary) {
			emailContent += `\nProject Summary:\n${projectSummary}\n`;
		}
		
		// Add UTM tracking information
		emailContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		emailContent += `MARKETING ATTRIBUTION (UTM)\n`;
		emailContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		
		if (utm_source || utm_medium || utm_campaign) {
			emailContent += `Source: ${utm_source || 'Direct/Unknown'}\n`;
			emailContent += `Medium: ${utm_medium || 'None'}\n`;
			emailContent += `Campaign: ${utm_campaign || 'None'}\n`;
			if (utm_term) emailContent += `Term: ${utm_term}\n`;
			if (utm_content) emailContent += `Content: ${utm_content}\n`;
		} else {
			emailContent += `No UTM parameters captured (Direct traffic or bookmark)\n`;
		}
		
		if (landing_page) {
			emailContent += `Landing Page: ${landing_page}\n`;
		}
		
		if (referrer && referrer !== 'direct') {
			emailContent += `Referrer: ${referrer}\n`;
		}
		
		// Add attribution model data if available
		if (attribution_data) {
			emailContent += `\nAttribution Journey:\n`;
			if (attribution_data.first_touch) {
				emailContent += `First Touch: ${attribution_data.first_touch.utm_source || 'Direct'} / ${attribution_data.first_touch.utm_medium || 'None'}\n`;
			}
			if (attribution_data.last_touch) {
				emailContent += `Last Touch: ${attribution_data.last_touch.utm_source || 'Direct'} / ${attribution_data.last_touch.utm_medium || 'None'}\n`;
			}
		}
		
		emailContent += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		emailContent += `ADDITIONAL INFO\n`;
		emailContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
		emailContent += `Privacy Consent: ${privacyConsent ? 'Yes' : 'No'}\n`;
		
		if (attachmentFile) {
			emailContent += `Attachment: ${attachmentFile.name} (${(attachmentFile.size / 1024).toFixed(1)} KB)\n`;
		}
		
		if (leadId) {
			emailContent += `Lead ID: ${leadId}\n`;
			emailContent += `Lead Score: ${leadData.lead_score}/100\n`;
		}
		
		emailContent += `Submitted at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST\n`;

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