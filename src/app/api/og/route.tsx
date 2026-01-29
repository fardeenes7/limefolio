import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        //construct base url with scheme
        const { origin } = new URL(request.url);
        console.log(origin);
        const { searchParams } = new URL(request.url);

        const title = searchParams.get("title") || "Limefolio";
        const description =
            searchParams.get("description") ||
            "Build your portfolio in minutes";

        let calSansFont;
        try {
            calSansFont = await fetch(
                new URL(
                    "../../../../public/fonts/Outfit-Regular.ttf",
                    import.meta.url,
                ),
            ).then((res) => res.arrayBuffer());
        } catch (error) {
            console.log(
                "Failed to load Cal Sans font, using system font fallback",
            );
            calSansFont = null;
        }

        const grainPattern = Array.from({ length: 200 }, (_, i) => ({
            x: Math.random() * 1200,
            y: Math.random() * 630,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
        }));

        return new ImageResponse(
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    backgroundColor: "#000",
                    position: "relative",
                }}
            >
                {grainPattern.map((grain, i) => (
                    <div
                        key={i}
                        style={{
                            position: "absolute",
                            left: `${grain.x}px`,
                            top: `${grain.y}px`,
                            width: `${grain.size}px`,
                            height: `${grain.size}px`,
                            borderRadius: "50%",
                            backgroundColor: "#000000",
                            opacity: grain.opacity,
                        }}
                    />
                ))}

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                        padding: "80px",
                        maxWidth: "1000px",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "40px",
                            gap: "16px",
                        }}
                    >
                        <img
                            src={`${origin}/icon.svg`}
                            style={{
                                height: "75px",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            fontFamily: calSansFont
                                ? "Cal Sans"
                                : "system-ui, sans-serif",
                            fontSize: 128,
                            fontWeight: 700,
                            background:
                                "linear-gradient(to right, #ffffff, #9EE700)",
                            backgroundClip: "text",
                            color: "transparent",
                            textAlign: "center",
                            marginBottom: "24px",
                            lineHeight: 1.2,
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: 48,
                            color: "#8f8f98",
                            textAlign: "center",
                            maxWidth: "800px",
                            lineHeight: 1.4,
                        }}
                    >
                        {description}
                    </div>
                </div>
            </div>,
            {
                width: 1200,
                height: 630,
                ...(calSansFont && {
                    fonts: [
                        {
                            name: "Cal Sans",
                            data: calSansFont,
                            style: "normal",
                            weight: 600,
                        },
                    ],
                }),
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
