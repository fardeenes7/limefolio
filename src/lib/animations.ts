import { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

/**
 * Hook for staggering a text reveal animation.
 * Ideal for Hero headlines.
 */
export const useStaggeredReveal = (
    ref: RefObject<HTMLElement | null>,
    delay = 0,
    dependencies: any[] = []
) => {
    useGSAP(() => {
        if (!ref.current || prefersReducedMotion()) return;

        const element = ref.current;
        const chars = element.querySelectorAll('.char'); // Assume text is split into chars or lines

        if (chars.length === 0) return;

        gsap.fromTo(
            chars,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.02,
                ease: "power3.out",
                delay,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                }
            }
        );
    }, { scope: ref, dependencies });
};

/**
 * Hook for a simple fade up as element enters viewport
 */
export const useFadeUp = (
    ref: RefObject<HTMLElement | null>,
    yOffset = 30,
    delay = 0,
    dependencies: any[] = []
) => {
    useGSAP(() => {
        if (!ref.current || prefersReducedMotion()) return;

        const element = ref.current;

        gsap.fromTo(
            element,
            { y: yOffset, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                }
            }
        );
    }, { scope: ref, dependencies });
};

/**
 * Hook for horizontal scrolling filmstrip effect
 */
export const useHorizontalScroll = (
    containerRef: RefObject<HTMLElement | null>,
    wrapperRef: RefObject<HTMLElement | null>,
    dependencies: any[] = []
) => {
    useGSAP(() => {
        if (!containerRef.current || !wrapperRef.current || prefersReducedMotion()) return;

        const container = containerRef.current;
        const wrapper = wrapperRef.current;

        const scrollWidth = wrapper.scrollWidth - window.innerWidth;
        if (scrollWidth <= 0) return;

        gsap.to(wrapper, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${scrollWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: containerRef, dependencies });
};

/**
 * Hook for parallax effect
 */
export const useParallax = (
    ref: RefObject<HTMLElement | null>,
    speed = 0.5,
    dependencies: any[] = []
) => {
    useGSAP(() => {
        if (!ref.current || prefersReducedMotion()) return;

        const element = ref.current;

        gsap.to(element, {
            y: () => (element.offsetHeight * speed),
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: ref, dependencies });
};

