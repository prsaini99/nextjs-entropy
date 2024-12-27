import React from 'react'

export default function ContactWrapper() {
    return (
        <section>
            <div className="padding-global">
                <div className="w-layout-blockcontainer container w-container">
                    <div className="contact-wrapper">
                        <div className="hero-component">
                            <div data-w-id="8b742f1a-d0e3-4767-e898-d3a96ddf6063" className="max-width-70ch">
                                <div className="heading-2 text-weight-bold">
                                    Have questions or need support?
                                </div>
                            </div>
                        </div>
                        <div id="w-node-db289675-c74d-bc81-254e-a35a802fe12b-aee64c4f"
                            data-w-id="db289675-c74d-bc81-254e-a35a802fe12b"
                            className="form-wrapper w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" method="get" className="form"
                                data-wf-page-id="66f30c8d2ac082d2aee64c4f"
                                data-wf-element-id="db289675-c74d-bc81-254e-a35a802fe12c">
                                <div className="form-content">
                                    <div className="name-wrapper-contact">
                                        <label htmlFor="Name" className="text-size-medium-vw">Name</label>
                                        <input className="text-field-contact w-input" maxLength="256" name="Name"
                                            data-name="Name" placeholder="Enter your name" type="text" id="Name"
                                            required="" />
                                    </div>
                                    <div className="name-wrapper-contact">
                                        <label htmlFor="Enter-Your-Email" className="text-size-medium-vw">E-mail</label>
                                        <input className="text-field-contact w-input" maxLength="256"
                                            name="Enter-Your-Email" data-name="Enter Your Email"
                                            placeholder="Enter your e-mail" type="email" id="Enter-Your-Email"
                                            required="" />
                                    </div>
                                    <label htmlFor="Text-Field" className="text-size-medium-vw">Message</label>
                                    <textarea id="Text-Field" name="Text-Field" maxLength="5000" data-name="Text Field"
                                        placeholder="Your message..." className="text-field-contact w-input"></textarea>
                                </div>
                                <div className="contact-button align-center">
                                    <div className="primary-button">
                                        <input type="submit" data-wait="Please wait..." className="submit-button w-button"
                                            value="Submit" />
                                        <div className="relative">
                                            <div className="text-size-small text-weight-bold">Submit Message</div>
                                        </div>
                                        <div className="button-elipse"></div>
                                    </div>
                                </div>
                            </form>
                            <div className="success-message w-form-done">
                                <div className="text-size-contact">Thank you! Your submission has been received!</div>
                            </div>
                            <div className="error-message w-form-fail">
                                <div className="text-size-medium-contact">Oops! Something went wrong while submitting the
                                    form.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
