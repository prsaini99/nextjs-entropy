"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import ROUTES from '@/constants/routes'
import ArrowRight from '@/assets/svg/ArrowRight'

export function MoreAImodels() {
    return (
        <Link href={ROUTES.ABOUT} className="read-more-tag w-inline-block animate-slideUpFadeIn-0.5">
            <div className="text-size-small text-weight-bold">About us</div>
            <div className="vertical-line-tag"></div>
            <div className="read-more-button opacity-50 hover:opacity-100">
                <div className="text-size-small text-weight-bold">Read more</div>
                <ArrowRight />
            </div>
        </Link>
    )
}

export function LearnMoreButton({
    title = "Learn More",
    routeTo = ROUTES.SERVICES
}) {
    const [hover, setHover] = useState(false);

    return (
        <Link href={routeTo}
            className="secondary-button w-inline-block relative overflow-hidden group p-[0.25rem]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <div className="button-wrapper relative z-10 flex items-center">
                <div className="secondary-button-text">
                    <div className="text-weight-bold text-size-small">{title}</div>
                </div>
                <div className="button-icon">
                    <div className="icon-wrapper">
                        <img loading="lazy"
                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ccb_Arrow.svg"
                            alt="Arrow" className="icon transition-transform" />
                    </div>
                </div>
                <div className={`absolute inset-0 bg-[var(--color--dark-grey)] transition-transform duration-700 ease-out transform ${hover ? 'scale-x-100 origin-right' : 'scale-x-0 origin-right'}`}></div>
            </div>
        </Link>
    )
}

export function GetStarted() {
    return (
        <Link href={ROUTES.CONTACT} className="primary-button w-inline-block">
            <div className="relative">
                <div className="text-size-small text-weight-bold">Get Started</div>
            </div>
            <div className="button-elipse"></div>
        </Link>
    )
}