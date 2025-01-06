'use client'
import React from 'react';
import Link from 'next/link';
import AnimatedInViewDiv from './Animate/AppearInView';
import ROUTES from '@/constants/routes';

const links = {
    explore: [
        { href: ROUTES.HOME, label: "Home", current: true },
        { href: ROUTES.ABOUT, label: "About" },
        { href: ROUTES.FEATURES, label: "Features" }
    ],
    support: [
        { href: ROUTES.CONTACT, label: "Contact" },
        { href: "/pricing", label: "Pricing" },
        { href: "/faq", label: "FAQ" }
    ],
    others: [
        { href: "/blog", label: "Blog" },
        { href: "/careers", label: "Careers" },
        { href: "/privacy-policy", label: "Privacy Policy" },
    ],
};

const socialLinks = [
    { href: "https://webflow.com/templates/designers/lucas-gusso", iconSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c59_Social%20Icons%2004.svg", alt: "Twitter Icon" },
    { href: "https://www.instagram.com/lucas.webflow/", iconSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c5b_Social%20Icons%2003.svg", alt: "Facebook Icon" },
    { href: "https://webflow.com/templates/designers/lucas-gusso", iconSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c5a_Social%20Icons%2002.svg", alt: "Instagram Icon" },
    { href: "https://www.instagram.com/lucas.webflow/", iconSrc: "https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64c58_Social%20Icons%2001.svg", alt: "Github Icon" }
];

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
                            <img loading="lazy"
                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cca_Entropy%C2%AE.svg"
                                alt="Entropy Logo" />
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
                        <AnimatedInViewDiv className="footer-social-wrapper">
                            {socialLinks.map((link, index) => (
                                <Link key={index} href={link.href} className="footer-social w-inline-block">
                                    <img loading="lazy" src={link.iconSrc} alt={link.alt} className="icon-embed" />
                                </Link>
                            ))}
                        </AnimatedInViewDiv>
                        <div className="footer-links-wrapper animate-slideUpFadeIn-1">
                            <p className="paragraph">Stay updated with the latest in IT solutions.  <Link href="https://webflow.com/" target="_blank" className="credits w-inline-block"><span className='font-bold'>Subscribe to our newsletter.</span></Link> </p>
                            <div className="credits-wrapper">
                                <p className="paragraph">2025</p>
                                <Link href="https://webflow.com/" target="_blank" className="credits w-inline-block">
                                    <p className="paragraph">
                                        entropy
                                    </p>
                                </Link>
                                <p className="paragraph"> All rights reserved. Crafted with care and a dash of humor.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

