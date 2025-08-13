# StackBinary.io - Next.js Website with AI Chat

A modern, animated Next.js website for StackBinary featuring AI-powered chat assistance, comprehensive services showcase, and conversion-optimized contact forms with file attachments.

## Features

- 🎨 **Modern Design**: Animated, responsive design with dark theme
- 🤖 **AI Chat Assistant**: Floating chat widget with RAG (Retrieval-Augmented Generation)
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Performance**: Optimized for speed and SEO
- 🔗 **Dynamic Routing**: 16+ service detail pages with dynamic content
- 📧 **Smart Contact Forms**: 2-step conversion-optimized forms with file attachments
- 💼 **Careers Section**: Job listings with detailed application process
- 🔗 **Social CTAs**: WhatsApp, Telegram, LinkedIn, and Email integration

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript/TypeScript
- **Styling**: CSS Modules + Tailwind CSS
- **Animation**: Framer Motion
- **AI/ML**: Groq API + Pinecone Vector DB
- **Email**: Nodemailer with Gmail SMTP
- **Deployment**: AWS Amplify

## AI Chat Features

- **RAG Implementation**: Uses Pinecone for vector search with llama-text-embed-v2 embeddings
- **LLM Generation**: Groq API with configurable models
- **Similarity Threshold**: Configurable threshold gating (currently 0.40)
- **Fallback Handling**: Returns CTA when query not in knowledge base
- **Security**: API keys never exposed to client-side

## Contact Form Features

- **2-Step Process**: Lead capture → detailed requirements
- **File Attachments**: PDF, DOC, DOCX, TXT support with email delivery
- **Email Integration**: Sends to prateek@stackbinary.io with user confirmation
- **Visual Feedback**: File selection indicators and form validation
- **Professional Design**: Black background with white borders, consistent styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Groq API key
- Pinecone account (serverless)
- Gmail account with App Password

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-entropy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file with:
   ```env
   # Groq
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct

   # Pinecone (serverless)
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_HOST=https://your-index.svc.region.pinecone.io
   PINECONE_INDEX=your-index-name
   PINECONE_NAMESPACE=__default__

   # Email Configuration (for contact form)
   EMAIL=your-gmail@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## AWS Amplify Deployment

### Prerequisites
- AWS Account
- GitHub repository
- All environment variables configured
- Gmail App Password generated

### Step 1: Prepare Your Repository

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Verify Build**: Test `npm run build` locally
3. **Check Dependencies**: Ensure `package.json` has all required dependencies

### Step 2: Connect to AWS Amplify

1. **Access Amplify Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click "New app" → "Host web app"

2. **Connect Repository**
   - Choose "GitHub" as your Git provider
   - Authorize AWS Amplify to access your repositories
   - Select your repository and branch (usually `main`)

### Step 3: Configure Build Settings

Amplify will auto-detect Next.js. Use these optimized build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Step 4: Environment Variables

**Critical**: In the Amplify Console, go to "App settings" → "Environment variables" and add ALL required variables:

```
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
PINECONE_API_KEY=pcsk_your_pinecone_api_key_here
PINECONE_HOST=https://your-index.svc.region.pinecone.io
PINECONE_INDEX=your-index-name
PINECONE_NAMESPACE=__default__
EMAIL=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

**Gmail App Password Setup:**
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account Settings → Security → 2-Step Verification → App passwords
3. Generate password for "Mail"
4. Use the 16-character password (e.g., `abcd efgh ijkl mnop`)

### Step 5: Advanced Configuration

#### Custom Domain (Optional)
1. Go to "Domain management" in Amplify
2. Add your domain (e.g., `stackbinary.io`)
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

#### Performance Optimizations
- **Enable CloudFront compression**
- **Configure caching headers**
- **Set up monitoring with CloudWatch**

#### Build Instance Size
For better performance, consider upgrading build instance:
- Go to "App settings" → "Build settings"
- Change "Build instance type" to Medium or Large

### Step 6: Deploy

1. **Initial Deploy**
   - Click "Save and deploy"
   - Monitor build process in real-time
   - Build typically takes 3-5 minutes

2. **Post-Deploy Verification**
   - Test the live URL
   - Verify chat functionality
   - Test contact form submissions
   - Check file attachment handling

### Step 7: Continuous Deployment

Amplify automatically redeploys when you push to your connected branch:

1. **Push Changes**
   ```bash
   git add .
   git commit -m "Update website"
   git push origin main
   ```

2. **Auto-Deploy**
   - Amplify detects changes automatically
   - Builds and deploys new version
   - Live in 3-5 minutes

### Troubleshooting Deployment

#### Common Issues & Solutions

1. **Build Failures**
   - Check build logs in Amplify console
   - Verify all environment variables are set
   - Test build locally first: `npm run build`

2. **Chat Not Working**
   - Verify GROQ_API_KEY and PINECONE_API_KEY
   - Check API endpoints in browser network tab
   - Test threshold settings (adjust in `/api/chat/route.ts`)

3. **Contact Form Issues**
   - Verify EMAIL and EMAIL_PASSWORD variables
   - Test Gmail App Password locally
   - Check server logs for authentication errors

4. **Environment Variables Not Loading**
   - Restart deployment after adding variables
   - Check variable names match exactly
   - Avoid quotes around variable values

5. **Memory Issues**
   - Increase build instance size to Medium/Large
   - Clear cache and rebuild
   - Optimize bundle size if needed

#### Performance Monitoring
- Use AWS CloudWatch for monitoring
- Set up alerts for failed builds
- Monitor response times and errors

## Testing Checklist

### Pre-Deployment Testing
- [ ] `npm run build` succeeds locally
- [ ] Chat widget appears on all pages
- [ ] Contact form submits successfully
- [ ] File attachments work (PDF, DOC, etc.)
- [ ] Email delivery works
- [ ] All environment variables set

### Post-Deployment Testing

#### AI Chat Functionality
- [ ] **Knowledge Base Queries**
  - Test: "Do you build WhatsApp chatbots?"
  - Expected: Brief answer + CTA link

- [ ] **Fallback Handling**
  - Test: "What's the weather like?"
  - Expected: Fallback message with CTA only

- [ ] **Technical Validation**
  - Check network tab for `/api/chat` requests
  - Verify no API keys visible in client-side
  - Test on mobile devices

#### Contact Form Testing
- [ ] **Step 1 Form**
  - Submit with required fields only
  - Test validation messages

- [ ] **Step 2 Form**
  - Upload PDF attachment
  - Verify file selection indicator
  - Test form submission with file

- [ ] **Email Delivery**
  - Check prateek@stackbinary.io inbox
  - Verify attachment received
  - Test user confirmation email

#### Social CTAs
- [ ] WhatsApp link with predefined message
- [ ] Telegram link with predefined message
- [ ] LinkedIn link (configure URL)
- [ ] Email link to contact@stackbinary.io

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts           # AI chat endpoint
│   │   └── contact/route.js        # Contact form handler
│   ├── services/                   # Service detail pages
│   ├── careers/                    # Careers section
│   ├── contact-us/                 # Contact page
│   └── layout.jsx                  # Root layout with FloatingChat
├── components/
│   ├── FloatingChat.jsx            # AI chat widget
│   ├── Footer.jsx                  # Footer (social icons removed)
│   └── pages/ContactUs/
│       └── ContactWrapper.jsx      # Contact form component
└── data/                          # Static content
```

## Performance Optimizations

- **Static Generation**: Most pages pre-generated at build time
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Aggressive caching for static assets
- **Bundle Analysis**: Use `npm run build` to check bundle size

## SEO Features

- **Structured Data**: JSON-LD for rich search results
- **Meta Tags**: Comprehensive Open Graph and Twitter cards
- **Sitemap**: Automatically generated
- **Performance**: Core Web Vitals optimized

## Security Considerations

- **API Keys**: Never exposed to client-side
- **File Uploads**: Validated file types and sizes
- **Email**: Uses Gmail App Password (not regular password)
- **CORS**: Properly configured for API routes

## Support & Maintenance

### Regular Tasks
- Monitor AWS costs and usage
- Update dependencies monthly
- Check chat accuracy and tune threshold
- Review email delivery rates

### For Issues
1. Check AWS Amplify build logs
2. Review CloudWatch metrics
3. Test locally with same environment variables
4. Contact support if needed

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test locally: `npm run build`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Submit a pull request

## License

This project is proprietary and confidential to StackBinary.

---

**Last Updated**: January 2025  
**Version**: 2.0  
**Deployment**: AWS Amplify  
**Contact**: prateek@stackbinary.io