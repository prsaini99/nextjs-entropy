'use client';
import React from 'react';
import Link from 'next/link';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

export default function CareersHeroSection() {
  return (
    <section>
      <div className="padding-global py-20">
        <div className="w-layout-blockcontainer container w-container">
          <div className="hero-wrapper">
            <AnimatedInViewDiv className="hero-component">
              <div className="max-width-75ch text-center">
                <h1 className="heading-2 text-weight-bold line-height-1-2">
                  Careers at StackBinary™
                </h1>
              </div>
              <div className="opacity-60">
                <div className="max-width-60ch text-center">
                  <div className="text-size-large">
                    We hire builders—people who love shipping, care about reliability and sweat the details. If you enjoy solving real problems with AI, cloud and modern software, let's talk.
                  </div>
                </div>
              </div>
              <div className="opacity-80">
                <div className="max-width-70ch text-center">
                  <div className="text-size-medium">
                    Flexible hours • Remote-friendly • Learning budget • High-ownership projects • Pragmatic engineering culture
                  </div>
                </div>
              </div>
            </AnimatedInViewDiv>
            <AnimatedInViewDiv className="double-button-component margin-top-button-hero" delay={0.2}>
              <Link href="#open-roles" className="primary-button w-inline-block">
                <div className="relative">
                  <div className="text-size-small text-weight-bold">View Open Roles</div>
                </div>
                <div className="button-elipse"></div>
              </Link>
              <Link href="#hiring-process" className="secondary-button w-inline-block relative overflow-hidden group p-[0.25rem]">
                <div className="button-wrapper relative z-10 flex items-center">
                  <div className="secondary-button-text">
                    <div className="text-weight-bold text-size-small">About Our Hiring Process</div>
                  </div>
                  <div className="button-icon">
                    <div className="icon-wrapper">
                      <img loading="lazy"
                        src="https://cdn.prod.website-files.com/66f30c8d2ac082d2aee64be2/66f30c8d2ac082d2aee64ccb_Arrow.svg"
                        alt="Arrow" className="icon transition-transform" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-[var(--color--dark-grey)] transition-transform duration-700 ease-out transform scale-x-0 origin-right"></div>
                </div>
              </Link>
            </AnimatedInViewDiv>
          </div>
        </div>
      </div>
    </section>
  );
}