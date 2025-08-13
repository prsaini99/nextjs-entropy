'use client';
import React from 'react';
import Link from 'next/link';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';
import { services } from '@/data/services';

export default function ServicesGrid() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <AnimatedInViewDiv className="text-center mb-16">
                        <div className="heading-4 text-weight-bold mb-4">
                            Explore Our Individual Services
                        </div>
                        <div className="opacity-60">
                            <div className="max-width-60ch mx-auto">
                                <div className="text-size-regular">
                                    Dive deep into each service we offer. From custom software development to AI solutions, we've got your business covered with specialized expertise.
                                </div>
                            </div>
                        </div>
                    </AnimatedInViewDiv>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <AnimatedInViewDiv key={service.slug} delay={index * 0.05}>
                                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={service.imageSrc}
                                            alt={service.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="gradient-overlay"></div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex items-start gap-3 mb-3">
                                            {service.icon && (
                                                <div className="features-icon-wrapper flex-shrink-0">
                                                    <img src={service.icon} alt="Service Icon" className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div className="text-size-medium text-weight-medium group-hover:text-primary transition-colors">
                                                {service.title}
                                            </div>
                                        </div>
                                        
                                        <div className="opacity-70 text-size-small mb-6">
                                            {service.description.length > 120 
                                                ? service.description.substring(0, 120) + '...'
                                                : service.description
                                            }
                                        </div>
                                        
                                        <Link href={`/services/${service.slug}`} className="primary-button w-inline-block w-full">
                                            <div className="relative">
                                                <div className="text-size-small text-weight-bold">Learn More</div>
                                            </div>
                                            <div className="button-elipse"></div>
                                        </Link>
                                    </div>
                                </div>
                            </AnimatedInViewDiv>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}