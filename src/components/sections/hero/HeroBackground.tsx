import React from 'react';
import type { ResolvedSection } from '@/templates/types';
import { Meteors } from '@/components/effects/meteors';
import { DotPattern } from '@/components/effects/dot-pattern';
import { RetroGrid } from '@/components/effects/retro-grid';
import { FlickeringGrid } from '@/components/effects/flickering-grid';
import { AnimatedGridPattern } from '@/components/effects/animated-grid-pattern';
import { Ripple } from '@/components/effects/ripple';
import { GridPattern } from '@/components/effects/grid-pattern';
import { HexagonPattern } from '@/components/effects/hexagon-pattern';
import { StripedPattern } from '@/components/effects/striped-pattern';
import { InteractiveGridPattern } from '@/components/effects/interactive-grid-pattern';
import { NoiseTexture } from '@/components/effects/noise-texture';
import { BackgroundGradientAnimation } from '@/components/effects/background-gradient-animation';
import { WavyBackground } from '@/components/effects/wavy-background';
import { Boxes } from '@/components/effects/background-boxes';
import { BackgroundBeams } from '@/components/effects/background-beams';
import { BackgroundBeamsWithCollision } from '@/components/effects/background-beams-with-collision';
import { BackgroundLines } from '@/components/effects/background-lines';
import { AuroraBackground } from '@/components/effects/aurora-background';
import { StarsBackground } from '@/components/effects/stars-background';
import { ShootingStars } from '@/components/effects/shooting-stars';
import { Spotlight } from '@/components/effects/spotlight';
import { LampContainer } from '@/components/effects/lamp';
export function HeroBackground({ section }: { section: ResolvedSection }) {
    const i = section.resolvedInputs as Record<string, unknown>;
    const backgroundType = i.backgroundType as string;

    if (backgroundType === 'image' && i.backgroundImage) {
        return (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <img
                    src={i.backgroundImage as string}
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-30"
                />
            </div>
        );
    }

    if (backgroundType === 'video' && i.backgroundVideo) {
        return (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <video
                    src={i.backgroundVideo as string}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                />
            </div>
        );
    }

    if (backgroundType === 'effect') {
        switch (i.backgroundEffect) {
            case 'meteors':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                        <Meteors number={20} />
                    </div>
                );
            case 'dot_pattern':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <DotPattern />
                    </div>
                );
            case 'retro_grid':
                return (
                    <div className="absolute inset-x-0 -top-[20%] bottom-0 w-full h-[120%] pointer-events-none">
                        <RetroGrid className="opacity-50" angle={60} />
                    </div>
                );
            case 'flickering_grid':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <FlickeringGrid className="opacity-50" squareSize={4} gridGap={6} color="#6B7280" maxOpacity={0.5} flickerChance={0.1} />
                    </div>
                );
            case 'animated_grid':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <AnimatedGridPattern />
                    </div>
                );
            case 'ripple':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                        <Ripple />
                    </div>
                );
            case 'grid_pattern':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <GridPattern />
                    </div>
                );
            case 'hexagon_pattern':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <HexagonPattern />
                    </div>
                );
            case 'striped_pattern':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <StripedPattern />
                    </div>
                );
            case 'interactive_grid':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-auto opacity-30 flex justify-center items-center">
                        <InteractiveGridPattern squares={[80, 80]} className="w-full h-full" />
                    </div>
                );
            case 'noise_texture':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <NoiseTexture />
                    </div>
                );
            case 'gradient_animation':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <BackgroundGradientAnimation interactive={false} />
                    </div>
                );
            case 'wavy_background':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <WavyBackground backgroundFill="transparent" />
                    </div>
                );
            case 'background_boxes':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-50">
                        <Boxes />
                    </div>
                );
            case 'background_beams':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <BackgroundBeams />
                    </div>
                );
            case 'beams_with_collision':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <BackgroundBeamsWithCollision><></></BackgroundBeamsWithCollision>
                    </div>
                );
            case 'background_lines':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <BackgroundLines className="bg-transparent dark:bg-transparent h-full">
                            <div />
                        </BackgroundLines>
                    </div>
                );
            case 'aurora_background':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <AuroraBackground className="bg-transparent dark:bg-transparent" />
                    </div>
                );
            case 'stars_background':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none bg-slate-950 opacity-80">
                        <StarsBackground />
                        <ShootingStars />
                    </div>
                );
            case 'spotlight':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <Spotlight />
                    </div>
                );
            case 'lamp':
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                        <LampContainer className="h-full pt-0 bg-transparent">
                            <div />
                        </LampContainer>
                    </div>
                );
            default:
                return (
                    <div className="absolute inset-0 w-full h-full pointer-events-none bg-[url('https://res.cloudinary.com/djpkr1qhw/image/upload/v1727850239/noise_u5wz3y.png')] opacity-10 bg-repeat bg-size-[100px]" />
                );
        }
    }

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none bg-[url('https://res.cloudinary.com/djpkr1qhw/image/upload/v1727850239/noise_u5wz3y.png')] opacity-10 bg-repeat bg-size-[100px]" />
    );
}
