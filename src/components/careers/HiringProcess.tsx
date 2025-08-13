'use client';
import React from 'react';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

const processSteps = [
  {
    step: '01',
    title: 'Application Review',
    description: 'We review your application and portfolio to understand your background and experience.',
    timeline: null
  },
  {
    step: '02', 
    title: 'Initial Chat',
    description: 'A casual 30-minute conversation with our hiring team to get to know you better.',
    timeline: '30 minutes'
  },
  {
    step: '03',
    title: 'Technical Discussion',
    description: 'Deep dive into your experience and approach to problem-solving. No whiteboard coding.',
    timeline: '60 minutes'
  },
  {
    step: '04',
    title: 'Team Meet',
    description: 'Meet potential teammates and learn about day-to-day collaboration.',
    timeline: '45 minutes'
  },
  {
    step: '05',
    title: 'Final Decision',
    description: 'We make our decision quickly and provide detailed feedback regardless of outcome.',
    timeline: null
  }
];

export default function HiringProcess() {
  return (
    <section id="hiring-process">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container w-container">
          <div className="steps-wrapper">
            <AnimatedInViewDiv className="header">
              <h2 className="heading-4 text-weight-medium">
                Our Hiring Process
              </h2>
              <div className="opacity-60">
                <div className="max-width-42ch">
                  <div>
                    We believe hiring should be transparent and respectful of your time. Here's exactly what to expect.
                  </div>
                </div>
              </div>
            </AnimatedInViewDiv>

            <div className="steps-stack-component">
              {processSteps.map((step, index) => (
                <AnimatedInViewDiv
                  key={step.step}
                  delay={index * 0.1}
                  className="steps-item"
                >
                  <div className="steps-card">
                    <div className="left-content">
                      <div className="steps-content">
                        <div className="steps-tag">
                          <div className="text-size-small text-weight-bold">Step</div>
                          <div className="vertical-line-tag"></div>
                          <div className="read-more-button">
                            <div className="opacity-70">
                              <div className="text-size-small text-weight-medium">{step.step}</div>
                            </div>
                          </div>
                        </div>
                        <div className="max-width-40ch">
                          <div className="heading-4 text-weight-medium">{step.title}</div>
                        </div>
                        <div className="steps-description">
                          <div>{step.description}</div>
                        </div>
                      </div>
                    </div>
                    <div className="right-content">
                      <div className="flex items-center justify-center h-full p-6">
                        {step.timeline ? (
                          <div className="text-center">
                            <div className="text-size-large text-weight-medium opacity-80 mb-2">
                              Duration
                            </div>
                            <div className="text-size-medium text-weight-medium">
                              {step.timeline}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </AnimatedInViewDiv>
              ))}
            </div>

            <AnimatedInViewDiv delay={0.6} className="mt-16">
              <div className="phase-cards-wrapper">
                <div className="phase-cards-header">
                  <div className="header">
                    <h3 className="heading-4 text-weight-medium">
                      What We Look For
                    </h3>
                  </div>
                </div>
                <div className="phase-cards-grid">
                  {[
                    {
                      title: 'Builder Mindset',
                      description: 'You ship things and care about the end result, not just the process.'
                    },
                    {
                      title: 'Learning Agility',
                      description: 'You pick up new tools and technologies quickly as the business needs them.'
                    },
                    {
                      title: 'Collaboration',
                      description: 'You communicate clearly and work well with people across different functions.'
                    }
                  ].map((item, index) => (
                    <div key={index} className="phase-cards">
                      <div className="phase-cards-content">
                        <div className="text-size-large text-weight-medium">{item.title}</div>
                        <div>{item.description}</div>
                      </div>
                      <div className="phase-number">
                        <div className="heading-1 text-weight-regular">
                          {(index + 1).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedInViewDiv>
          </div>
        </div>
      </div>
    </section>
  );
}