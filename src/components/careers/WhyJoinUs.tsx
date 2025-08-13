'use client';
import React from 'react';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

const values = [
  {
    title: 'Impact over theatrics',
    description: 'We value business outcomes and customer delight more than flashy tech for its own sake.'
  },
  {
    title: 'Ship responsibly',
    description: 'Clean code, automated tests, measurable releases.'
  },
  {
    title: 'Growth',
    description: 'Mentorship, brown-bags and conference support.'
  }
];

export default function WhyJoinUs() {
  return (
    <section>
      <div className="padding-global">
        <div className="w-layout-blockcontainer container w-container">
          <div className="phase-cards-wrapper">
            <AnimatedInViewDiv className="phase-cards-header">
              <div className="header">
                <h2 className="heading-4 text-weight-medium">
                  Why Join Us
                </h2>
              </div>
            </AnimatedInViewDiv>
            <div className="phase-cards-grid">
              {values.map((value, index) => (
                <AnimatedInViewDiv delay={index * 0.2} className="phase-cards" key={index}>
                  <div className="phase-cards-content">
                    <div className="text-size-large text-weight-medium">{value.title}</div>
                    <div>{value.description}</div>
                  </div>
                  <div className="phase-number">
                    <div className="heading-1 text-weight-regular">
                      {(index + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                </AnimatedInViewDiv>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}