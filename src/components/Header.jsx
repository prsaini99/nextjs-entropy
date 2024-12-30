import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease"
            role="banner" className="navbar w-nav">
            <div className="padding-global">
                <div className="container w-container">
                    <div className="navbar-component">
                        <Link href="/" data-w-id="6deb3682-e1f7-9f5f-adeb-87fc1448026f" aria-current="page"
                            className="brand w-nav-brand w--current"><img
                                src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64cc9_Logo%20Navbar.svg"
                                loading="lazy" alt="Logo Navbar" /></Link>
                        <div className="nav-menu-wrap">
                            <div>
                                <nav role="navigation" className="nav-menu w-nav-menu">
                                    <Link href="/" aria-current="page" className="nav-link w-inline-block w--current">
                                        <div>Home</div>
                                    </Link>
                                    <Link href="/about" className="nav-link w-inline-block">
                                        <div>About</div>
                                    </Link>
                                    <Link href="/features" className="nav-link w-inline-block">
                                        <div>Features</div>
                                    </Link>
                                    {/* <Link href="/pricing" className="nav-link w-inline-block">
                                        <div>Pricing</div>
                                    </Link> */}
                                    <div className="mobile-navbar-content">
                                        {/* <Link href="/blog" className="link-block-navbar w-inline-block">
                                            <div>What’s New</div>
                                        </Link>
                                        <Link href="/faq" className="link-block-navbar w-inline-block">
                                            <div>Help</div>
                                        </Link> */}
                                        <Link href="/contact-us" className="primary-button w-inline-block">
                                            <div className="text-size-small text-weight-bold">Contact Us</div>
                                        </Link>
                                    </div>
                                </nav>
                                <div className="nav-menu-wrap">
                                    <div className="menu-button w-nav-button">
                                        <div className="menu-icon w-icon-nav-menu"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="right-navbar-content">
                                {/* <Link href="/blog" className="link-block-navbar w-inline-block">
                                    <div>What’s New</div>
                                </Link>
                                <Link href="/faq" className="link-block-navbar w-inline-block">
                                    <div>Help</div>
                                </Link> */}
                                <Link href="/contact-us" className="primary-button w-inline-block">
                                    <div className="relative">
                                        <div className="text-size-small text-weight-bold">Contact Us</div>
                                    </div>
                                    <div className="button-elipse"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
