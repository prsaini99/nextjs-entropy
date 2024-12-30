import React from 'react'
import Link from 'next/link'
import ROUTES from '@/constants/routes'
import ArrowRight from '@/assets/svg/ArrowRight'

export function MoreAImodels() {
    return (
        <Link href={ROUTES.FEATURES} className="read-more-tag w-inline-block animate-slideUpFadeIn-0.5">
            <div className="text-size-small text-weight-bold">More AI models</div>
            <div className="vertical-line-tag"></div>
            <div className="read-more-button">
                <div className="opacity-50">
                    <div className="text-size-small text-weight-bold">Read more</div>
                </div>
                <ArrowRight />
            </div>
        </Link>
    )
}

export function LearnMoreButton({
    title = "Learn More",
    routeTo = ROUTES.FEATURES
}) {
    return (
        <Link href={routeTo} className="secondary-button w-inline-block">
            <div className="button-wrapper">
                <div className="secondary-button-text">
                    <div className="text-weight-bold text-size-small">{title}</div>
                </div>
                <div className="button-icon">
                    <div className="icon-wrapper">
                        <img loading="lazy"
                            src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ccb_Arrow.svg"
                            alt="Arrow" className="icon" />
                    </div>
                </div>
                <div className="button-icon absolute"></div>
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