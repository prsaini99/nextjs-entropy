'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, MotionConfig } from "framer-motion";
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes'
// import logoSvg from '@/assets/svg/logo.svg'
import Image from 'next/image';

export default function Header() {
    return (
        <div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease"
            role="banner" className="navbar w-nav">
            <div className="padding-global">
                <div className="container w-container">
                    <div className="navbar-component">
                        <Link href="/" aria-current="page" className="brand w-nav-brand w--current">
                            <Image src="/stack-logo.png" width={150} height={40} loading="lazy" alt="StackBinary™ Logo" />
                        </Link>
                        <div className="nav-menu-wrap">
                            <div>
                                <nav role="navigation" className="nav-menu w-nav-menu">
                                    <Link href={ROUTES.HOME} aria-current="page" className="nav-link w-inline-block w--current">
                                        <div>Home</div>
                                    </Link>
                                    <Link href={ROUTES.ABOUT} className="nav-link w-inline-block">
                                        <div>About</div>
                                    </Link>
                                    <Link href={ROUTES.SERVICES} className="nav-link w-inline-block">
                                        <div>Services</div>
                                    </Link>
                                    <Link href={ROUTES.CAREERS} className="nav-link w-inline-block">
                                        <div>Careers</div>
                                    </Link>
                                    <div className="mobile-navbar-content">
                                        <Link href={ROUTES.CONTACT} className="primary-button w-inline-block">
                                            <div className="text-size-small text-weight-bold">Contact Us</div>
                                        </Link>
                                    </div>
                                </nav>
                                <DropDown />
                            </div>
                            <div className="right-navbar-content">
                                <Link href={ROUTES.CONTACT} className="primary-button w-inline-block">
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


const Toggle = ({ open, setOpen }) => {
    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <motion.button
                initial={false}
                animate={open ? "open" : "closed"}
                onClick={() => setOpen((pv) => !pv)}
                className={`relative h-12 w-12 rounded-lg bg-white/0 transition-colors ${open ? "bg-white/20" : ""}`}
            >
                <motion.span
                    variants={VARIANTS.top}
                    className="absolute h-1 w-6 bg-white"
                    style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
                />
                <motion.span
                    variants={VARIANTS.middle}
                    className="absolute h-1 w-6 bg-white"
                    style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
                />
                <motion.span
                    variants={VARIANTS.bottom}
                    className="absolute h-1 w-3 bg-white"
                    style={{
                        x: "-50%",
                        y: "50%",
                        bottom: "35%",
                        left: "calc(50% + 6px)",
                    }}
                />
            </motion.button>
        </MotionConfig>
    )
}

const DropDown = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const handleClickOutside = (event) => {
        if (event.target.closest('.dropdown-container') === null) setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (to = ROUTES.HOME) => {
        setOpen(false)
        setTimeout(() => router.push(to), 1000);
    };

    return (
        <div className="dropdown-container flex items-center justify-center xlg:hidden">
            <motion.div animate={open ? "open" : "closed"} className="relative">
                <Toggle {...{ open, setOpen }} />

                <motion.ul
                    initial={wrapperVariants.closed}
                    variants={wrapperVariants}
                    style={{ originY: "top" }}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-full right-0 z-50 w-36 overflow-hidden"
                >
                    {[
                        { title: "Home", to: ROUTES.HOME },
                        { title: "About", to: ROUTES.ABOUT },
                        { title: "Services", to: ROUTES.SERVICES },
                        { title: "Careers", to: ROUTES.CAREERS },
                        { title: "Contact us", to: ROUTES.CONTACT },
                    ].map((item, index) => (
                        <Option key={index} setOpen={() => handleOptionClick(item.to)} text={item.title} />
                    ))}
                </motion.ul>
            </motion.div>
        </div>
    );
};

const Option = ({ text, setOpen }) => {
    return (
        <motion.li
            variants={itemVariants}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 w-full p-2 font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-[#ed5145] transition-colors cursor-pointer"
        >
            <span>{text}</span>
        </motion.li>
    );
};

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const VARIANTS = {
    top: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            top: ["35%", "50%", "50%"],
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            top: ["50%", "50%", "35%"],
        },
    },
    middle: {
        open: {
            rotate: ["0deg", "0deg", "-45deg"],
        },
        closed: {
            rotate: ["-45deg", "0deg", "0deg"],
        },
    },
    bottom: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            bottom: ["35%", "50%", "50%"],
            left: "50%",
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            bottom: ["50%", "50%", "35%"],
            left: "calc(50% + 6px)",
        },
    },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};
