'use client'
import React from "react";
// import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.component = props.componentName || "";
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        console.info(`Logs error static :>> `, error);
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Handle the error, e.g., log it or display a user-friendly message
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // Display a user-friendly error message
            return (
                <div className="flex flex-col items-center justify-center h-screen w-screen">
                    <div>
                        {/* <img
                            src={appIcons.logo}
                            alt="Credit repair"
                            className="h-full object-contain"
                        /> */}
                        Logo
                    </div>
                    <div className="my-4">
                        Something Went Wrong. Please try again.
                    </div>
                    <div className="my-4">
                        Error in component: {this.component}
                    </div>
                    <div className="primary-button w-inline-block" onClick={() => this.setState({ hasError: false })}>
                        <div className="text-size-small text-weight-bold">Try again</div>
                    </div>
                </div>
            );
        }
        // Render the child components normally
        return this.props.children;
    }
}

// ErrorBoundary.propTypes = {
//     children: PropTypes.node.isRequired,
//     componentName: PropTypes.string,
// };

export default ErrorBoundary;