'use client';
import React, { useState } from 'react';
import AnimatedInViewDiv from './Animate/AppearInView';

const FORM_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
};

export default function NewsLetter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(FORM_STATUS.IDLE);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(FORM_STATUS.LOADING);

        try {
            console.log('Submitting email:', email);
            if (!email) throw new Error('Email is required.');

            // Simulating a successful submission
            setTimeout(() => {
                setStatus(FORM_STATUS.SUCCESS);
            }, 1000);
        } catch (error) {
            console.error('Error submitting email:', error);
            setEmail('');
            setStatus(FORM_STATUS.ERROR);
        }
    };

    return (
        <div className="flex flex-col items-start max-w-lg">
            <div className="mb-4 space-y-4">
                <div className="flex flex-col items-start">
                    <h1 className="text-center framer-text framer-styles-preset-1nktfmp">
                        Get Practical AI, Cloud & DevOps Tips Monthly
                    </h1>
                </div>
                <div className="flex flex-col items-start">
                    <p>
                        One email a month with playbooks, case studies and tooling tips—no spam.
                    </p>
                </div>
            </div>
            <div className="w-full relative flex justify-center items-center mb-6">
                {status === FORM_STATUS.IDLE && (
                    <form className="w-full grid gap-4 grid-cols-[1fr_max-content]" onSubmit={handleSubmit}>
                        <div className="absolute invisible" aria-hidden="true">
                            <input type="text" tabIndex="-1" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@email.com"
                            className="appearance-none w-full leading-normal outline-none border-none p-4 rounded-lg font-normal text-lg bg-gray-200 text-black shadow-inner"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                        <div className="relative">
                            <input
                                type="submit"
                                className="appearance-none w-full leading-normal outline-none border-none cursor-pointer rounded-lg p-4 font-semibold text-lg bg-white bg-opacity-10 text-white z-10 opacity-100"
                                value="Sign Up"
                            />
                        </div>
                    </form>
                )}
                {status === FORM_STATUS.LOADING && (
                    <div className="loading-message text-center">
                        Submitting your email...
                    </div>
                )}
                {status === FORM_STATUS.SUCCESS && (
                    <AnimatedInViewDiv className="success-message text-center text-green-500 px-4">
                        Thank you! You've successfully subscribed to our newsletter.
                    </AnimatedInViewDiv>
                )}
                {status === FORM_STATUS.ERROR && (
                    <AnimatedInViewDiv className="flex flex-col items-center px-4">
                        <p className='text-red-500'>Oops! Something went wrong. Please try again.</p>
                        <div>
                            <button
                                className="mt-4 primary-button"
                                onClick={() => setStatus(FORM_STATUS.IDLE)}
                            >
                                Try Again
                            </button>
                        </div>
                    </AnimatedInViewDiv>
                )}
            </div>
        </div>
    );
}
