import { useState, useEffect, useLayoutEffect, useContext, useRef } from 'react';
import { PreviewContext } from '@/components/preview/LivePreviewProvider';

export function useHeaderState(sticky: boolean, transparentOnTop: boolean, bottomBorder: boolean, backgroundStyle: string = 'frosted', instanceId?: string, initialHeight: number = 80) {
    const { isPreviewMode, selectedInstanceId } = useContext(PreviewContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect(() => {
        if (!headerRef.current) return;

        // Synchronous measurement before first paint to prevent any flash/jump
        const updateHeight = (height: number) => {
            document.documentElement.style.setProperty('--header-height', `${height}px`);
            
            // Only update offset if it differs significantly from the SSR guess
            // This prevents tiny (1-5px) layout shifts during hydration due to font rendering differences
            if (Math.abs(height - initialHeight) > 10) {
                document.documentElement.style.setProperty('--header-offset', transparentOnTop ? `${height}px` : '0px');
            }
        };

        updateHeight(headerRef.current.clientHeight);

        // Observe header height for future dynamic changes (window resize, wrapping)
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                updateHeight(entry.target.clientHeight);
            }
        });
        ro.observe(headerRef.current);

        return () => ro.disconnect();
    }, [transparentOnTop]);

    let positionClass = 'relative w-full z-50';
    if (transparentOnTop) {
        positionClass = sticky ? 'fixed top-0 left-0 right-0 z-50' : 'absolute top-0 left-0 right-0 z-50';
    } else {
        positionClass = sticky ? 'sticky top-0 left-0 right-0 z-50' : 'relative w-full z-50';
    }

    const isTransparent = transparentOnTop && !isScrolled;
    
    let bgClass = 'bg-background/80 backdrop-blur-xl'; // fallback
    if (isTransparent || backgroundStyle === 'transparent') {
        bgClass = 'bg-transparent';
    } else if (backgroundStyle === 'solid') {
        bgClass = 'bg-background';
    } else {
        bgClass = 'bg-background/80 backdrop-blur-xl';
    }

    const borderClass = isTransparent || backgroundStyle === 'transparent' ? 'border-transparent border-b' : (bottomBorder ? 'border-b border-border/60' : '');

    let previewClasses = '';
    if (isPreviewMode) {
        const isSelected = selectedInstanceId === instanceId;
        previewClasses = `hover:border-primary/50 border-2 ${isSelected ? 'border-primary/50 ring-2 ring-primary ring-inset z-[60]' : 'border-transparent'}`;
    }

    return {
        headerClass: `${positionClass} ${bgClass} ${borderClass} ${previewClasses} transition-all duration-300`,
        headerRef,
        headerInitialStyle: `:root { --header-offset: ${transparentOnTop ? initialHeight + 'px' : '0px'}; --header-height: ${initialHeight}px; }`
    };
}
