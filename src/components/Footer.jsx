'use client'
import React from 'react';
import Link from 'next/link';
import AnimatedInViewDiv from './Animate/AppearInView';
import ROUTES from '@/constants/routes';
import NewsLetter from './NewsLetter';
import companylogoSvg from '@/assets/svg/stackbinary-logo.svg'
import Image from 'next/image';

const links = {
    explore: [
        { href: ROUTES.HOME, label: "Home", current: true },
        { href: ROUTES.ABOUT, label: "About" },
        { href: ROUTES.SERVICES, label: "Services" }
    ],
    // support: [
    //     // { href: "/pricing", label: "Pricing" },
    //     // { href: "/faq", label: "FAQ" }
    // ],
    others: [
        // { href: "/blog", label: "Blog" },
        // { href: "/careers", label: "Careers" },
        { href: ROUTES.CONTACT, label: "Contact" },
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
                        <AnimatedInViewDiv className="footer-heading">
                            <Image src={companylogoSvg} loading="lazy" alt="Logo Navbar" />
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

