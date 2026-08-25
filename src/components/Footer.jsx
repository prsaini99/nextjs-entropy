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
                    <div className="footer-component">
                        <AnimatedInViewDiv className="footer-heading mb-6">
                            <Image src="/stack-logo.png" width={120} height={32} loading="lazy" alt="StackBinary™ Logo" className="max-w-[120px] h-auto" />
                        </AnimatedInViewDiv>
                        <div className="w-layout-grid footer-grid">
                            {Object.entries(links).map(([category, items], index) => (
                                <AnimatedInViewDiv key={index} delay={index * .2} className="footer-grid-wrap">
                                    <div className="text-size-large text-weight-medium">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                                    <div className="footer-links-wrapper">
                                        {items.map(item => (
                                            <Link key={item.href} href={item.href} className={`footer-link ${item.current ? "w--current" : ""}`}>{item.label}</Link>
                                        ))}
                                    </div>
                                </AnimatedInViewDiv>
                            ))}
                        </div>
                        <AnimatedInViewDiv className="my-8">
                            <NewsLetter />
                        </AnimatedInViewDiv>
                        <div className="footer-links-wrapper animate-slideUpFadeIn-1">
                            <div className="credits-wrapper">
                                <p className="paragraph space-x-2">
                                    <span className=''>© {new Date().getFullYear()} Stackbinary.io. All rights reserved.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

