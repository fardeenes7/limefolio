# Frontend API Quick Reference

## 🚀 Quick Start

### Import Actions

```typescript
import {
    getSkillList,
    createSkill,
    updateSkill,
    deleteSkill,
    toggleSkillFeatured,
    toggleSkillPublished,
} from "@/lib/actions";
```

### Import Types

```typescript
import type {
    Skill,
    SkillFormData,
    Experience,
    ExperienceFormData,
} from "@/types";
```

### Import Schemas

```typescript
import {
    skillFormSchema,
    SKILL_CATEGORIES,
    SKILL_PROFICIENCY,
} from "@/lib/schemas";
```

---

## 📋 Skills API

### List All Skills

```typescript
const response = await getSkillList();
if (response.ok) {
    const skills = response.data; // Skill[]
}
```

### Get Single Skill

```typescript
const response = await getSkillDetail(skillId);
if (response.ok) {
    const skill = response.data; // Skill
}
```

### Create Skill

```typescript
const newSkill: SkillFormData = {
    name: "React",
    category: "framework",
    proficiency: "advanced",
    description: "Building modern web applications",
    years_of_experience: 4,
    icon_url:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    is_featured: true,
    is_published: true,
    order: 0,
};

const response = await createSkill(newSkill);
if (response.ok) {
    console.log("Skill created:", response.data);
}
```

### Update Skill

```typescript
const updates: SkillFormData = {
    proficiency: "expert",
    years_of_experience: 5,
};

const response = await updateSkill(skillId, updates);
```

### Delete Skill

```typescript
const response = await deleteSkill(skillId);
if (response.ok) {
    console.log("Skill deleted");
}
```

### Toggle Featured

```typescript
await toggleSkillFeatured(skillId, true); // Feature
await toggleSkillFeatured(skillId, false); // Unfeature
```

### Toggle Published

```typescript
await toggleSkillPublished(skillId, true); // Publish
await toggleSkillPublished(skillId, false); // Unpublish
```

### Bulk Update Order

```typescript
const skillsWithNewOrder = [
    { id: 1, order: 0 },
    { id: 2, order: 1 },
    { id: 3, order: 2 },
];

const success = await updateSkillsOrder(skillsWithNewOrder);
```

---

## 💼 Experiences API

### List All Experiences

```typescript
import { getExperienceList } from "@/lib/actions";

const response = await getExperienceList();
if (response.ok) {
    const experiences = response.data; // Experience[]
}
```

### Create Experience

```typescript
import { createExperience } from "@/lib/actions";

const newExperience: ExperienceFormData = {
    company: "Tech Corp",
    position: "Senior Software Engineer",
    description: "Led development of microservices architecture",
    type: "Full Time",
    location: "San Francisco, CA",
    start_date: "2022-01-15",
    is_current: true,
    is_published: true,
    order: 0,
};

const response = await createExperience(newExperience);
```

### Update Experience

```typescript
import { updateExperience } from "@/lib/actions";

const updates: ExperienceFormData = {
    is_current: false,
    end_date: "2024-01-31",
};

const response = await updateExperience(experienceId, updates);
```

---

## 🎨 UI Helpers

### Skill Category Labels

```typescript
import { SKILL_CATEGORIES } from "@/lib/schemas";

// Display category dropdown
Object.entries(SKILL_CATEGORIES).map(([value, label]) => (
    <option key={value} value={value}>{label}</option>
));

// Get label for a category
const label = SKILL_CATEGORIES["programming"]; // "Programming"
```

### Proficiency Labels

```typescript
import { SKILL_PROFICIENCY } from "@/lib/schemas";

// Display proficiency dropdown
Object.entries(SKILL_PROFICIENCY).map(([value, label]) => (
    <option key={value} value={value}>{label}</option>
));

// Get label for proficiency
const label = SKILL_PROFICIENCY["expert"]; // "Expert"
```

### Proficiency Colors

```typescript
import { PROFICIENCY_COLORS } from "@/lib/schemas";

// Apply color to badge
<span className={`${PROFICIENCY_COLORS[skill.proficiency]} text-white px-2 py-1 rounded`}>
    {skill.proficiency_display}
</span>
```

---

## 🔍 Filtering & Grouping

### Group Skills by Category

```typescript
const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
        acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
}, {} as Record<string, Skill[]>);

// Render grouped skills
Object.entries(groupedSkills).map(([category, categorySkills]) => (
    <div key={category}>
        <h3>{SKILL_CATEGORIES[category]}</h3>
        {categorySkills.map(skill => <SkillCard key={skill.id} skill={skill} />)}
    </div>
));
```

### Filter Featured Skills

```typescript
const featuredSkills = skills.filter((skill) => skill.is_featured);
```

### Filter by Proficiency

```typescript
const expertSkills = skills.filter((skill) => skill.proficiency === "expert");
```

### Sort by Order

```typescript
const sortedSkills = [...skills].sort((a, b) => a.order - b.order);
```

---

## 📝 Form Validation

### Using React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillFormSchema } from "@/lib/schemas";

const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
} = useForm<SkillFormData>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
        is_published: true,
        is_featured: false,
        order: 0,
    },
});

const onSubmit = async (data: SkillFormData) => {
    const response = await createSkill(data);
    if (response.ok) {
        // Success!
    }
};
```

---

## 🌐 Public API (Client-Side)

### Fetch Public Skills

```typescript
// For public portfolio pages
const response = await fetch("/api/public/skills/");
const skills = await response.json();
```

### Fetch with Domain

```typescript
// When accessing via subdomain
const response = await fetch(
    "https://johndoe.limefolio.com/api/public/skills/",
);
const skills = await response.json();
```

---

## 🔑 External API (with API Key)

### Using API Key

```typescript
const response = await fetch("https://api.limefolio.com/v1/skills/", {
    headers: {
        "X-API-Key": "your_api_key",
        "X-API-Secret": "your_api_secret",
    },
});
const skills = await response.json();
```

---

## 💡 Common Patterns

### Loading State

```typescript
"use client";

import { useEffect, useState } from "react";
import { getSkillList } from "@/lib/actions";
import type { Skill } from "@/types";

export function SkillsList() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSkills() {
            const response = await getSkillList();
            if (response.ok) {
                setSkills(response.data || []);
            }
            setLoading(false);
        }
        loadSkills();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {skills.map(skill => (
                <div key={skill.id}>{skill.name}</div>
            ))}
        </div>
    );
}
```

### Optimistic Updates

```typescript
const handleToggleFeatured = async (skill: Skill) => {
    // Optimistically update UI
    setSkills((prev) =>
        prev.map((s) =>
            s.id === skill.id ? { ...s, is_featured: !s.is_featured } : s,
        ),
    );

    // Make API call
    const response = await toggleSkillFeatured(skill.id, !skill.is_featured);

    // Revert on error
    if (!response.ok) {
        setSkills((prev) =>
            prev.map((s) =>
                s.id === skill.id
                    ? { ...s, is_featured: skill.is_featured }
                    : s,
            ),
        );
    }
};
```

### Server Component (Recommended)

```typescript
// app/dashboard/skills/page.tsx
import { getSkillList } from "@/lib/actions";

export default async function SkillsPage() {
    const response = await getSkillList();
    const skills = response.data || [];

    return (
        <div>
            {skills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
            ))}
        </div>
    );
}
```

---

## 🎯 TypeScript Tips

### Type Guards

```typescript
function isSkill(obj: any): obj is Skill {
    return obj && typeof obj.id === "number" && typeof obj.name === "string";
}
```

### Partial Updates

```typescript
// Only update specific fields
const updates: Partial<SkillFormData> = {
    proficiency: "expert",
};
```

### Type-Safe Category/Proficiency

```typescript
type SkillCategory = Skill["category"];
type SkillProficiency = Skill["proficiency"];

const category: SkillCategory = "programming"; // ✅
const category: SkillCategory = "invalid"; // ❌ TypeScript error
```

---

## 🚨 Error Handling

### Check Response Status

```typescript
const response = await createSkill(data);

if (response.ok) {
    console.log("Success:", response.data);
} else {
    console.error("Error:", response.status);
    // Handle error (show toast, alert, etc.)
}
```

### Try-Catch Pattern

```typescript
try {
    const response = await createSkill(data);
    if (!response.ok) {
        throw new Error("Failed to create skill");
    }
    // Success
} catch (error) {
    console.error(error);
    // Show error message to user
}
```

---

## 📦 Complete Example

```typescript
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    getSkillList,
    createSkill,
    deleteSkill,
    toggleSkillFeatured
} from "@/lib/actions";
import { skillFormSchema, SKILL_CATEGORIES, SKILL_PROFICIENCY } from "@/lib/schemas";
import type { Skill, SkillFormData } from "@/types";

export function SkillsManager() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<SkillFormData>({
        resolver: zodResolver(skillFormSchema),
    });

    useEffect(() => {
        loadSkills();
    }, []);

    async function loadSkills() {
        setLoading(true);
        const response = await getSkillList();
        if (response.ok) {
            setSkills(response.data || []);
        }
        setLoading(false);
    }

    async function onSubmit(data: SkillFormData) {
        const response = await createSkill(data);
        if (response.ok) {
            await loadSkills();
            reset();
        }
    }

    async function handleDelete(id: number) {
        if (confirm("Delete this skill?")) {
            await deleteSkill(id);
            await loadSkills();
        }
    }

    async function handleToggleFeatured(id: number, isFeatured: boolean) {
        await toggleSkillFeatured(id, !isFeatured);
        await loadSkills();
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("name")} placeholder="Skill name" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <select {...register("category")}>
                    {Object.entries(SKILL_CATEGORIES).map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>

                <button type="submit">Add Skill</button>
            </form>

            {/* List */}
            <div className="grid gap-4">
                {skills.map(skill => (
                    <div key={skill.id} className="border p-4 rounded">
                        <h3>{skill.name}</h3>
                        <p>{skill.category_display} - {skill.proficiency_display}</p>
                        <button onClick={() => handleToggleFeatured(skill.id, skill.is_featured)}>
                            {skill.is_featured ? "Unfeature" : "Feature"}
                        </button>
                        <button onClick={() => handleDelete(skill.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

---

## ✅ Checklist

- [x] TypeScript types defined
- [x] Server actions created
- [x] Validation schemas ready
- [x] API client functions available
- [x] Helper constants exported
- [ ] Create dashboard pages
- [ ] Build UI components
- [ ] Add public portfolio sections
- [ ] Implement drag-and-drop
- [ ] Add search/filter functionality

---

## 🔗 Resources

- [Backend API Documentation](/server/EXPERIENCE_SKILLS_API.md)
- [Frontend Integration Guide](/client/FRONTEND_INTEGRATION_GUIDE.md)
- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [DevIcons](https://devicon.dev/)
