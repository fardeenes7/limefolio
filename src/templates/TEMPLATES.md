# Limefolio Templating Engine — Reference Documentation

> **Audience:** This document is the canonical reference for anyone — human developer
> or AI coding agent — working on the Limefolio templating system. It is written to
> be precise enough that an LLM can make correct edits to `components.ts`,
> `registry.ts`, `merge.ts`, and the Django models without needing to read every source
> file from scratch.

---

## Overview

The Limefolio templating engine controls how a user's portfolio site is structured and
rendered. It enables users to choose a visual template, pick a colour theme and font,
and then customise individual sections (called "components") by selecting variants and
adjusting inputs — all without writing code.

The system is built on a **three-layer model** that deliberately separates what is static
from what is dynamic, and what is authored from what is user-generated:

### Layer 1 — Schema layer (static, authored by developers)

Lives in the Next.js codebase:

- **`src/templates/components.ts`** — defines every available portfolio section component:
  its key, variants, inputs, and flags.
- **`src/templates/registry.ts`** — defines every available portfolio template: which
  components appear on which pages, in what order, with which allowed variants.
- **`src/templates/config.ts`** — maps raw Django API payloads into the TypeScript
  `UserPortfolioConfig` shape used by SSR and public page rendering.

These files are compile-time constants. They never change at runtime and are never
stored in the database. When you add a new component or template, you edit these files
and deploy.

### Layer 2 — User config layer (sparse deltas, persisted in Django)

Stored in `PortfolioTemplateConfig.config_overrides / config_additions / config_removals
/ config_ordering / theme_overrides` JSON columns.

The user config stores **only what the user has explicitly changed** from the template
defaults. It is a diff, not a snapshot. If the user has not changed a section's variant,
there is no `variant` key stored for that section. This design means:

- Default values always come from the schema, not the database.
- Template updates (new inputs, new sections) are picked up automatically by new users
  and by existing users who have not overridden that specific setting.
- The stored payload is small, human-readable, and easily migrated.

**Never store the full resolved config in the database.** Only raw delta fields.

### Layer 3 — Resolved layer (SSR only, never persisted)

Computed at request time by `src/templates/merge.ts`:

```
resolvePortfolioConfig(template, userConfig) → ResolvedPortfolioConfig
```

The resolved config is the full merged result: every section in display order, every
input with its final value, every variant resolved. It is passed directly to `layout.tsx`
and `page.tsx` components and is **never sent back to the Django API**.

---

## Core Concepts

### Component

A component is a reusable portfolio section — a discrete piece of UI that the user can
add, configure, and (if allowed) remove from their portfolio. Components are defined in
`ComponentRegistry` in `components.ts`.

```ts
// Example: the "hero" component key in ComponentRegistry
ComponentRegistry['hero'].key         // "hero"
ComponentRegistry['hero'].label       // "Hero"
ComponentRegistry['hero'].isGlobal    // false
ComponentRegistry['hero'].repeatable  // false
ComponentRegistry['hero'].removable   // false
```

**`isGlobal: true`** means the component is automatically rendered on every page
without being declared in each page's section list. Global components (`header`,
`footer`, `cookie_banner`) are sourced from `template.layout` and injected by
`resolvePortfolioConfig`. They must NOT appear in `template.pages[x].sections`.

**`repeatable: true`** means the user can add multiple independent instances of this
component to the same page (e.g. two `featured_projects` sections filtered by different
tags). Each instance gets a unique `instanceId` like `"featured_projects_2"`.

**`removable: true`** means the user can delete this component from their layout
entirely. A `SectionInstance` in the template definition can further pin a normally
removable component by setting `removable: false` for that specific instance, or unpin
a normally non-removable component by setting `removable: true`.

### Variant

A variant is a visual style variation of a component. For example, the `hero` component
has variants `default`, `typing_animation`, `image_split`, `video_background`, etc.
Each variant is a separate React component file under
`src/components/sections/hero/default.tsx`, `src/components/sections/hero/typing_animation.tsx`,
etc.

`allowedVariants` in a `SectionInstance` narrows the full list of variants declared in
the component schema. A template can restrict which variants the user may choose — for
example, a minimalist template might only allow `minimal_text` for the hero.

```ts
// In registry.ts — restrict hero to two variants on a hypothetical minimal template
{
  instanceId: 'hero_1',
  componentKey: 'hero',
  allowedVariants: ['minimal_text', 'default'],  // user can only pick these two
  defaultVariant: 'minimal_text',
}
```

### Input

An input is a user-configurable property on a component. Inputs are defined in
`ComponentSchema.inputs` and rendered as editor controls in the dashboard UI.

Each input has a `kind`:

| Kind | What it stores | Editor control |
|---|---|---|
| `text` | A free-form string | Text input / textarea |
| `boolean` | `true` or `false` | Toggle switch |
| `select` | One of a fixed set of string `value`s | Dropdown |
| `file` | A URL to an uploaded asset | File picker |
| `token` | A shadcn CSS variable name (e.g. `"--primary"`) | Token palette picker |
| `slider` | A numeric value within a bounded range | Slider control |

**`showIf`** conditionally hides an input in the editor when another input's current
value does not match. It does NOT affect SSR — the input's default is applied
regardless. Example:

```ts
{
  key: 'ctaLabel',
  label: 'CTA label',
  type: { kind: 'text' },
  default: 'Hire Me',
  showIf: { input: 'ctaButton', equals: true },
  // only visible in the editor when ctaButton === true
}
```

### SectionInstance

A `SectionInstance` is a concrete placement of a component within a template's layout
or a page. It is declared in `registry.ts` and looks like:

```ts
{
  instanceId: 'hero_1',        // stable slug — NEVER CHANGE after publishing
  componentKey: 'hero',        // must exist in ComponentRegistry
  allowedVariants: ['default', 'minimal_text'],
  defaultVariant: 'default',   // must be in allowedVariants
  fixed: true,                 // user cannot reorder or remove
  removable: false,            // overrides ComponentSchema.removable
}
```

**`instanceId` must be stable.** It is the join key between the template definition
and the user's stored overrides in `PortfolioTemplateConfig`. If you rename an
`instanceId`, all existing users lose their customizations for that section because the
merge function will no longer find a matching override. Treat `instanceId` changes as
breaking changes that require a version bump and a data migration.

### Template

A template is a complete portfolio layout definition. It declares:

- `layout` — global sections rendered by `layout.tsx` (header, footer, etc.)
- `pages` — one `TemplatePage` per supported route

Templates are registered in `TemplateRegistry` in `registry.ts` and selected by the
user in the dashboard. Switching templates applies the new template's `defaultTheme`
and `defaultFont` (replacing the user's current values), then presents the template's
default section layout. Existing content (projects, blog posts, skills, etc.) is
unchanged — only the presentation layer changes.

**`version`** is a semver string (e.g. `"1.0.0"`). It is recorded on each
`PortfolioTemplateConfig` row and is used to detect stale configs when breaking
changes are published. See "How to update a template version" below.

### UserPortfolioConfig

This is the TypeScript type (`src/templates/types.ts`) corresponding to what the Django
`PortfolioTemplateConfig` model stores. It has four delta fields:

| Field | What it stores |
|---|---|
| `overrides` | Variant and input changes keyed by `instanceId`. Sparse — only changed keys. |
| `additions` | User-added `SectionInstance` objects for repeatable components. |
| `removals` | `instanceId` arrays of sections the user has explicitly removed. |
| `ordering` | `instanceId` arrays representing the user's preferred section order. |
| `themeOverrides` | CSS variable overrides for the active theme, such as custom colors or radius. |

Example of a minimal user config after the user changed only the hero variant:

```json
{
  "templateKey": "default",
  "themeKey": "catppuccin",
  "fontKey": "outfit",
  "templateVersion": "1.0.0",
  "overrides": {
    "layout": {},
    "pages": {
      "landing": {
        "hero_1": { "variant": "typing_animation" }
      }
    }
  },
  "additions": { "layout": [], "pages": {} },
  "removals": { "layout": [], "pages": {} },
  "ordering": {}
}
```

### ResolvedPortfolioConfig

The SSR merge result. It is computed by `resolvePortfolioConfig(template, userConfig)`
and contains fully resolved sections with `resolvedVariant` and `resolvedInputs`
populated. It is passed to layout and page components and **must never be sent to the
Django API or stored in the database.**

---

## Merge Algorithm

`resolvePortfolioConfig` in `src/templates/merge.ts` implements the following algorithm
for each context (layout and each page):

### Step 1 — Start with template sections as the base

Begin with the ordered `SectionInstance[]` from `template.layout` or
`template.pages[pageKey].sections`.

### Step 2 — Apply user ordering

If `userConfig.ordering.layout` (or `ordering.pages[pageKey]`) is present:

1. Reorder the template sections to match the user's `instanceId` array.
2. Any template sections whose `instanceId` is **not** in the user's ordering array
   are **appended at the end in their original template order**.

This second rule is important: when a new section is added to a template version
(e.g. `experience_1` is added to the landing page in v1.1.0), users who have a saved
ordering from v1.0.0 will not have `experience_1` in their ordering array. The merge
function will automatically append it after their known sections. No manual migration
needed for ordering-only additions.

### Step 3 — Apply removals

Remove any `SectionInstance` whose `instanceId` appears in `userConfig.removals.layout`
or `userConfig.removals.pages[pageKey]`.

### Step 4 — Append user additions

Append any `SectionInstance[]` from `userConfig.additions.layout` or
`userConfig.additions.pages[pageKey]` at the end of the section list.

### Step 5 — Resolve inputs and variant for each section

For each section, the final values are determined by this priority order
(lowest priority → highest priority):

1. `ComponentSchema.inputs[n].default` for each input key
2. `SectionInstance.inputDefaults[n]` (per-instance defaults in the template definition)
3. `userConfig.overrides[pageKey][instanceId].inputs[key]` (only keys explicitly set by the user)

Variant resolution validates persisted values against `allowedVariants` and the component
schema. Invalid or stale variants fall back to the section default, then to the component
schema default if needed.

Only keys explicitly present in `userOverride.inputs` are applied. The entire override
object is never merged blindly — a user override of `{ headline: "Hello" }` does not
affect any other input.

### Layout sections

Global components (`isGlobal: true` in `ComponentRegistry`) are resolved from
`template.layout` into `ResolvedPortfolioConfig.layout`. They are not inserted into each
`ResolvedPage.sections` array. Runtime rendering wraps page content with
`LayoutPageRenderer`: header sections render above page content, and footer/cookie
sections render below it.

Global components must not be declared in `template.pages[x].sections`. Declaring one
there would result in it appearing twice if a page rendered both layout and page sections.

### Edge cases

**New user with empty config:** Pass `emptyUserConfig(templateKey, themeKey, fontKey, version)`
as the `userConfig`. All four delta fields are empty, so the merge returns the full
template defaults — exactly what the template author declared.

**Template updated with a new section:** The new section is not in the user's ordering
array, so it is appended after the user's known sections (Step 2). No migration needed.

**Template updated with a removed section:** The removed section no longer appears in the
template base list, so it cannot appear in the resolved output even if the user has an
override for it in the database. The orphaned override stays inert in the DB and does
no harm. When the user next saves their config, the orphaned key can be cleaned up.

---

## How to Add a New Component

1. **Add the `ComponentSchema`** to `src/templates/components.ts`. Give it a stable,
   lowercase `key` with underscores (e.g. `"timeline_feed"`). Add a JSDoc comment
   explaining what it renders and any non-obvious design decisions.

2. **Add it to `registry.ts`** in whichever templates and pages it belongs in. Create
   a new `SectionInstance` entry with a stable `instanceId` (e.g. `"timeline_feed_1"`).
   If adding to an existing template, bump the template's `version` (it's a breaking
   change if it inserts between existing sections and would disrupt existing orderings).

3. **Build the React components** under `src/components/sections/[componentKey]/`.
   Name each file after its variant: `default.tsx`, `grid.tsx`, `masonry.tsx`, etc.
   Variant filenames must be lowercase and may use numbers, underscores, or hyphens.

4. **Regenerate `VariantRegistry.tsx`** so the renderer can import the new files:
   ```bash
   npm run variants:generate
   ```
   Use `npm run variants:check` in CI or before committing to detect registry drift.

5. **Update this document** — add the new component to the Component Reference Table
   and document any non-obvious behaviour.

---

## How to Add a New Template

1. **Add the `Template` entry** to `src/templates/registry.ts`. Choose a stable `key`
   (lowercase, hyphens allowed). Set `version: "1.0.0"`.

2. **Declare `layout` and `pages`** with `SectionInstance` entries pointing to existing
   component keys. Use `allVariants(componentKey)` to allow all variants, or provide a
   curated subset.

3. **Build template-specific component variants** if needed (e.g. a `hero_split`
   variant that only makes sense in this template). Add every public variant to
   `ComponentRegistry`, then run `npm run variants:generate`; do not expose variants
   that cannot render.

4. **Add a theme entry** to `src/themes/index.ts` and create the corresponding
   `src/themes/[slug].css` file if the template needs a custom default theme. Add a
   font entry to `src/lib/fonts.ts` if a custom font is needed.

5. **Update this document** — add the template to the Template Reference section.

---

## How to Update a Template Version (Option C Migration)

When a breaking change is made to an existing template — such as removing a section,
renaming an `instanceId`, or changing an input key — the template's `version` field
must be bumped and a Django data migration must be written.

### What counts as a breaking change

- Removing a `SectionInstance` from `layout` or a page's `sections`
- Renaming an `instanceId`
- Renaming an input `key` on a component
- Removing an input `key` from a component

Adding new sections or inputs is **non-breaking** (handled automatically by the merge
algorithm).

### Migration procedure

1. **Bump the version** in `registry.ts`:
   ```ts
   version: '1.1.0',  // was '1.0.0'
   ```

2. **Write a Django management command** (or data migration) that:
   - Queries all `PortfolioTemplateConfig` records where `template_key = 'default'`
     and `template_version = '1.0.0'`
   - Applies the necessary transformation to `config_overrides`, `config_additions`,
     `config_removals`, or `config_ordering` (e.g. deletes orphaned override keys,
     renames instanceId keys in the stored JSON)
   - Sets `template_version = '1.1.0'` on each record
   - Creates a `TemplateVersionMigrationLog` record for each migrated row with
     `from_version='1.0.0'`, `to_version='1.1.0'`, `changes_applied=[...]`

3. **Deploy** the new Next.js code and run the management command.

Example management command skeleton:

```python
from django.core.management.base import BaseCommand
from portfolios.models import PortfolioTemplateConfig, TemplateVersionMigrationLog

class Command(BaseCommand):
    help = 'Migrate default template from v1.0.0 to v1.1.0'

    def handle(self, *args, **options):
        configs = PortfolioTemplateConfig.objects.filter(
            template_key='default',
            template_version='1.0.0',
        )
        for config in configs:
            changes = []
            # Example: remove orphaned override for a deleted section
            overrides = config.config_overrides or {}
            landing_overrides = overrides.get('pages', {}).get('landing', {})
            if 'old_section_1' in landing_overrides:
                del landing_overrides['old_section_1']
                changes.append('Removed orphaned override for old_section_1')
            config.config_overrides = overrides
            config.template_version = '1.1.0'
            config.save()
            TemplateVersionMigrationLog.objects.create(
                config=config,
                template_key='default',
                from_version='1.0.0',
                to_version='1.1.0',
                changes_applied=changes,
                migrated_by='auto',
            )
        self.stdout.write(f'Migrated {configs.count()} configs.')
```

---

## Constraints (Hard Rules)

All contributors must follow these rules without exception:

- **No hex colors or Tailwind arbitrary color values** anywhere in component schemas,
  theme tokens, or component React implementations. Use shadcn semantic tokens only
  (e.g. `bg-primary`, `text-muted-foreground`, `border-border`). Color inputs must use
  `{ kind: 'token', category: 'color' }`.

- **Site name and logo must never appear as component inputs.** They are sourced from
  the global `Site` model (`title` and `logo` fields) and are automatically available
  to all components.

- **The resolved config must never be sent to or stored in Django.** Only the raw delta
  fields (`config_overrides`, `config_additions`, `config_removals`, `config_ordering`)
  are persisted. Sending a `ResolvedPortfolioConfig` to the API is a hard constraint
  violation.

- **`PATCH` only for config updates.** Never `PUT` the full config. Only send the
  specific delta fields that changed.

- **`template_version` must be recorded on every save** so future migrations can target
  stale configs via `TemplateVersionMigrationLog`.

- **Global components (`isGlobal: true`) must not appear in `template.pages[x].sections`.**
  They are automatically injected by the merge function using `template.layout` as the
  source. Declaring them in page sections would cause them to render twice.

- **`instanceId` values must never change** once a template version is published.
  Changing one orphans all user customizations for that section. It is a breaking change
  requiring a version bump and a data migration.

- **`defaultVariant` must always be a member of `allowedVariants`** in every
  `SectionInstance`. The merge function assumes this invariant holds — violating it
  produces an invalid `resolvedVariant`.

- **`allowedVariants` must always be a subset of the variants declared in the
  component schema.** Referencing a variant key that doesn't exist in the component
  will cause the renderer to fall back to `default` and log a warning.

- **`defaultTheme` and `defaultFont` in a template must exist in their respective
  registries** (`ColorThemes` in `src/themes/index.ts` and `Fonts` in
  `src/lib/fonts.ts`). Referencing a non-existent key will cause the renderer to fall
  back silently but produce a warning in the console.

---

## Component Reference Table

| key | label | isGlobal | repeatable | removable | variants | default variant |
|---|---|---|---|---|---|---|
| `header` | Header | ✓ | ✗ | ✗ | default, compact, centered, editorial, floating | default |
| `footer` | Footer | ✓ | ✗ | ✗ | default, compact, centered | default |
| `cookie_banner` | Cookie Banner | ✓ | ✗ | ✓ | bar | bar |
| `hero` | Hero | ✗ | ✗ | ✗ | default, compact, centered, split_section, typing_animation, video_reel | default |
| `about` | About | ✗ | ✗ | ✓ | default, director_cut | default |
| `skills` | Skills | ✗ | ✗ | ✓ | icon_grid, tag_cloud | icon_grid |
| `featured_projects` | Featured Projects | ✗ | ✓ | ✓ | table, grid, cinematic_grid | grid |
| `media_gallery` | Media Gallery | ✗ | ✓ | ✓ | carousel, grid, masonry, horizontal_scroll | masonry |
| `latest_blogs` | Latest Blog Posts | ✗ | ✗ | ✓ | grid | grid |
| `cta` | Call to Action | ✗ | ✓ | ✓ | default, card, banner, minimal | default |
| `testimonials` | Testimonials | ✗ | ✗ | ✓ | carousel | carousel |
| `services` | Services | ✗ | ✗ | ✓ | card_grid | card_grid |
| `experience` | Experience | ✗ | ✗ | ✓ | timeline | timeline |
| `contact` | Contact | ✗ | ✗ | ✓ | split_with_info, minimal | split_with_info |
| `stats` | Stats | ✗ | ✗ | ✓ | counter_row | counter_row |
| `social_feed` | Social Feed | ✗ | ✓ | ✓ | grid | grid |

---

## Template Reference

Registered templates: `default`, `cinematic`, and `terminal`.

Current public routes render `landing`, `all_projects`, and `project_details`. The
template registry also defines `all_blog`, `blog_details`, and `contact` page configs;
those route implementations still need to be added before those pages are publicly
reachable.

### Template: `default`

| Field | Value |
|---|---|
| key | `default` |
| label | Default |
| version | 1.0.0 |
| defaultTheme | `default` |
| defaultFont | `inter` |

#### Layout sections (rendered by `layout.tsx` on every page)

| instanceId | componentKey | defaultVariant | fixed |
|---|---|---|---|
| `header_1` | `header` | default | ✓ |
| `footer_1` | `footer` | default | ✓ |
| `cookie_banner_1` | `cookie_banner` | bar | ✗ |

#### Page: `landing` (Landing Page)

| instanceId | componentKey | defaultVariant | fixed | removable |
|---|---|---|---|---|
| `hero_1` | `hero` | default | ✓ | ✗ |
| `about_1` | `about` | default | ✗ | ✓ |
| `stats_1` | `stats` | counter_row | ✗ | ✓ |
| `skills_1` | `skills` | icon_grid | ✗ | ✓ |
| `featured_projects_1` | `featured_projects` | grid | ✗ | ✓ |
| `media_gallery_1` | `media_gallery` | masonry | ✗ | ✓ |
| `testimonials_1` | `testimonials` | carousel | ✗ | ✓ |
| `services_1` | `services` | card_grid | ✗ | ✓ |
| `latest_blogs_1` | `latest_blogs` | grid | ✗ | ✓ |
| `cta_1` | `cta` | default | ✗ | ✓ |

#### Page: `all_projects` (All Projects)

| instanceId | componentKey | defaultVariant | fixed | removable |
|---|---|---|---|---|
| `featured_projects_1` | `featured_projects` | grid | ✓ | ✗ |

#### Page: `project_details` (Project Details)

| instanceId | componentKey | defaultVariant | fixed | removable |
|---|---|---|---|---|
| `media_gallery_1` | `media_gallery` | carousel | ✗ | — |
| `cta_1` | `cta` | card | ✗ | — |

#### Page: `all_blog` (All Blog Posts)

| instanceId | componentKey | defaultVariant | fixed | removable |
|---|---|---|---|---|
| `latest_blogs_1` | `latest_blogs` | grid | ✓ | ✗ |

#### Page: `blog_details` (Blog Post)

| instanceId | componentKey | defaultVariant | fixed | removable |
|---|---|---|---|---|
| `cta_1` | `cta` | minimal | ✗ | — |

#### Page: `contact` (Contact)

| instanceId | componentKey | defaultVariant | fixed | removable |
|---|---|---|---|---|
| `contact_1` | `contact` | split_with_info | ✓ | ✗ |
