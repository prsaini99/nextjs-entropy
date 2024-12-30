'use client'
import React from 'react'
import Link from 'next/link'
import AnimatedInViewDiv from '@/components/Animate/AppearInView'

export default function Page() {

    return (
        <div className="utility-page-wrap">
            <AnimatedInViewDiv className="utility-page-content">
                <h2 className="not-found-heading">404</h2>
                <p className="text-7xl mb-10">Page not found</p>
                <Link href="/" className="primary-button w-inline-block">
                    <div className="relative">
                        <div className="text-size-small text-weight-bold">Back to Home</div>
                    </div>
                    <div className="button-elipse"></div>
                </Link>
            </AnimatedInViewDiv>
        </div>
    )
}
