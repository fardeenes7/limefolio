const fs = require('fs');

const file = 'src/lib/themes-meta.ts';
let content = fs.readFileSync(file, 'utf8');

const themeColors = {
    "default": '["#000000", "#2563eb", "#16a34a", "#dc2626"]',
    "dark": '["#ffffff", "#3b82f6", "#10b981", "#ef4444"]',
    "caffeine": '["#78350f", "#b45309", "#451a03", "#9a3412"]',
    "graphite": '["#111827", "#374151", "#4b5563", "#000000"]',
    "mocha-mousse": '["#451a03", "#78350f", "#b45309", "#92400e"]',
    "tangerine": '["#ea580c", "#f97316", "#c2410c", "#9a3412"]',
    "amethyst-haze": '["#7e22ce", "#9333ea", "#a855f7", "#6b21a8"]',
    "bubblegum": '["#db2777", "#ec4899", "#be185d", "#9d174d"]',
    "pastel-dreams": '["#f472b6", "#c084fc", "#818cf8", "#fbbf24"]',
    "soft-pop": '["#fbbf24", "#34d399", "#60a5fa", "#f472b6"]',
    "nature": '["#15803d", "#16a34a", "#10b981", "#047857"]',
    "solar-dusk": '["#eab308", "#f59e0b", "#d97706", "#b45309"]',
    "midnight-bloom": '["#4338ca", "#4f46e5", "#3730a3", "#312e81"]',
    "catppuccin": '["#cba6f7", "#f38ba8", "#a6e3a1", "#89b4fa"]',
    "claymorphism": '["#3b82f6", "#ef4444", "#10b981", "#f59e0b"]',
    "cosmic-night": '["#8b5cf6", "#a855f7", "#c084fc", "#3b82f6"]',
    "cyberpunk": '["#fdf001", "#ff003c", "#00ff00", "#00f0ff"]',
    "darkmatter": '["#f59e0b", "#fbbf24", "#d97706", "#ea580c"]',
    "doom-64": '["#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"]',
    "starry-night": '["#facc15", "#eab308", "#ca8a04", "#a16207"]',
    "vintage-paper": '["#78350f", "#92400e", "#b45309", "#d97706"]',
    "bold-tech": '["#8b5cf6", "#7c3aed", "#6d28d9", "#4f46e5"]',
    "claude": '["#d97706", "#b45309", "#92400e", "#78350f"]',
    "elegant-luxury": '["#b91c1c", "#991b1b", "#7f1d1d", "#b45309"]',
    "twitter": '["#1d9bf0", "#1da1f2", "#0c85d0", "#005fd1"]',
    "limefolio": '["#65a30d", "#84cc16", "#4d7c0f", "#3f6212"]',
};

for (const [slug, colors] of Object.entries(themeColors)) {
    const regex = new RegExp(`(slug:\\s*"${slug}",[\\s\\S]*?hasDark:\\s*(?:true|false),)`);
    if (content.match(regex)) {
        content = content.replace(regex, `$1\n        suggestedPrimaryColors: ${colors},`);
    } else {
        console.warn('Could not find ' + slug);
    }
}

fs.writeFileSync(file, content, 'utf8');
console.log('Done!');
