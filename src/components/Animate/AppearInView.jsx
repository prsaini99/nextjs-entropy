'use client';
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedInViewDiv = ({ children, delay = 0, ...props }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: delay, type: "spring", stiffness: 100 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedInViewDiv;
