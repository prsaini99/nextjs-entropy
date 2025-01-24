'use client';
import React, { useState } from 'react';
import AnimatedInViewDiv from '@/components/Animate/AppearInView';

const FORM_STATUS = {
    IDLE: "idle",
    SUCCESS: "success",
    ERROR: "error",
}

const initData = {
    name: '',
    email: '',
    message: '',
}

export default function ContactWrapper() {
    const [formData, setFormData] = useState(initData);
    const [status, setStatus] = useState(FORM_STATUS.IDLE);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(FORM_STATUS.IDLE);
        try {
            console.log('Submitting:', formData);
            if (!formData.name || !formData.email || !formData.message)
                throw new Error('All fields are required.');
            setLoading(true)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData(initData);
                setStatus(FORM_STATUS.SUCCESS);
            } else {
                setStatus('Failed to send message.');
                setStatus(FORM_STATUS.ERROR);
            }
        } catch (error) {
            setFormData(initData)
            setStatus(FORM_STATUS.ERROR);
        } finally {
            setLoading(false)
        }
    };

    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="contact-wrapper">
                        <AnimatedInViewDiv className="hero-component">
                            <div className="max-width-70ch">
                                <div className="heading-2 text-weight-bold">
                                    Have questions or need support?
                                </div>
                            </div>
                        </AnimatedInViewDiv>
                        <AnimatedInViewDiv className="form-wrapper w-form" delay={0.4}>
                            {status === FORM_STATUS.IDLE &&
                                <form delay={0.2} id="email-form" name="email-form" onSubmit={handleSubmit} className="form">
                                    <div className="form-content">
                                        <div className="name-wrapper-contact">
                                            <label htmlFor="name" className="text-size-medium-vw">
                                                Name
                                            </label>
                                            <input
                                                className="text-field-contact w-input"
                                                maxLength="256"
                                                name="name"
                                                placeholder="Enter your name"
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="name-wrapper-contact">
                                            <label htmlFor="email" className="text-size-medium-vw">
                                                E-mail
                                            </label>
                                            <input
                                                className="text-field-contact w-input"
                                                maxLength="256"
                                                name="email"
                                                placeholder="Enter your e-mail"
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="text-size-medium-vw">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                maxLength="5000"
                                                placeholder="Your message..."
                                                className="text-field-contact w-input"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="contact-button align-center">
                                        <button type="submit" className="primary-button" disabled={loading}>
                                            <span>
                                                {loading ? "Sending message..." : "Submit Message"}
                                            </span>
                                        </button>
                                    </div>
                                </form>}
                            {status === FORM_STATUS.SUCCESS && (
                                <AnimatedInViewDiv className="success-message">
                                    <div className="text-size-contact">Thank you! Your submission has been received!</div>
                                </AnimatedInViewDiv>
                            )}
                            {status === FORM_STATUS.ERROR && (
                                <AnimatedInViewDiv className="flex flex-col gap-10 items-center">
                                    <div className="error-message px-4 py-2">
                                        <div className="text-size-medium-contact">
                                            Oops! Something went wrong while submitting the form. Please try again.
                                        </div>
                                    </div>
                                    <div>
                                        <button className="primary-button" onClick={() => setStatus(FORM_STATUS.IDLE)}>
                                            <span>Try again</span>
                                        </button>
                                    </div>
                                </AnimatedInViewDiv>
                            )}
                        </AnimatedInViewDiv>
                    </div>
                </div>
            </div>
        </section>
    );
}
