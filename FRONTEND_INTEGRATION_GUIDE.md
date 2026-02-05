# Experience and Skills Frontend Integration Guide

This guide provides complete frontend integration for the Experience and Skills APIs.

## ✅ What's Already Implemented

### 1. TypeScript Types (`src/types/index.ts`)

- ✅ `Experience` interface with `type_display` field
- ✅ `Skill` interface with all fields
- ✅ `ExperienceFormData` type
- ✅ `SkillFormData` type

### 2. Server Actions (`src/lib/actions/`)

- ✅ `skills.ts` - Full CRUD operations
    - `getSkillList()`
    - `getSkillDetail(id)`
    - `createSkill(data)`
    - `updateSkill(id, data)`
    - `deleteSkill(id)`
    - `toggleSkillPublished(id, isPublished)`
    - `toggleSkillFeatured(id, isFeatured)`
    - `updateSkillsOrder(skills)`

### 3. Validation Schemas (`src/lib/schemas/`)

- ✅ `skill.schema.ts` - Zod validation
    - `skillSchema` - Full skill validation
    - `skillFormSchema` - Form validation
    - `SKILL_CATEGORIES` - Category labels
    - `SKILL_PROFICIENCY` - Proficiency labels
    - `PROFICIENCY_COLORS` - UI color mappings

---

## 📦 Component Architecture

### Recommended Component Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── experiences/
│   │   │   ├── experience-list.tsx
│   │   │   ├── experience-card.tsx
│   │   │   ├── experience-form.tsx
│   │   │   └── experience-timeline.tsx
│   │   └── skills/
│   │       ├── skill-list.tsx
│   │       ├── skill-card.tsx
│   │       ├── skill-form.tsx
│   │       ├── skill-grid.tsx
│   │       └── skill-category-group.tsx
│   └── public/
│       ├── experience-section.tsx
│       ├── skills-section.tsx
│       └── social-links.tsx
└── app/
    └── dashboard/
        ├── experiences/
        │   ├── page.tsx
        │   ├── [id]/
        │   │   └── page.tsx
        │   └── new/
        │       └── page.tsx
        └── skills/
            ├── page.tsx
            ├── [id]/
            │   └── page.tsx
            └── new/
                └── page.tsx
```

---

## 🎨 Component Examples

### 1. Skill Card Component

```typescript
// src/components/dashboard/skills/skill-card.tsx
"use client";

import { Skill } from "@/types";
import { PROFICIENCY_COLORS, SKILL_CATEGORIES } from "@/lib/schemas";
import { toggleSkillFeatured, toggleSkillPublished, deleteSkill } from "@/lib/actions";
import { useState } from "react";

interface SkillCardProps {
    skill: Skill;
    onUpdate?: () => void;
}

export function SkillCard({ skill, onUpdate }: SkillCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleFeatured = async () => {
        await toggleSkillFeatured(skill.id, !skill.is_featured);
        onUpdate?.();
    };

    const handleTogglePublished = async () => {
        await toggleSkillPublished(skill.id, !skill.is_published);
        onUpdate?.();
    };

    const handleDelete = async () => {
        if (!confirm(`Delete ${skill.name}?`)) return;
        setIsDeleting(true);
        await deleteSkill(skill.id);
        onUpdate?.();
    };

    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    {skill.icon_url && (
                        <img
                            src={skill.icon_url}
                            alt={skill.name}
                            className="w-10 h-10"
                        />
                    )}
                    <div>
                        <h3 className="font-semibold text-lg">{skill.name}</h3>
                        <p className="text-sm text-gray-600">
                            {skill.category_display}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {skill.is_featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Featured
                        </span>
                    )}
                    <span
                        className={`text-xs text-white px-2 py-1 rounded ${
                            PROFICIENCY_COLORS[skill.proficiency]
                        }`}
                    >
                        {skill.proficiency_display}
                    </span>
                </div>
            </div>

            {skill.description && (
                <p className="mt-2 text-sm text-gray-700">{skill.description}</p>
            )}

            {skill.years_of_experience && (
                <p className="mt-1 text-xs text-gray-500">
                    {skill.years_of_experience} years of experience
                </p>
            )}

            <div className="mt-4 flex gap-2">
                <button
                    onClick={handleToggleFeatured}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
                >
                    {skill.is_featured ? "Unfeature" : "Feature"}
                </button>
                <button
                    onClick={handleTogglePublished}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-50"
                >
                    {skill.is_published ? "Unpublish" : "Publish"}
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50 disabled:opacity-50"
                >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}
```

### 2. Skill Form Component

```typescript
// src/components/dashboard/skills/skill-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillFormSchema, SKILL_CATEGORIES, SKILL_PROFICIENCY } from "@/lib/schemas";
import { createSkill, updateSkill } from "@/lib/actions";
import { Skill, SkillFormData } from "@/types";
import { useRouter } from "next/navigation";

interface SkillFormProps {
    skill?: Skill;
    onSuccess?: () => void;
}

export function SkillForm({ skill, onSuccess }: SkillFormProps) {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SkillFormData>({
        resolver: zodResolver(skillFormSchema),
        defaultValues: skill || {
            is_published: true,
            is_featured: false,
            order: 0,
        },
    });

    const onSubmit = async (data: SkillFormData) => {
        const response = skill
            ? await updateSkill(skill.id, data)
            : await createSkill(data);

        if (response.ok) {
            onSuccess?.();
            router.push("/dashboard/skills");
        } else {
            alert("Failed to save skill");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">
                    Skill Name *
                </label>
                <input
                    {...register("name")}
                    className="w-full border rounded px-3 py-2"
                    placeholder="e.g., Python, React, Docker"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Category *
                    </label>
                    <select
                        {...register("category")}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select category</option>
                        {Object.entries(SKILL_CATEGORIES).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.category.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Proficiency *
                    </label>
                    <select
                        {...register("proficiency")}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select proficiency</option>
                        {Object.entries(SKILL_PROFICIENCY).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    {errors.proficiency && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.proficiency.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Description
                </label>
                <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Describe your experience with this skill..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Years of Experience
                    </label>
                    <input
                        type="number"
                        {...register("years_of_experience", { valueAsNumber: true })}
                        className="w-full border rounded px-3 py-2"
                        min="0"
                        max="100"
                    />
                    {errors.years_of_experience && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.years_of_experience.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Icon URL
                    </label>
                    <input
                        {...register("icon_url")}
                        className="w-full border rounded px-3 py-2"
                        placeholder="https://..."
                    />
                    {errors.icon_url && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.icon_url.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" {...register("is_featured")} />
                    <span className="text-sm">Featured Skill</span>
                </label>

                <label className="flex items-center gap-2">
                    <input type="checkbox" {...register("is_published")} />
                    <span className="text-sm">Published</span>
                </label>
            </div>

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : skill ? "Update" : "Create"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border rounded hover:bg-gray-50"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
```

### 3. Skills List Page

```typescript
// src/app/dashboard/skills/page.tsx
import { getSkillList } from "@/lib/actions";
import { SkillCard } from "@/components/dashboard/skills/skill-card";
import Link from "next/link";

export default async function SkillsPage() {
    const response = await getSkillList();
    const skills = response.data || [];

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Skills</h1>
                <Link
                    href="/dashboard/skills/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add Skill
                </Link>
            </div>

            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 capitalize">
                        {category.replace("_", " ")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categorySkills.map((skill) => (
                            <SkillCard key={skill.id} skill={skill} />
                        ))}
                    </div>
                </div>
            ))}

            {skills.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p>No skills yet. Add your first skill!</p>
                </div>
            )}
        </div>
    );
}
```

### 4. Public Skills Section

```typescript
// src/components/public/skills-section.tsx
"use client";

import { Skill } from "@/types";
import { PROFICIENCY_COLORS } from "@/lib/schemas";

interface SkillsSectionProps {
    skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
    const featuredSkills = skills.filter((s) => s.is_featured);
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>

                {/* Featured Skills */}
                {featuredSkills.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6">Featured</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {featuredSkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex flex-col items-center text-center"
                                >
                                    {skill.icon_url && (
                                        <img
                                            src={skill.icon_url}
                                            alt={skill.name}
                                            className="w-16 h-16 mb-3"
                                        />
                                    )}
                                    <h4 className="font-medium">{skill.name}</h4>
                                    <span
                                        className={`text-xs text-white px-2 py-1 rounded mt-2 ${
                                            PROFICIENCY_COLORS[skill.proficiency]
                                        }`}
                                    >
                                        {skill.proficiency_display}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* All Skills by Category */}
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 capitalize">
                            {category.replace("_", " ")}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {categorySkills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full"
                                >
                                    {skill.icon_url && (
                                        <img
                                            src={skill.icon_url}
                                            alt={skill.name}
                                            className="w-5 h-5"
                                        />
                                    )}
                                    <span className="font-medium">{skill.name}</span>
                                    {skill.years_of_experience && (
                                        <span className="text-xs text-gray-600">
                                            ({skill.years_of_experience}y)
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
```

---

## 🔗 Icon Resources

### Free Icon CDNs for Skills

```typescript
// Example icon URLs for common skills

const SKILL_ICONS = {
    // Programming Languages
    python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    javascript:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    typescript:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",

    // Frameworks
    react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",

    // Databases
    postgresql:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    mongodb:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",

    // DevOps
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    kubernetes:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
};
```

---

## 🎯 Usage Examples

### Dashboard - Create Skill

```typescript
import { SkillForm } from "@/components/dashboard/skills/skill-form";

export default function NewSkillPage() {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Add New Skill</h1>
            <SkillForm />
        </div>
    );
}
```

### Public Portfolio - Display Skills

```typescript
import { publicApi } from "@/lib/public-fetcher";
import { SkillsSection } from "@/components/public/skills-section";

export default async function PortfolioPage() {
    const skillsResponse = await publicApi.get("/api/public/skills/");
    const skills = skillsResponse.data || [];

    return (
        <main>
            <SkillsSection skills={skills} />
        </main>
    );
}
```

---

## 📝 Next Steps

1. **Create Dashboard Pages**
    - `/dashboard/skills` - List all skills
    - `/dashboard/skills/new` - Create new skill
    - `/dashboard/skills/[id]` - Edit skill
    - `/dashboard/experiences` - List experiences
    - `/dashboard/experiences/new` - Create experience

2. **Add UI Components**
    - Drag-and-drop reordering
    - Skill category filters
    - Search functionality
    - Bulk actions

3. **Enhance Public Display**
    - Animated skill bars
    - Interactive tooltips
    - Skill endorsements
    - Timeline view for experiences

4. **Add Features**
    - Import skills from LinkedIn
    - Skill recommendations
    - Proficiency tests
    - Skill tags/keywords

---

## 🎨 Styling Tips

### Tailwind Classes for Skills

```css
/* Proficiency Badges */
.proficiency-beginner {
    @apply bg-blue-500 text-white;
}
.proficiency-intermediate {
    @apply bg-green-500 text-white;
}
.proficiency-advanced {
    @apply bg-orange-500 text-white;
}
.proficiency-expert {
    @apply bg-purple-500 text-white;
}

/* Category Colors */
.category-programming {
    @apply border-l-4 border-blue-600;
}
.category-framework {
    @apply border-l-4 border-green-600;
}
.category-database {
    @apply border-l-4 border-yellow-600;
}
.category-devops {
    @apply border-l-4 border-red-600;
}
.category-design {
    @apply border-l-4 border-pink-600;
}
```

---

## ✅ Summary

All frontend infrastructure is ready:

- ✅ TypeScript types defined
- ✅ Server actions created
- ✅ Validation schemas ready
- ✅ Component examples provided
- ✅ Integration patterns documented

You can now start building the UI components and pages!
