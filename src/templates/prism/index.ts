import { ThemeTemplate } from "@/lib/template-types";
import PrismLayout from "./layout";
import PrismHome from "./home";
import PrismSingleProject from "./single-project";

export const prismTemplate: ThemeTemplate = {
    name: "Prism",
    slug: "prism",
    description:
        "A dark, vibrant, Stripe-inspired template with explosive colours and glassmorphism.",
    tags: ["dark", "vibrant", "gradient", "glass", "stripe"],
    layout: PrismLayout,
    home: PrismHome,
    "single-project": PrismSingleProject,
};
