/**
 * @file src/templates/components.ts
 *
 * Component Registry — the source of truth for every portfolio section component
 * available in the Limefolio templating system.
 *
 * ## What is the component registry?
 * The registry maps stable `key` strings to `ComponentSchema` objects. Each
 * schema describes what a component renders, which visual variants it supports,
 * and which user-configurable inputs it accepts. The registry is consumed by:
 *   - `registry.ts` — to declare which components appear in each template/page
 *   - `merge.ts`    — to resolve default input values during SSR
 *   - The editor UI — to render the correct control for each input
 *   - The page renderer — to dynamically import the correct variant component
 *
 * ## isGlobal flag
 * Components with `isGlobal: true` (currently `header`, `footer`, `cookie_banner`)
 * are automatically injected into every page's resolved section list by
 * `resolvePortfolioConfig`. They must NOT be declared in `template.pages[x].sections`
 * — their config comes exclusively from `template.layout`. At render time, every
 * page automatically receives global components regardless of its own section list.
 *
 * ## repeatable and removable flags
 * - `repeatable: true`  — the user can add multiple instances of this component
 *   to the same page via the editor (e.g. two `featured_projects` sections with
 *   different filters). Each instance gets a unique `instanceId` (e.g.
 *   "featured_projects_2", "featured_projects_3").
 * - `removable: true`   — the user can remove this component from their layout
 *   entirely. `SectionInstance.removable` in the template definition can further
 *   override this per-instance (e.g. a component that is normally removable can
 *   be pinned as non-removable in a specific template).
 *
 * ## Color inputs
 * All color inputs MUST use `{ kind: 'token', category: 'color' }`. This resolves
 * to a shadcn semantic CSS variable (e.g. `--primary`, `--muted`, `--card`).
 * Raw hex values and Tailwind arbitrary color classes are strictly forbidden in
 * both component schemas and the component React implementations.
 *
 * ## Site name and logo
 * These are sourced from the global `Site` model (title + logo fields) and are
 * automatically available to all components. They must NEVER appear as component
 * inputs in this registry.
 */

import type { ComponentSchema } from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Global components (isGlobal: true)
// These are injected into every page render via template.layout — not declared
// in template.pages[x].sections.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Header — global top-of-page navigation bar.
 *
 * Non-removable because every portfolio needs a nav. The `transparentOnTop`
 * input is useful for hero sections that bleed to the top of the viewport.
 * `ctaLabel` is guarded by `showIf` so it only appears when the CTA is enabled.
 */
const header: ComponentSchema = {
    key: 'header',
    label: 'Header',
    isGlobal: true,
    repeatable: false,
    removable: false,
    variants: [
        { key: 'default', label: 'Default' },
        { key: 'cinematic', label: 'Cinematic' },
        { key: 'compact', label: 'Compact' },
        { key: 'minimal', label: 'Minimal' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'centered', label: 'Centered' },
        { key: 'editorial', label: 'Editorial' },
        { key: 'floating', label: 'Floating' },
        { key: 'vscode', label: 'VS Code' },
    ],
    defaultVariant: 'default',
    inputs: [
        {
            key: 'sticky',
            label: 'Sticky header',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'backgroundStyle',
            label: 'Background Style',
            type: {
                kind: 'select',
                options: [
                    { label: 'Frosted Glass', value: 'frosted' },
                    { label: 'Solid Color', value: 'solid' },
                    { label: 'Transparent', value: 'transparent' },
                ],
            },
            default: 'frosted',
        },
        {
            key: 'backgroundColor',
            label: 'Background Color',
            type: { kind: 'token', category: 'color' },
            default: 'bg-background',
            showIf: { input: 'backgroundStyle', equals: 'solid' },
        },
        {
            key: 'showNav',
            label: 'Show navigation',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'navLinks',
            label: 'Navigation links',
            type: {
                kind: 'select',
                options: [
                    { label: 'All Pages', value: 'all' },
                    { label: 'Custom', value: 'custom' },
                ],
            },
        },
        {
            key: 'ctaButton',
            label: 'Show CTA button',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'ctaLabel',
            label: 'CTA button label',
            type: { kind: 'text' },
            default: 'Hire Me',
            showIf: { input: 'ctaButton', equals: true },
        },
        {
            key: 'transparentOnTop',
            label: 'Transparent when at top of page',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'bottomBorder',
            label: 'Show bottom border',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'bottomRowLayout',
            label: 'Bottom row layout',
            type: {
                kind: 'select',
                options: [
                    { label: 'Centered', value: 'center' },
                    { label: 'Space Between', value: 'between' },
                ],
            },
            default: 'center',
            showIf: { input: 'variant', equals: 'editorial' },
        },
    ],
};

/**
 * Footer — global bottom-of-page footer.
 *
 * Non-removable because every portfolio site needs a footer for copyright and
 * social links. `copyrightText` defaults to empty string — the renderer
 * auto-generates "© {siteName} {year}" when empty.
 */
const footer: ComponentSchema = {
    key: 'footer',
    label: 'Footer',
    isGlobal: true,
    repeatable: false,
    removable: false,
    variants: [
        { key: 'default', label: 'Default' },
        { key: 'cinematic', label: 'Cinematic' },
        { key: 'compact', label: 'Compact' },
        { key: 'minimal', label: 'Minimal' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'centered', label: 'Centered' },
        { key: 'vscode', label: 'VS Code' },
    ],
    defaultVariant: 'default',
    inputs: [
        {
            key: 'showSocialLinks',
            label: 'Show social links',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showCopyright',
            label: 'Show copyright notice',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'copyrightText',
            label: 'Copyright text',
            type: { kind: 'text' },
            default: '',
            // empty string = auto-generate "{siteName} © {year}"
        },
        {
            key: 'showBackToTop',
            label: 'Show "Back to top" button',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'backgroundStyle',
            label: 'Background Style',
            type: {
                kind: 'select',
                options: [
                    { label: 'Default', value: 'default' },
                    { label: 'Muted', value: 'muted' },
                    { label: 'Solid Color', value: 'solid' },
                ],
            },
            default: 'default',
        },
        {
            key: 'backgroundColor',
            label: 'Background Color',
            type: { kind: 'token', category: 'color' },
            default: 'bg-background',
            showIf: { input: 'backgroundStyle', equals: 'solid' },
        },
        {
            key: 'linkDensity',
            label: 'Link Density',
            type: {
                kind: 'select',
                options: [
                    { label: 'Compact', value: 'compact' },
                    { label: 'Comfortable', value: 'comfortable' },
                    { label: 'Spacious', value: 'spacious' },
                ],
            },
            default: 'comfortable',
        },
        {
            key: 'showLimefolioAttribution',
            label: 'Show Limefolio attribution',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'attributionPlacement',
            label: 'Attribution Placement',
            type: {
                kind: 'select',
                options: [
                    { label: 'With Copyright', value: 'copyright' },
                    { label: 'Bottom Center', value: 'bottom' },
                ],
            },
            default: 'copyright',
            showIf: { input: 'showLimefolioAttribution', equals: true },
        },
    ],
};

/**
 * Cookie Banner — GDPR/CCPA consent notice.
 *
 * Removable (users who don't need cookie consent can hide it).
 * The `position` input only applies to the `bar` variant, so it is guarded by
 * a `showIf` condition to keep the editor uncluttered for other variants.
 */
const cookie_banner: ComponentSchema = {
    key: 'cookie_banner',
    label: 'Cookie Banner',
    isGlobal: true,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'bar', label: 'Bar' },
    ],
    defaultVariant: 'bar',
    inputs: [
        {
            key: 'position',
            label: 'Position',
            type: {
                kind: 'select',
                options: [
                    { label: 'Bottom', value: 'bottom' },
                    { label: 'Top', value: 'top' },
                ],
            },
            showIf: { input: 'variant', equals: 'bar' },
        },
        {
            key: 'policyUrl',
            label: 'Privacy policy URL',
            type: { kind: 'text' },
            default: '/privacy-policy',
        },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Page components (isGlobal: false)
// Declared in template.pages[x].sections and rendered by each page.tsx.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hero — the first visual section on the landing page.
 *
 * Non-removable by default because a landing page without a hero is incomplete.
 * The `backgroundImage`, `backgroundVideo`, and `typingStrings` inputs are each
 * guarded by `showIf` conditions — they only appear when the corresponding variant
 * is selected, keeping the editor clean for users on other variants.
 */
const hero: ComponentSchema = {
    key: 'hero',
    label: 'Hero',
    isGlobal: false,
    repeatable: false,
    removable: false,
    variants: [
        { key: 'default', label: 'Default' },
        { key: 'cinematic', label: 'Cinematic' },
        { key: 'compact', label: 'Compact' },
        { key: 'centered', label: 'Centered' },
        { key: 'minimal', label: 'Minimal' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'terminal_split', label: 'Terminal Split' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'neobrutalism_poster', label: 'Neobrutalism Poster' },
        { key: 'split_section', label: 'Split Section' },
        { key: 'typing_animation', label: 'Typing Animation' },
        { key: 'video_reel', label: 'Video Reel' },
        { key: 'profile_card', label: 'Profile Card' },
        { key: 'vscode', label: 'VS Code Editor' },
    ],
    defaultVariant: 'default',
    inputs: [
        {
            key: 'paddingTop',
            label: 'Top Padding (px)',
            type: {
                kind: 'slider',
                min: 0,
                max: 300,
                step: 10,
            },
            default: 0,
            group: 'Layout',
        },
        {
            key: 'paddingBottom',
            label: 'Bottom Padding (px)',
            type: {
                kind: 'slider',
                min: 0,
                max: 300,
                step: 10,
            },
            default: 0,
            group: 'Layout',
        },
        {
            key: 'headline',
            label: 'Headline',
            type: { kind: 'text' },
            default: "Hi, I'm {name}",
        },
        {
            key: 'subheadline',
            label: 'Subheadline',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'primaryCtaLabel',
            label: 'Primary CTA label',
            type: { kind: 'text' },
            default: 'View My Work',
        },
        {
            key: 'primaryCtaUrl',
            label: 'Primary CTA URL',
            type: { kind: 'text' },
            default: '#projects',
        },
        {
            key: 'secondaryCtaLabel',
            label: 'Secondary CTA label',
            type: { kind: 'text' },
            default: 'Contact Me',
        },
        {
            key: 'secondaryCtaUrl',
            label: 'Secondary CTA URL',
            type: { kind: 'text' },
            default: '/contact',
        },
        {
            key: 'backgroundType',
            label: 'Background Type',
            type: {
                kind: 'select',
                options: [
                    { label: 'None', value: 'none' },
                    { label: 'Image', value: 'image' },
                    { label: 'Video', value: 'video' },
                    { label: 'Effect', value: 'effect' },
                ],
            },
            default: 'none',
        },
        {
            key: 'backgroundImage',
            label: 'Background image',
            type: { kind: 'file', accepts: 'image' },
            showIf: { input: 'backgroundType', equals: 'image' },
        },
        {
            key: 'backgroundVideo',
            label: 'Background video',
            type: { kind: 'file', accepts: 'video' },
            showIf: { input: 'backgroundType', equals: 'video' },
        },
        {
            key: 'backgroundEffect',
            label: 'Background Effect',
            type: {
                kind: 'select',
                options: [
                    { label: 'None', value: 'none' },
                    { label: 'Meteors', value: 'meteors' },
                    { label: 'Dot Pattern', value: 'dot_pattern' },
                    { label: 'Retro Grid', value: 'retro_grid' },
                    { label: 'Flickering Grid', value: 'flickering_grid' },
                    { label: 'Animated Grid', value: 'animated_grid' },
                    { label: 'Ripple', value: 'ripple' },
                    { label: 'Grid Pattern', value: 'grid_pattern' },
                    { label: 'Hexagon Pattern', value: 'hexagon_pattern' },
                    { label: 'Striped Pattern', value: 'striped_pattern' },
                    { label: 'Interactive Grid', value: 'interactive_grid' },
                    { label: 'Noise Texture', value: 'noise_texture' },
                    { label: 'Gradient Animation', value: 'gradient_animation' },
                    { label: 'Wavy Background', value: 'wavy_background' },
                    { label: 'Background Boxes', value: 'background_boxes' },
                    { label: 'Background Beams', value: 'background_beams' },
                    { label: 'Beams with Collision', value: 'beams_with_collision' },
                    { label: 'Background Lines', value: 'background_lines' },
                    { label: 'Aurora Background', value: 'aurora_background' },
                    { label: 'Stars Background', value: 'stars_background' },
                    { label: 'Spotlight', value: 'spotlight' },
                    { label: 'Lamp', value: 'lamp' },
                ],
            },
            default: 'meteors',
            showIf: { input: 'backgroundType', equals: 'effect' },
        },
        {
            key: 'backgroundOpacity',
            label: 'Background Opacity (%)',
            type: {
                kind: 'slider',
                min: 0,
                max: 100,
                step: 5,
            },
            default: 50,
        },
        {
            key: 'typingStrings',
            label: 'Typing animation strings (comma-separated)',
            type: { kind: 'text' },
            default: 'Developer, Designer, Creator',
            showIf: { input: 'variant', equals: 'typing_animation' },
        },

        {
            key: 'avatarImage',
            label: 'Avatar image',
            type: { kind: 'file', accepts: 'image' },
        },
        {
            key: 'showAvatar',
            label: 'Show avatar',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showPlayButton',
            label: 'Show "Play Reel" button',
            type: { kind: 'boolean' },
            default: true,
            showIf: { input: 'variant', equals: 'video_reel' },
        },
    ],
};

/**
 * About — bio, profile image, and skills summary section.
 *
 * `resumeFile` and `resumeLabel` are guarded by `showIf` so they only appear
 * when the resume button is enabled, preventing unnecessary file uploads for
 * users who don't want a resume download link.
 */
const about: ComponentSchema = {
    key: 'about',
    label: 'About',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'default', label: 'Default' },
        { key: 'minimal', label: 'Minimal' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'director_cut', label: 'Director Cut' },
        { key: 'vscode', label: 'VS Code Markdown' },
    ],
    defaultVariant: 'default',
    inputs: [
        {
            key: 'bio',
            label: 'Bio',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'profileImage',
            label: 'Profile image',
            type: { kind: 'file', accepts: 'image' },
        },
        {
            key: 'showProfileImage',
            label: 'Show profile image',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showSkills',
            label: 'Show skills',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showResumeButton',
            label: 'Show resume download button',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'resumeFile',
            label: 'Resume file',
            type: { kind: 'file', accepts: 'doc' },
            showIf: { input: 'showResumeButton', equals: true },
        },
        {
            key: 'resumeLabel',
            label: 'Resume button label',
            type: { kind: 'text' },
            default: 'Download Resume',
            showIf: { input: 'showResumeButton', equals: true },
        },
    ],
};

/**
 * Skills — displays the user's skill set.
 *
 * The `showProficiencyLevel` input controls whether a percentage bar or level
 * label is rendered alongside each skill. The `layout` select adjusts spacing
 * and density, useful for users with many skills.
 */
const skills: ComponentSchema = {
    key: 'skills',
    label: 'Skills',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'icon_grid', label: 'Icon Grid' },
        { key: 'minimal_list', label: 'Minimal List' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'tag_cloud', label: 'Tag Cloud' },
        { key: 'vscode', label: 'VS Code Extensions' },
    ],
    defaultVariant: 'icon_grid',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'Skills',
        },
        {
            key: 'showProficiencyLevel',
            label: 'Show proficiency level',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'layout',
            label: 'Layout density',
            type: {
                kind: 'select',
                options: [
                    { label: 'Compact', value: 'compact' },
                    { label: 'Spacious', value: 'spacious' },
                ],
            },
        },
    ],
};

/**
 * Featured Projects — grid/table/bento display of the user's projects.
 *
 * Repeatable so users can have multiple project sections on one page (e.g.
 * one section filtered by "web" and another by "design"). `filterByTag` accepts
 * a comma-separated list of tag slugs to narrow which projects are displayed.
 * `viewAllLabel` is guarded by `showIf` to avoid surfacing an inaccessible input.
 */
const featured_projects: ComponentSchema = {
    key: 'featured_projects',
    label: 'Featured Projects',
    isGlobal: false,
    repeatable: true,
    removable: true,
    variants: [
        { key: 'minimal_list', label: 'Minimal List' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'terminal_process', label: 'Terminal Process' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'neobrutalism_stack', label: 'Neobrutalism Stack' },
        { key: 'table', label: 'Table' },
        { key: 'grid', label: 'Grid' },
        { key: 'cinematic_grid', label: 'Cinematic Grid' },
        { key: 'spotlight', label: 'Spotlight' },
        { key: 'vscode', label: 'VS Code Explorer' },
    ],
    defaultVariant: 'grid',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'Projects',
        },
        {
            key: 'maxItems',
            label: 'Max items to show',
            type: {
                kind: 'select',
                options: [
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '6', value: '6' },
                    { label: 'All', value: 'all' },
                ],
            },
            default: '6',
        },
        {
            key: 'filterByTag',
            label: 'Filter by tag(s) (comma-separated)',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'showViewAll',
            label: 'Show "View all" link',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'viewAllLabel',
            label: '"View all" link label',
            type: { kind: 'text' },
            default: 'View All Projects',
            showIf: { input: 'showViewAll', equals: true },
        },
        {
            key: 'hoverToPlay',
            label: 'Hover to play video',
            type: { kind: 'boolean' },
            default: true,
            showIf: { input: 'variant', equals: 'cinematic_grid' },
        },
    ],
};

/**
 * Media Gallery — displays a collection of images.
 *
 * Repeatable to support multiple galleries on one page (e.g. photography
 * portfolio with separate nature and portrait galleries). The `columns` input
 * is guarded by `showIf` because it is only meaningful for the `grid` variant
 * — masonry and carousel control their own layout geometry.
 */
const media_gallery: ComponentSchema = {
    key: 'media_gallery',
    label: 'Media Gallery',
    isGlobal: false,
    repeatable: true,
    removable: true,
    variants: [
        { key: 'carousel', label: 'Carousel' },
        { key: 'grid', label: 'Grid' },
        { key: 'masonry', label: 'Masonry' },
        { key: 'horizontal_scroll', label: 'Horizontal Scroll' },
    ],
    defaultVariant: 'masonry',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'Gallery',
        },
        {
            key: 'images',
            label: 'Images',
            type: { kind: 'file', accepts: 'image', multiple: true },
            default: [],
        },
        {
            key: 'showCaptions',
            label: 'Show captions',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'lightboxEnabled',
            label: 'Enable lightbox',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'columns',
            label: 'Number of columns',
            type: {
                kind: 'select',
                options: [
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                ],
            },
            default: '3',
            showIf: { input: 'variant', equals: 'grid' },
        },
    ],
};

/**
 * Project Details — renders the canonical individual project page content.
 *
 * Unlike Media Gallery, this section reads from `siteData.project` and is meant
 * for project detail routes only: title, metadata, project-owned images, author
 * context, outbound links, and related project links.
 */
const project_details: ComponentSchema = {
    key: 'project_details',
    label: 'Project Details',
    isGlobal: false,
    repeatable: false,
    removable: false,
    variants: [
        { key: 'default', label: 'Default' },
        { key: 'cinematic', label: 'Cinematic' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'vscode', label: 'VS Code' },
        { key: 'minimal', label: 'Minimal' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
    ],
    defaultVariant: 'default',
    inputs: [],
};

/**
 * Latest Blogs — preview cards linking to blog posts.
 *
 * Non-repeatable (one blog section per page is sufficient). `viewAllLabel`
 * is guarded by `showIf` to keep the UI clean when the link is disabled.
 */
const latest_blogs: ComponentSchema = {
    key: 'latest_blogs',
    label: 'Latest Blog Posts',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'minimal_list', label: 'Minimal List' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'terminal_changelog', label: 'Terminal Changelog' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'neobrutalism_zine', label: 'Neobrutalism Zine' },
        { key: 'grid', label: 'Grid' },
        { key: 'editorial', label: 'Editorial' },
        { key: 'vscode', label: 'VS Code Search' },
    ],
    defaultVariant: 'grid',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'Latest Posts',
        },
        {
            key: 'maxItems',
            label: 'Max items to show',
            type: {
                kind: 'select',
                options: [
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '6', value: '6' },
                    { label: 'All', value: 'all' },
                ],
            },
            default: '3',
        },
        {
            key: 'showExcerpt',
            label: 'Show excerpt',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showDate',
            label: 'Show publication date',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showTags',
            label: 'Show tags',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showViewAll',
            label: 'Show "View all" link',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'viewAllLabel',
            label: '"View all" link label',
            type: { kind: 'text' },
            default: 'View All Posts',
            showIf: { input: 'showViewAll', equals: true },
        },
    ],
};

/**
 * CTA (Call to Action) — a conversion-focused section prompting visitor action.
 *
 * Repeatable so that a landing page can have a mid-page CTA and a bottom CTA
 * with different messaging. `backgroundStyle` is a token input — the renderer
 * maps the chosen token to the appropriate CSS class (e.g. `bg-primary`).
 */
const cta: ComponentSchema = {
    key: 'cta',
    label: 'Call to Action',
    isGlobal: false,
    repeatable: true,
    removable: true,
    variants: [
        { key: 'default', label: 'Default' },
        { key: 'card', label: 'Card' },
        { key: 'banner', label: 'Banner' },
        { key: 'minimal', label: 'Minimal' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
    ],
    defaultVariant: 'default',
    inputs: [
        {
            key: 'headline',
            label: 'Headline',
            type: { kind: 'text' },
            default: "Let's Work Together",
        },
        {
            key: 'subtext',
            label: 'Subtext',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'primaryCtaLabel',
            label: 'Primary CTA label',
            type: { kind: 'text' },
            default: 'Get In Touch',
        },
        {
            key: 'primaryCtaUrl',
            label: 'Primary CTA URL',
            type: { kind: 'text' },
            default: '/contact',
        },
        {
            key: 'secondaryCtaLabel',
            label: 'Secondary CTA label',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'secondaryCtaUrl',
            label: 'Secondary CTA URL',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'backgroundStyle',
            label: 'Background color token',
            type: { kind: 'token', category: 'color' },
        },
    ],
};

/**
 * Testimonials — social proof from clients, colleagues, or collaborators.
 *
 * Non-repeatable (one testimonials section per page). `maxItems` controls how
 * many testimonials are shown before a "load more" or pagination trigger.
 */
const testimonials: ComponentSchema = {
    key: 'testimonials',
    label: 'Testimonials',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'carousel', label: 'Carousel' },
    ],
    defaultVariant: 'carousel',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'What People Say',
        },
        {
            key: 'maxItems',
            label: 'Max items to show',
            type: {
                kind: 'select',
                options: [
                    { label: '3', value: '3' },
                    { label: '6', value: '6' },
                    { label: 'All', value: 'all' },
                ],
            },
            default: '6',
        },
        {
            key: 'showAvatar',
            label: 'Show avatar',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showCompany',
            label: 'Show company name',
            type: { kind: 'boolean' },
            default: true,
        },
    ],
};

/**
 * Services — describes what the user offers professionally.
 *
 * `showPricing` toggles whether price information (from the services data model)
 * is rendered. `pricing_table` variant requires `showPricing: true` to be useful.
 */
const services: ComponentSchema = {
    key: 'services',
    label: 'Services',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'card_grid', label: 'Card Grid' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
    ],
    defaultVariant: 'card_grid',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'Services',
        },
        {
            key: 'showPricing',
            label: 'Show pricing',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'columns',
            label: 'Number of columns',
            type: {
                kind: 'select',
                options: [
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                ],
            },
            default: '3',
        },
    ],
};

/**
 * Experience — work history, education, and certifications.
 *
 * The `showEducation`, `showWork`, and `showCertifications` toggles allow users
 * to mix and match which experience types appear in this section. `sortOrder`
 * controls chronological vs reverse-chronological ordering.
 */
const experience: ComponentSchema = {
    key: 'experience',
    label: 'Experience',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'minimal_list', label: 'Minimal List' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'timeline', label: 'Timeline' },
    ],
    defaultVariant: 'timeline',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'Experience',
        },
        {
            key: 'showEducation',
            label: 'Show education',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showWork',
            label: 'Show work experience',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showCertifications',
            label: 'Show certifications',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'sortOrder',
            label: 'Sort order',
            type: {
                kind: 'select',
                options: [
                    { label: 'Newest First', value: 'desc' },
                    { label: 'Oldest First', value: 'asc' },
                ],
            },
            default: 'desc',
        },
    ],
};

/**
 * Contact — contact form and/or contact info section.
 *
 * `formFields` controls the complexity of the contact form — from a minimal
 * name+email+message to a fuller form including subject and phone number.
 * `showMap` is off by default as it requires additional API configuration.
 */
const contact: ComponentSchema = {
    key: 'contact',
    label: 'Contact',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'split_with_info', label: 'Split with Info' },
        { key: 'minimal', label: 'Minimal' },
        { key: 'terminal', label: 'Terminal' },
        { key: 'terminal_ssh', label: 'Terminal SSH' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'neobrutalism_ticket', label: 'Neobrutalism Ticket' },
        { key: 'social_cards', label: 'Social Cards' },
        { key: 'vscode', label: 'VS Code Terminal' },
    ],
    defaultVariant: 'split_with_info',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: 'Get In Touch',
        },
        {
            key: 'showForm',
            label: 'Show contact form',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showEmail',
            label: 'Show email address',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showPhone',
            label: 'Show phone number',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'showSocialLinks',
            label: 'Show social links',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showMap',
            label: 'Show map',
            type: { kind: 'boolean' },
            default: false,
        },
        {
            key: 'formFields',
            label: 'Form fields',
            type: {
                kind: 'select',
                options: [
                    { label: 'Name + Email + Message', value: 'basic' },
                    { label: '+ Subject', value: 'with_subject' },
                    { label: '+ Phone', value: 'with_phone' },
                ],
            },
            default: 'basic',
        },
    ],
};

/**
 * Stats — animated counters or metric highlights (e.g. "50+ projects", "5 years").
 *
 * `sectionTitle` defaults to empty because many designs render stats without a
 * visible heading, relying on the numbers themselves to communicate. `animateCounters`
 * enables the count-up animation on scroll into view.
 */
const stats: ComponentSchema = {
    key: 'stats',
    label: 'Stats',
    isGlobal: false,
    repeatable: false,
    removable: true,
    variants: [
        { key: 'minimal_row', label: 'Minimal Row' },
        { key: 'neobrutalism', label: 'Neobrutalism' },
        { key: 'counter_row', label: 'Counter Row' },
    ],
    defaultVariant: 'counter_row',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'animateCounters',
            label: 'Animate counters on scroll',
            type: { kind: 'boolean' },
            default: true,
        },
        {
            key: 'showIcons',
            label: 'Show icons',
            type: { kind: 'boolean' },
            default: true,
        },
    ],
};

/**
 * Social Feed — embeds a live or cached feed from a social platform.
 *
 * Repeatable so users can show feeds from multiple platforms (e.g. Instagram
 * photos + Dribbble shots on the same page). `sectionTitle` defaults to empty
 * because many designs show the platform logo as the heading instead of text.
 * Only platforms with an embeddable grid layout are included; Twitter/X and
 * LinkedIn feeds are excluded due to their embed restrictions.
 */
const social_feed: ComponentSchema = {
    key: 'social_feed',
    label: 'Social Feed',
    isGlobal: false,
    repeatable: true,
    removable: true,
    variants: [
        { key: 'grid', label: 'Grid' },
    ],
    defaultVariant: 'grid',
    inputs: [
        {
            key: 'sectionTitle',
            label: 'Section title',
            type: { kind: 'text' },
            default: '',
        },
        {
            key: 'platform',
            label: 'Platform',
            type: {
                kind: 'select',
                options: [
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Dribbble', value: 'dribbble' },
                    { label: 'Behance', value: 'behance' },
                    { label: 'YouTube', value: 'youtube' },
                ],
            },
            default: 'instagram',
        },
        {
            key: 'maxItems',
            label: 'Max items to show',
            type: {
                kind: 'select',
                options: [
                    { label: '6', value: '6' },
                    { label: '9', value: '9' },
                    { label: '12', value: '12' },
                ],
            },
            default: '9',
        },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Registry export
// ─────────────────────────────────────────────────────────────────────────────

/**
 * ComponentRegistry — the central map of all available portfolio section components.
 *
 * Keyed by stable component key strings. Consumed by:
 * - `registry.ts`  — template definitions reference component keys and allowed variants
 * - `merge.ts`     — resolves input defaults during SSR
 * - The editor UI  — renders the correct input controls per component
 * - The renderer   — dynamically imports the correct variant component file
 *
 * Invariant: every `componentKey` referenced in `registry.ts` must exist here.
 */
export const ComponentRegistry: Record<string, ComponentSchema> = {
    header,
    footer,
    cookie_banner,
    hero,
    about,
    skills,
    featured_projects,
    media_gallery,
    project_details,
    latest_blogs,
    cta,
    testimonials,
    services,
    experience,
    contact,
    stats,
    social_feed,
};
