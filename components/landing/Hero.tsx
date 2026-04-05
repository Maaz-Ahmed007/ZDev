// components/landing/Hero.tsx  ← thin orchestrator
'use client';

import React, { useEffect, useState } from 'react';
import { HERO_KEYFRAMES } from './hero/HeroKeyframes';
import DesktopHero from './hero/DesktopHero';
import MobileHero from './hero/MobileHero';

const Hero: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Double-rAF → guaranteed after first paint
        const id = requestAnimationFrame(() =>
            requestAnimationFrame(() => setIsLoaded(true)),
        );
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <section id="hero" aria-label="Hero">
            <style dangerouslySetInnerHTML={{ __html: HERO_KEYFRAMES }} />
            <DesktopHero isLoaded={isLoaded} />
            <MobileHero isLoaded={isLoaded} />
        </section>
    );
};

export default Hero;
