import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    try {
        const { origin, searchParams } = new URL(request.url);

        const image = searchParams.get("image");
        const title = searchParams.get("title") || "Limefolio";

        // Load Outfit font
        const fontData = await fetch(
            new URL(
                "../../../../public/fonts/Outfit-Regular.ttf",
                import.meta.url
            )
        ).then((res) => res.arrayBuffer());

        const hasImage = !!image;
        const titleLength = title.length;

        let imageFontSize = "80px";
        if (titleLength >= 40) imageFontSize = "56px";
        else if (titleLength >= 20) imageFontSize = "64px";

        let textFontSize = "140px";
        if (titleLength >= 45) textFontSize = "72px";
        else if (titleLength >= 30) textFontSize = "96px";
        else if (titleLength >= 15) textFontSize = "112px";

        return new ImageResponse(
            <div
                style={{
                    display: "flex",
                    width: "1200px",
                    height: "630px",
                    backgroundColor: "#f9fcf5", // ultra-subtle lime off-white
                    color: "#1a2e05", // deep dark green/lime text
                    fontFamily: "Outfit",
                    position: "relative",
                    overflow: "hidden" // Keep glows and bottom-bleeding image contained
                }}
            >
                {hasImage ? (
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            position: "relative"
                        }}
                    >
                        {/* Center Glow */}
                        <div
                            style={{
                                position: "absolute",
                                top: "-85px",
                                left: "200px",
                                width: "800px",
                                height: "800px",
                                backgroundImage:
                                    "radial-gradient(circle, rgba(132,204,22,0.15) 0%, rgba(132,204,22,0) 70%)"
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "300px",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingTop: "40px"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "24px"
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "24px",
                                        color: "#1a2e05",
                                        letterSpacing: "0.15em",
                                        textTransform: "uppercase",
                                        marginBottom: "-8px"
                                    }}
                                >
                                    limefolio.com
                                </span>
                                <div
                                    style={{
                                        width: "96px",
                                        height: "6px",
                                        backgroundColor: "#84cc16",
                                        borderRadius: "3px"
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: imageFontSize,
                                        lineHeight: 1.05,
                                        letterSpacing: "-0.04em",
                                        color: "#1a2e05",
                                        maxWidth: "1080px",
                                        textAlign: "center",
                                        padding: "0 20px"
                                    }}
                                >
                                    {title}
                                </span>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                position: "absolute",
                                top: "300px",
                                left: "240px",
                                width: "720px",
                                height: "405px",
                                overflow: "hidden",
                                borderTopLeftRadius: "24px",
                                borderTopRightRadius: "24px",
                                borderTop: "1px solid rgba(132, 204, 22, 0.15)",
                                borderLeft:
                                    "1px solid rgba(132, 204, 22, 0.15)",
                                borderRight:
                                    "1px solid rgba(132, 204, 22, 0.15)"
                            }}
                        >
                            <img
                                src={image}
                                style={{
                                    width: "720px",
                                    height: "405px",
                                    objectFit: "cover"
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "100px",
                            position: "relative"
                        }}
                    >
                        {/* Bottom Glow */}
                        <div
                            style={{
                                position: "absolute",
                                top: "230px",
                                left: "200px",
                                width: "800px",
                                height: "800px",
                                backgroundImage:
                                    "radial-gradient(circle, rgba(132,204,22,0.15) 0%, rgba(132,204,22,0) 70%)"
                            }}
                        />

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "32px",
                                textAlign: "center",
                                zIndex: 10
                            }}
                        >
                            <img
                                src={`${origin}/apple-touch-icon.png`}
                                width={80}
                                height={80}
                                style={{
                                    border: "none",
                                    marginBottom: "-16px"
                                }}
                            />

                            <span
                                style={{
                                    fontSize: textFontSize,
                                    lineHeight: 1.0,
                                    letterSpacing: "-0.04em",
                                    color: "#1a2e05",
                                    maxWidth: "1100px",
                                    padding: "0 20px"
                                }}
                            >
                                {title}
                            </span>
                            <span
                                style={{
                                    fontSize: "28px",
                                    color: "#1a2e05",
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    marginTop: "8px"
                                }}
                            >
                                limefolio.com
                            </span>
                        </div>
                    </div>
                )}
            </div>,
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: "Outfit",
                        data: fontData,
                        style: "normal",
                        weight: 400
                    }
                ]
            }
        );
    } catch (e: any) {
        console.error(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500
        });
    }
}
