import { useState, useEffect, useContext } from 'react';
import { PreviewContext } from '@/components/preview/LivePreviewProvider';

export function useHeaderState(sticky: boolean, transparentOnTop: boolean, bottomBorder: boolean, backgroundStyle: string = 'frosted', instanceId?: string) {
    const { isPreviewMode, selectedInstanceId } = useContext(PreviewContext);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
    };
}
