import React from 'react'
import Link from 'next/link'

export default function Page() {
    return (
        <div className="utility-page-wrap">
            <div data-w-id="66d8afd782991ca9e4fcf24800000000000b" className="utility-page-content">
                <h2 className="not-found-heading">404</h2>
                <p className="text-7xl mb-10">Page not found</p>
                <Link href="/" className="primary-button w-inline-block">
                    <div className="relative">
                        <div className="text-size-small text-weight-bold">Back to Home</div>
                    </div>
                    <div className="button-elipse"></div>
                </Link>
            </div>
        </div>
    )
}
