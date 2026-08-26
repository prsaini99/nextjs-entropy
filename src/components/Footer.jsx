'use client'
import React from 'react';
import Link from 'next/link';
import AnimatedInViewDiv from './Animate/AppearInView';
import ROUTES from '@/constants/routes';
import NewsLetter from './NewsLetter';
import Image from 'next/image';

// The footer renders on every page, so it is the one place a link reaches the
// whole site at once — including the homepage, which Google crawls every couple
// of days. Until 2026-08-24 this listed five links and omitted MarTech,
// Industries, Case Studies, Careers and Insights entirely, which left those
// sections reachable only from the navbar or the sitemap. Search Console showed
// the consequence: every AI services page listing sitemap.xml as its ONLY
// referring URL, crawled once on Aug 16 and not revisited.
const links = {
    explore: [
        { href: ROUTES.HOME, label: "Home", current: true },
        { href: ROUTES.ABOUT, label: "About" },
        { href: ROUTES.SERVICES, label: "Services" },
        { href: ROUTES.MARTECH, label: "AI Marketing & MarTech" },
        { href: ROUTES.AI_AUTOMATION, label: "AI Automation" },
    ],
    company: [
        { href: ROUTES.INDUSTRIES, label: "Industries" },
        { href: ROUTES.CASE_STUDIES, label: "Case Studies" },
        { href: "/insights", label: "Insights" },
        { href: ROUTES.CAREERS, label: "Careers" },
    ],
    others: [
        { href: ROUTES.CONTACT, label: "Contact" },
        { href: ROUTES.HIRE_DEVELOPERS, label: "Hire Developers" },
        { href: "/privacy-policy", label: "Privacy Policy" },
    ],
};


const footerLinks = [
    { href: "#", label: "License" },
    { href: "#", label: "Style Guide" },
    { href: "https://templatestudio.webflow.io/", label: "Customize" }
];

export default function Footer() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    {/* Horizontal footer. The Webflow classes (.footer-component,
                        .footer-grid, .footer-grid-wrap) forced a centred column
                        stack with padding-top:10rem, a 5rem logo margin and only
                        two grid columns, so the third link group wrapped onto its
                        own row and the footer ran taller than most viewports.
                        Layout is Tailwind here; .footer-link is kept because it
                        carries the link colour and size. */}
                    <div className="flex flex-col gap-12 pt-24 pb-8">
                        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
                            {/* Brand and newsletter share the left half */}
                            <AnimatedInViewDiv className="lg:w-2/5 flex flex-col gap-6">
                                <Image
                                    src="/stack-logo.png"
                                    width={120}
                                    height={32}
                                    loading="lazy"
                                    alt="Stackbinary Logo"
                                    className="max-w-[120px] h-auto"
                                />
                                <NewsLetter />
                            </AnimatedInViewDiv>

                            {/* Link groups span the right half, side by side */}
                            <div className="lg:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
                                {Object.entries(links).map(([category, items], index) => (
                                    <AnimatedInViewDiv
                                        key={category}
                                        delay={index * 0.1}
                                        className="flex flex-col items-start gap-3"
                                    >
                                        <div className="text-size-medium text-weight-medium">
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </div>
                                        <div className="flex flex-col items-start gap-2">
                                            {items.map(item => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`footer-link ${item.current ? "w--current" : ""}`}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </AnimatedInViewDiv>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <p className="paragraph text-size-small">
                                © {new Date().getFullYear()} Stackbinary.io. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
