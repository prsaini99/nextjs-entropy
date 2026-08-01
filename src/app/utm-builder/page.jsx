'use client';
import React, { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function UTMBuilder() {
  const [url, setUrl] = useState('https://stackbinary.io');
  const [utmParams, setUtmParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: ''
  });
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Common UTM presets
  const presets = {
    sources: ['google', 'facebook', 'linkedin', 'twitter', 'instagram', 'email', 'newsletter', 'partner'],
    mediums: ['cpc', 'organic', 'social', 'email', 'referral', 'display', 'video', 'affiliate'],
    campaigns: ['brand_awareness', 'lead_generation', 'product_launch', 'seasonal_sale', 'webinar', 'content_promotion']
  };

  const handleParamChange = (param, value) => {
    setUtmParams({ ...utmParams, [param]: value });
  };

  const generateUrl = () => {
    try {
      const urlObj = new URL(url);
      
      // Add UTM parameters to URL
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value) {
          urlObj.searchParams.set(key, value);
        }
      });
      
      const finalUrl = urlObj.toString();
      setGeneratedUrl(finalUrl);
      
      // Track UTM link generation
      trackEvent('utm_link_generated', {
        base_url: url,
        ...utmParams
      });
      
      return finalUrl;
    } catch (error) {
      alert('Please enter a valid URL');
      return '';
    }
  };

  const copyToClipboard = async () => {
    const urlToCopy = generatedUrl || generateUrl();
    if (urlToCopy) {
      try {
        await navigator.clipboard.writeText(urlToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        
        trackEvent('utm_link_copied', {
          url: urlToCopy
        });
      } catch (error) {
        alert('Failed to copy URL');
      }
    }
  };

  const createShortenedUrl = () => {
    const urlToShorten = generatedUrl || generateUrl();
    if (urlToShorten) {
      // You can integrate with a URL shortener service here
      alert('URL shortener integration coming soon! For now, use the full URL.');
    }
  };

  const resetForm = () => {
    setUrl('https://stackbinary.io');
    setUtmParams({
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: ''
    });
    setGeneratedUrl('');
    setCopied(false);
  };

  return (
    <section className="min-h-screen py-20">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container w-container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="heading-2 text-weight-bold mb-4">UTM Link Builder</h1>
              <p className="text-size-large opacity-70">
                Create trackable campaign URLs with UTM parameters for better marketing attribution
              </p>
            </div>

            {/* URL Input */}
            <div className="mb-8 p-6 border border-white/20 rounded-lg bg-black/50">
              <label className="block text-size-medium text-weight-medium mb-3">
                Website URL *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://stackbinary.io"
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                required
              />
              <p className="text-size-small opacity-60 mt-2">
                Enter the full URL of the page you want to track
              </p>
            </div>

            {/* UTM Parameters */}
            <div className="mb-8 p-6 border border-white/20 rounded-lg bg-black/50">
              <h2 className="text-size-large text-weight-medium mb-6">Campaign Parameters</h2>
              
              {/* Source */}
              <div className="mb-6">
                <label className="block text-size-medium text-weight-medium mb-2">
                  Campaign Source (utm_source) *
                </label>
                <input
                  type="text"
                  value={utmParams.utm_source}
                  onChange={(e) => handleParamChange('utm_source', e.target.value)}
                  placeholder="e.g., google, facebook, newsletter"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 mb-2"
                  required
                />
                <div className="flex flex-wrap gap-2">
                  {presets.sources.map(source => (
                    <button
                      key={source}
                      onClick={() => handleParamChange('utm_source', source)}
                      className="px-3 py-1 text-size-small border border-white/30 rounded hover:bg-white/10"
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medium */}
              <div className="mb-6">
                <label className="block text-size-medium text-weight-medium mb-2">
                  Campaign Medium (utm_medium) *
                </label>
                <input
                  type="text"
                  value={utmParams.utm_medium}
                  onChange={(e) => handleParamChange('utm_medium', e.target.value)}
                  placeholder="e.g., cpc, email, social"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 mb-2"
                  required
                />
                <div className="flex flex-wrap gap-2">
                  {presets.mediums.map(medium => (
                    <button
                      key={medium}
                      onClick={() => handleParamChange('utm_medium', medium)}
                      className="px-3 py-1 text-size-small border border-white/30 rounded hover:bg-white/10"
                    >
                      {medium}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campaign */}
              <div className="mb-6">
                <label className="block text-size-medium text-weight-medium mb-2">
                  Campaign Name (utm_campaign) *
                </label>
                <input
                  type="text"
                  value={utmParams.utm_campaign}
                  onChange={(e) => handleParamChange('utm_campaign', e.target.value)}
                  placeholder="e.g., summer_sale, product_launch"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 mb-2"
                  required
                />
                <div className="flex flex-wrap gap-2">
                  {presets.campaigns.map(campaign => (
                    <button
                      key={campaign}
                      onClick={() => handleParamChange('utm_campaign', campaign)}
                      className="px-3 py-1 text-size-small border border-white/30 rounded hover:bg-white/10"
                    >
                      {campaign}
                    </button>
                  ))}
                </div>
              </div>

              {/* Term (Optional) */}
              <div className="mb-6">
                <label className="block text-size-medium text-weight-medium mb-2">
                  Campaign Term (utm_term) - Optional
                </label>
                <input
                  type="text"
                  value={utmParams.utm_term}
                  onChange={(e) => handleParamChange('utm_term', e.target.value)}
                  placeholder="e.g., keyword for paid search"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                <p className="text-size-small opacity-60 mt-1">
                  Used for paid search keywords
                </p>
              </div>

              {/* Content (Optional) */}
              <div className="mb-6">
                <label className="block text-size-medium text-weight-medium mb-2">
                  Campaign Content (utm_content) - Optional
                </label>
                <input
                  type="text"
                  value={utmParams.utm_content}
                  onChange={(e) => handleParamChange('utm_content', e.target.value)}
                  placeholder="e.g., banner_ad, text_link"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                <p className="text-size-small opacity-60 mt-1">
                  Used to differentiate similar content or links
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={generateUrl}
                className="primary-button w-inline-block"
                disabled={!url || !utmParams.utm_source || !utmParams.utm_medium || !utmParams.utm_campaign}
              >
                <div className="relative">
                  <div className="text-size-small text-weight-bold">Generate URL</div>
                </div>
                <div className="button-elipse"></div>
              </button>
              
              <button
                onClick={resetForm}
                className="secondary-button px-6 py-2"
              >
                Reset Form
              </button>
            </div>

            {/* Generated URL */}
            {generatedUrl && (
              <div className="p-6 border border-green-500/30 rounded-lg bg-green-500/10">
                <h3 className="text-size-medium text-weight-medium mb-3">
                  Generated Campaign URL
                </h3>
                <div className="p-3 bg-black/50 rounded mb-4 break-all font-mono text-size-small">
                  {generatedUrl}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 border border-white/30 rounded hover:bg-white/10"
                  >
                    {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                  </button>
                  <button
                    onClick={createShortenedUrl}
                    className="px-4 py-2 border border-white/30 rounded hover:bg-white/10"
                  >
                    Create Short URL
                  </button>
                  <a
                    href={generatedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-white/30 rounded hover:bg-white/10 text-center"
                  >
                    Test URL →
                  </a>
                </div>
              </div>
            )}

            {/* Best Practices */}
            <div className="mt-12 p-6 border border-white/20 rounded-lg bg-black/50">
              <h3 className="text-size-large text-weight-medium mb-4">
                UTM Best Practices
              </h3>
              <ul className="space-y-3 text-size-small opacity-80">
                <li>• <strong>Be Consistent:</strong> Use the same naming conventions across all campaigns</li>
                <li>• <strong>Use Lowercase:</strong> Keep all UTM parameters in lowercase to avoid duplication</li>
                <li>• <strong>No Spaces:</strong> Use underscores or hyphens instead of spaces</li>
                <li>• <strong>Be Specific:</strong> Make campaign names descriptive but concise</li>
                <li>• <strong>Document Everything:</strong> Keep a spreadsheet of all your UTM campaigns</li>
                <li>• <strong>Test Links:</strong> Always test your links before sharing them</li>
              </ul>
            </div>

            {/* Common Use Cases */}
            <div className="mt-8 p-6 border border-white/20 rounded-lg bg-black/50">
              <h3 className="text-size-large text-weight-medium mb-4">
                Common Use Cases
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-size-small">
                <div>
                  <h4 className="text-weight-medium mb-2">Email Campaign</h4>
                  <code className="block p-2 bg-black/50 rounded text-xs">
                    utm_source=newsletter<br/>
                    utm_medium=email<br/>
                    utm_campaign=monthly_update
                  </code>
                </div>
                <div>
                  <h4 className="text-weight-medium mb-2">Social Media Ad</h4>
                  <code className="block p-2 bg-black/50 rounded text-xs">
                    utm_source=facebook<br/>
                    utm_medium=cpc<br/>
                    utm_campaign=summer_sale
                  </code>
                </div>
                <div>
                  <h4 className="text-weight-medium mb-2">Partner Referral</h4>
                  <code className="block p-2 bg-black/50 rounded text-xs">
                    utm_source=partner_name<br/>
                    utm_medium=referral<br/>
                    utm_campaign=partnership_2024
                  </code>
                </div>
                <div>
                  <h4 className="text-weight-medium mb-2">QR Code</h4>
                  <code className="block p-2 bg-black/50 rounded text-xs">
                    utm_source=qr_code<br/>
                    utm_medium=offline<br/>
                    utm_campaign=event_name
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}