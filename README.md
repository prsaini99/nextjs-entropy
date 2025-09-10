# StackBinary.io - Complete Business Platform

A comprehensive Next.js platform for StackBinary featuring AI-powered chat, UTM tracking, lead management dashboard, and conversion-optimized workflows.

## Features

### 🌐 Frontend Website
- 🎨 **Modern Design**: Animated, responsive design with dark theme
- 🤖 **AI Chat Assistant**: Floating chat widget with RAG (Retrieval-Augmented Generation)
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Performance**: Optimized for speed and SEO
- 🔗 **Dynamic Routing**: 16+ service detail pages with dynamic content
- 📧 **Smart Contact Forms**: 2-step conversion-optimized forms with file attachments
- 💼 **Careers Section**: Job listings with detailed application process
- 🔗 **Social CTAs**: WhatsApp, Telegram, LinkedIn, and Email integration

### 📊 UTM Tracking & Analytics
- 🎯 **UTM Parameter Capture**: Automatic first-touch, last-touch, and multi-touch attribution
- 📈 **Campaign Performance**: Track ROI and effectiveness of marketing campaigns
- 🔍 **Google Analytics Integration**: GA4, GTM, Facebook Pixel, LinkedIn Insight Tag
- 📧 **Attribution in Emails**: UTM data included in all lead notifications
- 🛠️ **UTM Builder Tool**: Create trackable campaign URLs at `/utm-builder`
- 📊 **Event Tracking**: Form interactions, social clicks, page views, conversions

### 🏢 Lead Management Dashboard  
- 🔐 **Admin Authentication**: Secure login system via Supabase Auth
- 📋 **Lead Management**: Complete CRM interface at `/admin/leads`
- 🎯 **Lead Scoring**: Automatic scoring based on source, service, budget (0-100 points)
- 📈 **Analytics Dashboard**: Charts, conversion rates, campaign performance at `/admin/analytics`
- 📝 **Notes System**: Add follow-up notes and track lead interactions
- 🔄 **Status Pipeline**: New → Contacted → Qualified → Proposal Sent → Won/Lost
- 💰 **Pipeline Value**: Track estimated deal values and revenue forecasting
- 🎨 **Beautiful UI**: Professional dashboard with charts and data visualization

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript/TypeScript
- **Styling**: CSS Modules + Tailwind CSS
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth
- **Charts**: Recharts for analytics visualization
- **AI/ML**: Groq API + Pinecone Vector DB
- **Email**: Nodemailer with Gmail SMTP
- **Analytics**: Google Analytics 4, GTM, Facebook Pixel, LinkedIn Insight
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
   # Supabase (for lead dashboard)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   
   # Analytics & Tracking
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-T7LVKHS7
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX
   NEXT_PUBLIC_LINKEDIN_PARTNER_ID=XXXXXXX
   NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

   # Groq (for AI chat)
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct

   # Pinecone (for AI chat)
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_HOST=https://your-index.svc.region.pinecone.io
   PINECONE_INDEX=your-index-name
   PINECONE_NAMESPACE=__default__

   # Email Configuration
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

## 🚀 Lead Dashboard Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for project initialization (2-3 minutes)  
3. Go to **Settings → API** to get your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Setup Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create tables, indexes, and functions

### Step 3: Create Admin User
1. In Supabase → **Authentication → Users**
2. Click **Add user**
3. Enter your admin email and password
4. Toggle **Email confirmed** to true

### Step 4: Access Dashboard  
1. Run your application: `npm run dev`
2. Go to `http://localhost:3000/admin/dashboard`
3. Login with your admin credentials
4. Start managing leads! 🎉

## 📊 UTM Tracking Setup

### Google Analytics 4 Setup
1. Go to [Google Analytics](https://analytics.google.com)
2. Create property for stackbinary.io
3. Navigate to: **Admin → Data Streams → Web**
4. Create web stream for your domain
5. Copy Measurement ID (starts with G-) to `.env.local`

### Google Tag Manager (Optional)
1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create container for stackbinary.io
3. Copy GTM ID (GTM-XXXXXXX) to `.env.local`

### UTM Campaign Creation
- Use the built-in UTM Builder at `/utm-builder`
- Or create manual links with parameters:
  - `utm_source`: Traffic source (google, facebook, linkedin, email)
  - `utm_medium`: Marketing medium (cpc, social, email, referral)
  - `utm_campaign`: Campaign name (summer_sale, webinar_2024)
  - `utm_term`: Keywords (optional)
  - `utm_content`: Link variation (optional)

### Example UTM Link
```
https://stackbinary.io/contact-us?utm_source=linkedin&utm_medium=social&utm_campaign=ai_services_promotion&utm_content=sponsored_post
```

## 🎯 How It All Works Together

### Lead Generation Flow
1. **Visitor arrives** with UTM parameters (or direct)
2. **UTM data captured** and stored in browser (first-touch, last-touch)
3. **User browses** website, UTM data persists across pages
4. **Contact form submitted** with UTM attribution included
5. **Lead stored** in Supabase with calculated score
6. **Email sent** to you with UTM attribution data
7. **Dashboard updated** with new lead and analytics

### Attribution Models
- **First-Touch**: Credits the first marketing touchpoint
- **Last-Touch**: Credits the most recent touchpoint before conversion  
- **Multi-Touch**: Tracks complete customer journey (if multiple visits)

### Lead Scoring Algorithm (0-100 points)
- **UTM Source**: Google (10pts), LinkedIn (8pts), Direct (8pts), etc.
- **UTM Medium**: Referral (10pts), CPC (9pts), Email (8pts), etc.
- **Service Type**: Custom Software (10pts), AI/ML (9pts), etc.
- **Budget Range**: $50k+ (10pts), $25k (7pts), etc.
- **Bonus Points**: Phone number (+2pts), Company website (+3pts)

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
# Supabase (for lead dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Analytics & Tracking
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-T7LVKHS7
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXXXXXXX
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=XXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX

# AI Chat (Groq + Pinecone)
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=meta-llama/llama-4-scout-17b-16e-instruct
PINECONE_API_KEY=pcsk_your_pinecone_api_key_here
PINECONE_HOST=https://your-index.svc.region.pinecone.io
PINECONE_INDEX=your-index-name
PINECONE_NAMESPACE=__default__

# Email Configuration
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
- [ ] UTM parameters capture correctly
- [ ] Lead dashboard authentication works
- [ ] Database connection established
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

#### Lead Dashboard Testing
- [ ] **Admin Authentication**
  - Login at `/admin/dashboard`
  - Verify logout functionality
  
- [ ] **Lead Management**
  - View leads at `/admin/leads`
  - Filter and sort leads
  - Update lead status
  - View individual lead details
  - Add notes to leads
  
- [ ] **Analytics Dashboard**
  - View charts at `/admin/analytics`
  - Verify UTM performance data
  - Check conversion metrics

#### UTM Tracking Testing  
- [ ] **Parameter Capture**
  - Visit site with UTM: `?utm_source=test&utm_medium=email&utm_campaign=readme_test`
  - Submit contact form
  - Verify UTM data in admin dashboard
  - Check email notification includes UTM data
  
- [ ] **Attribution Models**
  - Test first-touch attribution
  - Test last-touch attribution (visit with different UTMs)
  - Verify data persistence across browser sessions

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/                  # Admin dashboard APIs
│   │   │   ├── analytics/route.js  # Analytics data
│   │   │   ├── dashboard/route.js  # Dashboard metrics
│   │   │   └── leads/              # Lead management APIs
│   │   │       ├── route.js        # List/update leads
│   │   │       └── [id]/route.js   # Individual lead details
│   │   ├── careers/apply/route.ts  # Career applications (with UTM)
│   │   ├── chat/route.ts           # AI chat endpoint
│   │   └── contact/route.js        # Contact form (with UTM & DB storage)
│   ├── admin/                      # Protected admin dashboard
│   │   ├── dashboard/page.jsx      # Main dashboard with metrics
│   │   ├── leads/                  # Lead management interface
│   │   │   ├── page.jsx            # Leads table with filters
│   │   │   └── [id]/page.jsx       # Individual lead details
│   │   ├── analytics/page.jsx      # Analytics with charts
│   │   └── layout.jsx              # Admin layout with auth
│   ├── services/                   # Service detail pages
│   ├── careers/                    # Careers section
│   ├── contact-us/                 # Contact page
│   ├── utm-builder/                # UTM link builder tool
│   └── layout.jsx                  # Root layout with FloatingChat & Analytics
├── components/
│   ├── Analytics.jsx               # GA4, GTM, FB Pixel integration
│   ├── FloatingChat.jsx            # AI chat widget
│   ├── Footer.jsx                  # Footer (social icons removed)
│   └── pages/ContactUs/
│       └── ContactWrapper.jsx      # Contact form (with UTM tracking)
├── hooks/
│   └── useUTMTracking.js           # UTM parameter capture & attribution
├── lib/
│   ├── analytics.js                # Event tracking functions
│   ├── auth.js                     # Authentication helpers
│   └── supabase.js                 # Database client & lead scoring
├── data/                           # Static content
└── supabase-schema.sql             # Database schema for leads & applications
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
- **Lead Management**: Review new leads daily in admin dashboard
- **Campaign Optimization**: Monitor UTM performance and adjust marketing
- **Database Maintenance**: Clean up test/spam leads as needed
- **Analytics Review**: Check conversion rates and lead quality trends
- **System Monitoring**: Monitor AWS costs, email delivery, chat accuracy
- **Updates**: Update dependencies monthly, tune thresholds as needed

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

## 🎉 What You Get

This complete platform provides:

### 🌟 Professional Website
- Modern, responsive design optimized for conversions
- AI-powered chat assistant to engage visitors
- Comprehensive service showcase with dynamic content
- Career section for talent acquisition

### 📊 Marketing Intelligence  
- **UTM Campaign Tracking**: Know exactly which marketing efforts drive results
- **Attribution Models**: First-touch, last-touch, and multi-touch attribution
- **Google Analytics Integration**: GA4, GTM, Facebook Pixel, LinkedIn tracking
- **Campaign Builder**: Create trackable URLs with the built-in UTM tool

### 🏢 Lead Management CRM
- **Automated Lead Capture**: Every form submission stored with UTM attribution
- **Lead Scoring**: Automatic 0-100 scoring based on source, service, budget
- **Status Pipeline**: Track leads from New → Contacted → Qualified → Won/Lost  
- **Analytics Dashboard**: Beautiful charts showing campaign ROI and performance
- **Notes System**: Add follow-ups and track interactions

### 🚀 Business Growth Tools
- **Revenue Pipeline**: Track estimated deal values and forecasting
- **Campaign ROI**: See which marketing channels bring the highest-quality leads
- **Conversion Optimization**: Identify bottlenecks and improve performance
- **Professional Dashboard**: Impress clients and stakeholders with data

---

**Last Updated**: January 2025  
**Version**: 3.0 (with Lead Management Dashboard)  
**Deployment**: AWS Amplify + Supabase  
**Contact**: prateek@stackbinary.io