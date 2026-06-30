/**
 * @file src/templates/registry.ts
 *
 * Template Registry — the authoritative list of all portfolio templates
 * available on the Limefolio platform.
 *
 * ## Relationship to the component registry
 * The template registry does NOT define components — it only *references* them
 * by `componentKey`. The actual component schema (variants, inputs, flags) lives
 * in `components.ts`. A template says "place `hero` here with these allowed
 * variants and this default variant"; the component registry says "here is what
 * `hero` looks like, what inputs it accepts, and how to render it".
 *
 * ## Layout vs pages sections
 * Every template has two sets of `SectionInstance` declarations:
 *
 * - **`layout`** — rendered once by `layout.tsx` and wraps every page.
 *   Contains global components like `header`, `footer`.
 *   All components in `layout` must have `isGlobal: true` in the component registry.
 *   These sections are automatically injected into every page's resolved section list
 *   by `resolvePortfolioConfig` — they must NOT be duplicated in `pages[x].sections`.
 *
 * - **`pages`** — one `TemplatePage` per route. Each page's `sections` array is
 *   the ordered list of non-global components rendered by that page's `page.tsx`.
 *   Global components are injected automatically and must not appear here.
 *
 * ## instanceId as join key
 * The `instanceId` on each `SectionInstance` is the stable string key that joins
 * the template definition with the user's stored overrides in `PortfolioTemplateConfig`.
 * Changing an `instanceId` after a template version is published is a **breaking change**:
 * all existing users who customized that section will lose their customizations because
 * the merge function will no longer find a matching override. Any `instanceId` rename
 * requires a version bump on the `Template.version` field and a Django data migration
 * written against `TemplateVersionMigrationLog`.
 *
 * ## version field and migration tracking (Option C)
 * The `version` field is a semver string (e.g. "1.0.0"). It is recorded on each
 * `PortfolioTemplateConfig` row (`template_version` column) at the time the user
 * saves their config. When a breaking change is made to a template:
 * 1. Bump the `version` here.
 * 2. Write a Django management command that queries all `PortfolioTemplateConfig`
 *    rows where `template_version` matches the old version, applies the necessary
 *    transformation to the JSON delta fields, bumps `template_version`, and writes
 *    a `TemplateVersionMigrationLog` record for each migrated row.
 * See `TEMPLATES.md` → "How to update a template version" for the full procedure.
 *
 * ## defaultTheme and defaultFont
 * These must exist in `ColorThemes` (src/themes/index.ts) and `Fonts`
 * (src/lib/fonts.ts) respectively. They are applied **once** when a user switches
 * to this template — replacing whatever theme/font they had — but the user can
 * freely change them afterward. They are NOT locked to the template.
 */

import type { Template, SectionInstance } from "./types";
import { ComponentRegistry } from "./components";

// ─────────────────────────────────────────────────────────────────────────────
// Helper to expand 'all' allowedVariants for a given component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns every variant key registered for a component.
 * Used to populate `allowedVariants: 'all'` in the table below without
 * manually keeping the list in sync with the component definition.
 */
function allVariants(componentKey: string): string[] {
    const schema = ComponentRegistry[componentKey];
    if (!schema) {
        throw new Error(
            `[TemplateRegistry] Unknown componentKey "${componentKey}". ` +
                `Ensure it is registered in ComponentRegistry before referencing it here.`
        );
    }
    return schema.variants.map((v) => v.key);
}

// ─────────────────────────────────────────────────────────────────────────────
// Default template
// ─────────────────────────────────────────────────────────────────────────────

/**
 * "Default" template — the standard Limefolio portfolio layout.
 *
 * A full-featured template suitable for developers, designers, and creatives
 * who want a comprehensive portfolio with projects, skills, experience, and a blog.
 * All optional sections can be removed by the user; only the hero is pinned.
 */
const defaultTemplate: Template = {
    key: "default",
    label: "Default",
    version: "1.0.0",
    // "default" exists in ColorThemes (src/themes/index.ts) as a neutral light theme.
    defaultTheme: "default",
    // "inter" is the first sans-serif font in Fonts (src/lib/fonts.ts) and the fallback.
    defaultFont: "inter",
    defaultLayoutWidth: "default",

    // ── Layout sections (rendered by layout.tsx on every page) ─────────────────
    layout: [
        {
            instanceId: "header_1",
            componentKey: "header",
            allowedVariants: allVariants("header"),
            defaultVariant: "default",
            inputDefaults: {
                backgroundStyle: "solid",
                backgroundColor: "bg-background",
                bottomBorder: true,
                ctaLabel: "Book a screening"
            },
            fixed: true
        },
        {
            instanceId: "footer_1",
            componentKey: "footer",
            allowedVariants: allVariants("footer"),
            defaultVariant: "default",
            inputDefaults: {
                showBackToTop: true,
                showLimefolioAttribution: false
            },
            fixed: true
        }
    ] satisfies SectionInstance[],

    // ── Pages ──────────────────────────────────────────────────────────────────
    pages: [
        /**
         * Landing page — the portfolio home page.
         *
         * All sections can be removed, reordered, or supplemented with user
         * additions (for repeatable components).
         */
        {
            key: "landing",
            label: "Landing Page",
            sections: [
                {
                    instanceId: "hero_1",
                    componentKey: "hero",
                    allowedVariants: allVariants("hero"),
                    defaultVariant: "default",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "about_1",
                    componentKey: "about",
                    allowedVariants: allVariants("about"),
                    defaultVariant: "default",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "stats_1",
                    componentKey: "stats",
                    allowedVariants: allVariants("stats"),
                    defaultVariant: "counter_row",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "skills_1",
                    componentKey: "skills",
                    allowedVariants: allVariants("skills"),
                    defaultVariant: "icon_grid",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: allVariants("featured_projects"),
                    defaultVariant: "grid",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "media_gallery_1",
                    componentKey: "media_gallery",
                    allowedVariants: allVariants("media_gallery"),
                    defaultVariant: "masonry",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "testimonials_1",
                    componentKey: "testimonials",
                    allowedVariants: allVariants("testimonials"),
                    defaultVariant: "carousel",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "services_1",
                    componentKey: "services",
                    allowedVariants: allVariants("services"),
                    defaultVariant: "card_grid",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: allVariants("latest_blogs"),
                    defaultVariant: "grid",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: allVariants("cta"),
                    defaultVariant: "default",
                    fixed: false,
                    removable: true
                }
            ]
        },

        /**
         * All Projects page — full paginated list of the user's projects.
         * The featured_projects section is pinned (fixed) because this page exists
         * solely to display projects — removing it would leave the page empty.
         */
        {
            key: "all_projects",
            label: "All Projects",
            sections: [
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: allVariants("featured_projects"),
                    defaultVariant: "grid",
                    fixed: true
                }
            ]
        },

        /**
         * Project Details page — individual project view.
         * The project_details section owns the canonical project view: header,
         * project images, author context, links, and related projects.
         */
        {
            key: "project_details",
            label: "Project Details",
            sections: [
                {
                    instanceId: "project_details_1",
                    componentKey: "project_details",
                    allowedVariants: allVariants("project_details"),
                    defaultVariant: "default",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: allVariants("cta"),
                    defaultVariant: "card",
                    fixed: false
                }
            ]
        },

        /**
         * All Blog page — paginated list of blog posts.
         * The latest_blogs section is pinned because this page exists solely to
         * display posts.
         */
        {
            key: "all_blog",
            label: "All Blog Posts",
            sections: [
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: allVariants("latest_blogs"),
                    defaultVariant: "grid",
                    inputDefaults: {
                        sectionTitle: "All Posts",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },

        /**
         * Blog Details page — individual blog post view.
         * The blog_details section owns the canonical post view: headline,
         * metadata, cover image, article content, tags, and related posts.
         */
        {
            key: "blog_details",
            label: "Blog Post",
            sections: [
                {
                    instanceId: "blog_details_1",
                    componentKey: "blog_details",
                    allowedVariants: allVariants("blog_details"),
                    defaultVariant: "default",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: allVariants("cta"),
                    defaultVariant: "minimal",
                    fixed: false
                }
            ]
        },

        /**
         * Contact page — dedicated contact section.
         * The contact section is pinned because a contact page without a contact
         * form or info is meaningless.
         */
        {
            key: "contact",
            label: "Contact",
            sections: [
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: allVariants("contact"),
                    defaultVariant: "split_with_info",
                    fixed: true
                }
            ]
        }
    ]
};

/**
 * "Cinematic" template — tailored for video editors and filmmakers.
 *
 * Uses GSAP animations for a premium screening room feel. Features large video
 * thumbnails, horizontal scroll galleries, and text reveals.
 */
const cinematicTemplate: Template = {
    key: "cinematic",
    label: "Cinematic",
    version: "1.0.0",
    defaultTheme: "cinematic-dark",
    defaultFont: "inter",
    defaultLayoutWidth: "default",

    // ── Layout sections (rendered by layout.tsx on every page) ─────────────────
    layout: [
        {
            instanceId: "header_1",
            componentKey: "header",
            allowedVariants: allVariants("header"),
            defaultVariant: "default",
            fixed: true
        },
        {
            instanceId: "footer_1",
            componentKey: "footer",
            allowedVariants: allVariants("footer"),
            defaultVariant: "default",
            fixed: true
        }
    ] satisfies SectionInstance[],

    // ── Pages ──────────────────────────────────────────────────────────────────
    pages: [
        {
            key: "landing",
            label: "Landing Page",
            sections: [
                {
                    instanceId: "hero_1",
                    componentKey: "hero",
                    allowedVariants: ["cinematic"],
                    defaultVariant: "cinematic",
                    inputDefaults: {
                        headline: "Directed by {name}",
                        subheadline: "Selected cuts, frames, and production notes from a portfolio built like a feature presentation.",
                        primaryCtaLabel: "Watch the reel",
                        primaryCtaUrl: "/projects",
                        secondaryCtaLabel: "View stills",
                        secondaryCtaUrl: "#gallery",
                        backgroundType: "effect",
                        backgroundEffect: "spotlight"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "about_1",
                    componentKey: "about",
                    allowedVariants: ["director_cut", "default"],
                    defaultVariant: "director_cut",
                    inputDefaults: {
                        showResumeButton: true,
                        resumeLabel: "Download press kit"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "stats_1",
                    componentKey: "stats",
                    allowedVariants: ["counter_row", "minimal_row"],
                    defaultVariant: "counter_row",
                    inputDefaults: {
                        sectionTitle: "Box Office"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["cinematic_grid", "spotlight"],
                    defaultVariant: "cinematic_grid",
                    inputDefaults: {
                        sectionTitle: "Featured Cuts",
                        maxItems: "4",
                        viewAllLabel: "Open the archive"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "media_gallery_1",
                    componentKey: "media_gallery",
                    allowedVariants: ["horizontal_scroll", "carousel"],
                    defaultVariant: "horizontal_scroll",
                    inputDefaults: {
                        sectionTitle: "Frame Gallery",
                        showCaptions: true
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["banner", "card"],
                    defaultVariant: "banner",
                    inputDefaults: {
                        headline: "Roll on your next scene",
                        subtext: "Bring the brief, the footage, or the half-formed idea. I will help shape the final cut.",
                        primaryCtaLabel: "Start production",
                        secondaryCtaLabel: "See the reels",
                        secondaryCtaUrl: "/projects"
                    },
                    fixed: false,
                    removable: true
                }
            ]
        },
        {
            key: "all_projects",
            label: "All Projects",
            sections: [
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["cinematic_grid", "spotlight"],
                    defaultVariant: "cinematic_grid",
                    inputDefaults: {
                        sectionTitle: "All Cuts",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "project_details",
            label: "Project Details",
            sections: [
                {
                    instanceId: "project_details_1",
                    componentKey: "project_details",
                    allowedVariants: ["cinematic", "default"],
                    defaultVariant: "cinematic",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["card", "banner"],
                    defaultVariant: "card",
                    inputDefaults: {
                        headline: "Need a cut like this?",
                        primaryCtaLabel: "Start a conversation"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "all_blog",
            label: "All Blog Posts",
            sections: [
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["editorial", "grid"],
                    defaultVariant: "editorial",
                    inputDefaults: {
                        sectionTitle: "Production Notes",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "blog_details",
            label: "Blog Post",
            sections: [
                {
                    instanceId: "blog_details_1",
                    componentKey: "blog_details",
                    allowedVariants: ["cinematic", "default"],
                    defaultVariant: "cinematic",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["banner", "minimal"],
                    defaultVariant: "banner",
                    inputDefaults: {
                        headline: "Continue the conversation",
                        primaryCtaLabel: "Send a note"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "contact",
            label: "Contact",
            sections: [
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["split_with_info", "social_cards"],
                    defaultVariant: "split_with_info",
                    inputDefaults: {
                        sectionTitle: "Book the Next Scene"
                    },
                    fixed: true
                }
            ]
        }
    ]
};

/**
 * "Terminal" template — tailored for developers who want a portfolio that feels
 * like a polished interactive shell.
 *
 * Uses phosphor terminal colors, monospace typography, shell command labels,
 * repo tables, log streams, and man-page inspired content blocks.
 */
const terminalTemplate: Template = {
    key: "terminal",
    label: "Terminal",
    version: "1.0.0",
    defaultTheme: "terminal-dark",
    defaultFont: "inter",
    defaultLayoutWidth: "default",

    layout: [
        {
            instanceId: "header_1",
            componentKey: "header",
            allowedVariants: ["terminal"],
            defaultVariant: "terminal",
            inputDefaults: {
                backgroundStyle: "solid",
                backgroundColor: "bg-background",
                bottomBorder: true,
                ctaLabel: "./contact"
            },
            fixed: true
        },
        {
            instanceId: "footer_1",
            componentKey: "footer",
            allowedVariants: ["terminal"],
            defaultVariant: "terminal",
            inputDefaults: {
                showBackToTop: true,
                showLimefolioAttribution: false
            },
            fixed: true
        }
    ] satisfies SectionInstance[],

    pages: [
        {
            key: "landing",
            label: "Landing Page",
            sections: [
                {
                    instanceId: "hero_1",
                    componentKey: "hero",
                    allowedVariants: ["terminal", "terminal_split"],
                    defaultVariant: "terminal_split",
                    inputDefaults: {
                        headline: "{name}",
                        subheadline: "developer portfolio initialized from ~/.limefolio/profile",
                        primaryCtaLabel: "run projects",
                        primaryCtaUrl: "/projects",
                        secondaryCtaLabel: "open contact",
                        secondaryCtaUrl: "/contact",
                        typingStrings: "build --fast, ship --clean, debug --deep"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "about_1",
                    componentKey: "about",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "skills_1",
                    componentKey: "skills",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    inputDefaults: {
                        sectionTitle: "stack",
                        showProficiencyLevel: true
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["terminal", "terminal_process"],
                    defaultVariant: "terminal_process",
                    inputDefaults: {
                        sectionTitle: "./work",
                        maxItems: "6",
                        viewAllLabel: "cd /projects"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["terminal", "terminal_changelog"],
                    defaultVariant: "terminal_changelog",
                    inputDefaults: {
                        sectionTitle: "logs",
                        maxItems: "3",
                        viewAllLabel: "cat all.log"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    inputDefaults: {
                        headline: "Ready to deploy?",
                        subtext: "Open a secure channel and send the brief.",
                        primaryCtaLabel: "ssh contact"
                    },
                    fixed: false,
                    removable: true
                }
            ]
        },
        {
            key: "all_projects",
            label: "All Projects",
            sections: [
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    inputDefaults: {
                        sectionTitle: "./projects",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "project_details",
            label: "Project Details",
            sections: [
                {
                    instanceId: "project_details_1",
                    componentKey: "project_details",
                    allowedVariants: ["terminal", "default"],
                    defaultVariant: "terminal",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    inputDefaults: {
                        headline: "Fork this outcome?",
                        primaryCtaLabel: "ssh contact"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "all_blog",
            label: "All Blog Posts",
            sections: [
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    inputDefaults: {
                        sectionTitle: "logs",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "blog_details",
            label: "Blog Post",
            sections: [
                {
                    instanceId: "blog_details_1",
                    componentKey: "blog_details",
                    allowedVariants: ["terminal", "default"],
                    defaultVariant: "terminal",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    inputDefaults: {
                        headline: "Reply to this log?",
                        primaryCtaLabel: "mail -s hello"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "contact",
            label: "Contact",
            sections: [
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["terminal"],
                    defaultVariant: "terminal",
                    inputDefaults: {
                        sectionTitle: "contact",
                        showPhone: false
                    },
                    fixed: true
                }
            ]
        }
    ]
};

/**
 * "VS Code" template — editor-shell inspired portfolio with sticky chrome.
 *
 * The header variant owns the activity bar, explorer sidebar, command/search bar,
 * and tab strip. `LayoutPageRenderer` detects this header variant and constrains
 * scrolling to the page content pane so the shell remains fixed.
 */
const vscodeTemplate: Template = {
    key: "vscode",
    label: "VS Code",
    version: "1.0.0",
    defaultTheme: "vscode-dark",
    defaultFont: "inter",
    defaultLayoutWidth: "default",

    layout: [
        {
            instanceId: "header_1",
            componentKey: "header",
            allowedVariants: ["vscode"],
            defaultVariant: "vscode",
            inputDefaults: {
                sticky: true,
                ctaButton: false,
                bottomBorder: true
            },
            fixed: true
        },
        {
            instanceId: "footer_1",
            componentKey: "footer",
            allowedVariants: ["vscode"],
            defaultVariant: "vscode",
            inputDefaults: {
                showBackToTop: false,
                showLimefolioAttribution: false
            },
            fixed: true
        }
    ] satisfies SectionInstance[],

    pages: [
        {
            key: "landing",
            label: "Landing Page",
            sections: [
                {
                    instanceId: "hero_1",
                    componentKey: "hero",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        headline: "{name}",
                        subheadline: "Portfolio opened in an editor-inspired workspace",
                        primaryCtaLabel: "Open Projects",
                        primaryCtaUrl: "/projects",
                        secondaryCtaLabel: "Run Contact",
                        secondaryCtaUrl: "/contact"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "about_1",
                    componentKey: "about",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "src/projects",
                        maxItems: "6",
                        viewAllLabel: "Open All Projects"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "skills_1",
                    componentKey: "skills",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "Extensions",
                        showProficiencyLevel: true
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "Search: notes",
                        maxItems: "3",
                        viewAllLabel: "Open Blog"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "Terminal: contact",
                        showPhone: false,
                        showMap: false
                    },
                    fixed: false,
                    removable: true
                }
            ]
        },
        {
            key: "all_projects",
            label: "All Projects",
            sections: [
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "src/projects",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "project_details",
            label: "Project Details",
            sections: [
                {
                    instanceId: "project_details_1",
                    componentKey: "project_details",
                    allowedVariants: ["vscode", "default"],
                    defaultVariant: "vscode",
                    fixed: true
                },
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "Terminal: discuss project"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "all_blog",
            label: "All Blog Posts",
            sections: [
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "Search: all notes",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "blog_details",
            label: "Blog Post",
            sections: [
                {
                    instanceId: "blog_details_1",
                    componentKey: "blog_details",
                    allowedVariants: ["vscode", "default"],
                    defaultVariant: "vscode",
                    fixed: true
                },
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "Terminal: respond to note"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "contact",
            label: "Contact",
            sections: [
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["vscode"],
                    defaultVariant: "vscode",
                    inputDefaults: {
                        sectionTitle: "Terminal: contact"
                    },
                    fixed: true
                }
            ]
        }
    ]
};

/**
 * "Minimal" template — quiet, text-first portfolio for software engineers.
 *
 * Inspired by restrained personal sites from engineers like shadcn and Lee
 * Robinson: generous whitespace, narrow reading measure, simple links, and no
 * decorative cards unless the underlying content needs structure.
 */
const minimalTemplate: Template = {
    key: "minimal",
    label: "Minimal",
    version: "1.0.0",
    defaultTheme: "default",
    defaultFont: "inter",
    defaultLayoutWidth: "default",

    layout: [
        {
            instanceId: "header_1",
            componentKey: "header",
            allowedVariants: ["minimal"],
            defaultVariant: "minimal",
            inputDefaults: {
                sticky: false,
                backgroundStyle: "transparent",
                ctaButton: false,
                bottomBorder: false
            },
            fixed: true
        },
        {
            instanceId: "footer_1",
            componentKey: "footer",
            allowedVariants: ["minimal"],
            defaultVariant: "minimal",
            inputDefaults: {
                showBackToTop: false,
                showLimefolioAttribution: false,
                linkDensity: "compact"
            },
            fixed: true
        }
    ] satisfies SectionInstance[],

    pages: [
        {
            key: "landing",
            label: "Landing Page",
            sections: [
                {
                    instanceId: "hero_1",
                    componentKey: "hero",
                    allowedVariants: ["minimal"],
                    defaultVariant: "minimal",
                    inputDefaults: {
                        primaryCtaLabel: "Projects",
                        primaryCtaUrl: "/projects",
                        secondaryCtaLabel: "Writing",
                        secondaryCtaUrl: "/blog",
                        showAvatar: false
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "about_1",
                    componentKey: "about",
                    allowedVariants: ["minimal"],
                    defaultVariant: "minimal",
                    inputDefaults: {
                        showProfileImage: false,
                        showResumeButton: false
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["minimal_list"],
                    defaultVariant: "minimal_list",
                    inputDefaults: {
                        sectionTitle: "Selected work",
                        maxItems: "4",
                        viewAllLabel: "All projects"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "skills_1",
                    componentKey: "skills",
                    allowedVariants: ["minimal_list"],
                    defaultVariant: "minimal_list",
                    inputDefaults: {
                        sectionTitle: "Stack",
                        showProficiencyLevel: false
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "experience_1",
                    componentKey: "experience",
                    allowedVariants: ["minimal_list"],
                    defaultVariant: "minimal_list",
                    inputDefaults: {
                        sectionTitle: "Experience"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["minimal_list"],
                    defaultVariant: "minimal_list",
                    inputDefaults: {
                        sectionTitle: "Writing",
                        maxItems: "3",
                        showExcerpt: false,
                        showTags: false,
                        viewAllLabel: "All posts"
                    },
                    fixed: false,
                    removable: true
                }
            ]
        },
        {
            key: "all_projects",
            label: "All Projects",
            sections: [
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["minimal_list"],
                    defaultVariant: "minimal_list",
                    inputDefaults: {
                        sectionTitle: "Projects",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "project_details",
            label: "Project Details",
            sections: [
                {
                    instanceId: "project_details_1",
                    componentKey: "project_details",
                    allowedVariants: ["minimal", "default"],
                    defaultVariant: "minimal",
                    fixed: true
                }
            ]
        },
        {
            key: "all_blog",
            label: "All Blog Posts",
            sections: [
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["minimal_list"],
                    defaultVariant: "minimal_list",
                    inputDefaults: {
                        sectionTitle: "Writing",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "blog_details",
            label: "Blog Post",
            sections: [
                {
                    instanceId: "blog_details_1",
                    componentKey: "blog_details",
                    allowedVariants: ["minimal", "default"],
                    defaultVariant: "minimal",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["minimal"],
                    defaultVariant: "minimal",
                    inputDefaults: {
                        headline: "Have thoughts on this?",
                        primaryCtaLabel: "Send a note"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "contact",
            label: "Contact",
            sections: [
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["minimal"],
                    defaultVariant: "minimal",
                    inputDefaults: {
                        sectionTitle: "Contact",
                        showPhone: false
                    },
                    fixed: true
                }
            ]
        }
    ]
};

/**
 * "Neobrutalism" template — loud, blocky portfolio with hard borders.
 *
 * Uses the neobrutalism theme and display font pairing with chunky section
 * cards, high-contrast labels, offset shadows, and compressed editorial flow.
 */
const neobrutalismTemplate: Template = {
    key: "neobrutalism",
    label: "Neobrutalism",
    version: "1.0.0",
    defaultTheme: "neobrutalism",
    defaultFont: "inter",
    defaultLayoutWidth: "default",

    layout: [
        {
            instanceId: "header_1",
            componentKey: "header",
            allowedVariants: ["neobrutalism"],
            defaultVariant: "neobrutalism",
            inputDefaults: {
                sticky: true,
                backgroundStyle: "solid",
                backgroundColor: "bg-primary",
                bottomBorder: true,
                ctaLabel: "Start a project"
            },
            fixed: true
        },
        {
            instanceId: "footer_1",
            componentKey: "footer",
            allowedVariants: ["neobrutalism"],
            defaultVariant: "neobrutalism",
            inputDefaults: {
                backgroundStyle: "solid",
                backgroundColor: "bg-secondary",
                showBackToTop: true,
                linkDensity: "spacious"
            },
            fixed: true
        }
    ] satisfies SectionInstance[],

    pages: [
        {
            key: "landing",
            label: "Landing Page",
            sections: [
                {
                    instanceId: "hero_1",
                    componentKey: "hero",
                    allowedVariants: ["neobrutalism", "neobrutalism_poster"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        subheadline:
                            "A personal site for sharp work, bright ideas, and zero visual apologies.",
                        primaryCtaLabel: "See projects",
                        primaryCtaUrl: "/projects",
                        secondaryCtaLabel: "Contact me",
                        secondaryCtaUrl: "/contact",
                        showAvatar: true
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "about_1",
                    componentKey: "about",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        showResumeButton: true
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "stats_1",
                    componentKey: "stats",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "Scoreboard"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "skills_1",
                    componentKey: "skills",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "Toolbox",
                        showProficiencyLevel: true,
                        layout: "spacious"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["neobrutalism", "neobrutalism_stack"],
                    defaultVariant: "neobrutalism_stack",
                    inputDefaults: {
                        sectionTitle: "Featured work",
                        maxItems: "4",
                        viewAllLabel: "All projects"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "services_1",
                    componentKey: "services",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "What I do",
                        showPricing: true
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "experience_1",
                    componentKey: "experience",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "Work history"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "Notes and rants",
                        maxItems: "3",
                        viewAllLabel: "All posts"
                    },
                    fixed: false,
                    removable: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        headline: "Got a bold idea?",
                        subtext:
                            "Let us turn it into something impossible to ignore.",
                        primaryCtaLabel: "Start talking",
                        secondaryCtaLabel: "Browse work",
                        secondaryCtaUrl: "/projects"
                    },
                    fixed: false,
                    removable: true
                }
            ]
        },
        {
            key: "all_projects",
            label: "All Projects",
            sections: [
                {
                    instanceId: "featured_projects_1",
                    componentKey: "featured_projects",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "All projects",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "project_details",
            label: "Project Details",
            sections: [
                {
                    instanceId: "project_details_1",
                    componentKey: "project_details",
                    allowedVariants: ["neobrutalism", "default"],
                    defaultVariant: "neobrutalism",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        headline: "Want one like this?",
                        primaryCtaLabel: "Get in touch"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "all_blog",
            label: "All Blog Posts",
            sections: [
                {
                    instanceId: "latest_blogs_1",
                    componentKey: "latest_blogs",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "All posts",
                        maxItems: "all",
                        showViewAll: false
                    },
                    fixed: true
                }
            ]
        },
        {
            key: "blog_details",
            label: "Blog Post",
            sections: [
                {
                    instanceId: "blog_details_1",
                    componentKey: "blog_details",
                    allowedVariants: ["neobrutalism", "default"],
                    defaultVariant: "neobrutalism",
                    fixed: true
                },
                {
                    instanceId: "cta_1",
                    componentKey: "cta",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        headline: "Argue, agree, or build on it.",
                        primaryCtaLabel: "Send a note"
                    },
                    fixed: false
                }
            ]
        },
        {
            key: "contact",
            label: "Contact",
            sections: [
                {
                    instanceId: "contact_1",
                    componentKey: "contact",
                    allowedVariants: ["neobrutalism"],
                    defaultVariant: "neobrutalism",
                    inputDefaults: {
                        sectionTitle: "Contact",
                        showPhone: false
                    },
                    fixed: true
                }
            ]
        }
    ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Registry export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * TemplateRegistry — the central map of all available portfolio templates.
 * Keyed by stable template key strings (e.g. "default").
 *
 * To add a new template: see `TEMPLATES.md` → "How to add a new template".
 */
export const TemplateRegistry: Record<string, Template> = {
    default: defaultTemplate,
    cinematic: cinematicTemplate,
    terminal: terminalTemplate,
    vscode: vscodeTemplate,
    minimal: minimalTemplate,
    neobrutalism: neobrutalismTemplate
};

/**
 * Retrieve a template by key. Falls back to "default" if the key is not found.
 * Logs a warning when falling back so misconfigured user records are detectable.
 */
export function getTemplate(key: string | undefined | null): Template {
    if (key && TemplateRegistry[key]) return TemplateRegistry[key];
    if (key && !TemplateRegistry[key]) {
        console.warn(
            `[TemplateRegistry] Template "${key}" not found. Falling back to "default".`
        );
    }
    return TemplateRegistry.default;
}

/**
 * Returns true if a template with the given key exists in the registry.
 */
export function templateExists(key: string): boolean {
    return key in TemplateRegistry;
}

/**
 * Returns all registered template keys.
 */
export function getAvailableTemplates(): string[] {
    return Object.keys(TemplateRegistry);
}
