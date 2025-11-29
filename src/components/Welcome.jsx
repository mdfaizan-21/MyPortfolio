import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";

const FONT_WEIGHT = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span key={i}
              className={`inline-block ${className}`}
              style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setUpTextHover = (container, type) => {
    if (!container) return () => {};

    const letters = container.querySelectorAll('span');
    const { min, max, base } = FONT_WEIGHT[type];

    // 1. CACHE METRICS: Store center X AND center Y
    let letterMetrics = [];

    const calculateMetrics = () => {
        letterMetrics = Array.from(letters).map(letter => {
            const rect = letter.getBoundingClientRect();
            return {
                el: letter,
                centerX: rect.left + window.scrollX + (rect.width / 2),
                centerY: rect.top + window.scrollY + (rect.height / 2) // Added Y center
            };
        });
    };

    calculateMetrics();
    window.addEventListener('resize', calculateMetrics);

    const animateLetter = (letter, weight, duration = 0.25) => {
        gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `'wght' ${weight}`,
            overwrite: 'auto',
        });
    };

    const handleMouseMove = (e) => {
        const mouseX = e.clientX + window.scrollX;
        const mouseY = e.clientY + window.scrollY; // Track Y position

        letterMetrics.forEach(({ el, centerX, centerY }) => {
            // 2. CALCULATE 2D DISTANCE
            const dx = mouseX - centerX;
            const dy = mouseY - centerY;

            // We need distance squared (d^2) for the Gaussian formula anyway.
            // avoiding Math.sqrt() improves performance.
            const distanceSq = dx * dx + dy * dy;

            // 150px radius = 22500px squared
            if (distanceSq < 22500) {
                // Formula: e^(-d^2 / spread)
                const intensity = Math.exp(-distanceSq / 21000);
                const newWeight = min + (max - min) * intensity;
                animateLetter(el, newWeight);
            } else {
                animateLetter(el, base);
            }
        });
    };

    const handleMouseLeave = () => {
        letters.forEach(letter => {
            animateLetter(letter, base, 0.5);
        });
    };

    // Attach to window so the effect feels continuous even if you hover slightly outside the div
    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('resize', calculateMetrics);
        window.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
    };
};

const Welcome = () => {
    const titleref = useRef(null);
    const subTitleRef = useRef(null);

    useGSAP(() => {
        if (!titleref.current || !subTitleRef.current) return;

        const titleCleanUp = setUpTextHover(titleref.current, "title");
        const subtitleCleanUp = setUpTextHover(subTitleRef.current, "subtitle");

        return () => {
            titleCleanUp();
            subtitleCleanUp();
        };
    }, []);

    return (
        <section id="welcome" className="p-10 h-screen flex flex-col justify-center">
            <p ref={titleref} className="block w-full">
                {renderText("Hey, I am Mohd Faizan ! Welcome to my", "text-3xl font-georama cursor-default", 100)}
            </p>
            <h1 ref={subTitleRef} className="mt-8">
                {renderText("Portfolio", "text-9xl italic font-georama cursor-default")}
            </h1>

            <div className="small-screen bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mt-10" role="alert">
                <p className="font-bold">⚠️ Warning</p>
                <p>This portfolio is designed for laptop and tablet screens only.</p>
            </div>
        </section>
    );
};

export default Welcome;