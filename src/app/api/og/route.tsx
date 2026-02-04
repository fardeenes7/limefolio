import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { origin } = new URL(request.url);
        const { searchParams } = new URL(request.url);

        const title = searchParams.get("title") || "Limefolio";
        const description =
            searchParams.get("description") ||
            "Build your developer portfolio in minutes.";

        // Load Outfit font
        const fontData = await fetch(
            new URL(
                "../../../../public/fonts/Outfit-Regular.ttf",
                import.meta.url,
            ),
        ).then((res) => res.arrayBuffer());

        return new ImageResponse(
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#09090b", // zinc-950
                    position: "relative",
                    fontFamily: '"Outfit"',
                }}
            >
                {/* Background Grid Pattern */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                        opacity: 0.1,
                        maskImage:
                            "radial-gradient(circle at center, black, transparent)",
                    }}
                />

                {/* Lime Glow Effect */}
                <div
                    style={{
                        position: "absolute",
                        top: "-20%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "800px",
                        height: "400px",
                        background:
                            "radial-gradient(circle, rgba(163, 230, 53, 0.15) 0%, rgba(0,0,0,0) 70%)",
                        filter: "blur(40px)",
                        opacity: 0.8,
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                        padding: "60px",
                        textAlign: "center",
                    }}
                >
                    {/* Logo / Icon */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "32px",
                            background: "rgba(39, 39, 42, 0.5)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "24px",
                            padding: "16px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={`${origin}/icon.svg`}
                            alt="Limefolio Logo"
                            width="64"
                            height="64"
                        />
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 84,
                            fontWeight: 700,
                            background:
                                "linear-gradient(to bottom right, #ffffff 30%, #a3e635 100%)",
                            backgroundClip: "text",
                            color: "transparent",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                            marginBottom: "24px",
                            maxWidth: "900px",
                            textShadow: "0 0 40px rgba(163, 230, 53, 0.2)",
                        }}
                    >
                        {title}
                    </div>

                    {/* Description */}
                    <div
                        style={{
                            fontSize: 36,
                            color: "#a1a1aa", // zinc-400
                            lineHeight: 1.5,
                            maxWidth: "800px",
                            fontWeight: 400,
                        }}
                    >
                        {description}
                    </div>
                </div>

                {/* Bottom Branding */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        opacity: 0.6,
                    }}
                >
                    <div
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#a3e635",
                        }}
                    />
                    <div
                        style={{
                            fontSize: 20,
                            color: "#e4e4e7",
                            fontWeight: 500,
                            letterSpacing: "0.05em",
                        }}
                    >
                        LIMEFOLIO
                    </div>
                </div>
            </div>,
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: "Outfit",
                        data: fontData,
                        style: "normal",
                        weight: 400,
                    },
                ],
            },
        );
    } catch (e: any) {
        console.error(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
