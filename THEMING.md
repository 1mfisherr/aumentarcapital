# Theming Guide - Aumentar Capital

## Quick Start: Changing Colors

All theme colors are defined in **one place**. Edit `app/globals.css` and the entire site updates.

### Step 1: Open the theme file

Open: **`app/globals.css`**

### Step 2: Find the theme block

At the top you’ll see an **`@theme { ... }`** block (Tailwind v4) and a **`:root { ... }`** block. Both define the same variables so CSS and Tailwind stay in sync.

### Step 3: Change the values

Update the hex codes in **both** `@theme` and `:root`:

```css
@theme {
  --color-brand-primary: #0A261F;   /* Deep Forest Green */
  --color-brand-secondary: #1A3D33;
  --color-brand-accent: #B8975E;    /* Muted Gold */
  /* ... */
}

:root {
  --color-brand-primary: #0A261F;
  --color-brand-secondary: #1A3D33;
  --color-brand-accent: #B8975E;
  /* ... */
}
```

### Step 4: Save and refresh

Save the file and refresh the browser. Buttons, links, cards, and text that use these tokens will update automatically.

---

## Current theme: High-Trust Executive Forest

The site uses a **forest green + sage + parchment + gold** palette for a fintech-style, high-trust look.

### Brand colors

| Variable | Hex | Usage |
|----------|-----|--------|
| `--color-brand-primary` | `#0A261F` | Primary buttons, links, badges |
| `--color-brand-secondary` | `#1A3D33` | Hover states, gradients |
| `--color-brand-accent` | `#B8975E` | Dividers, trust icons |

### Text colors

| Variable | Hex | Usage |
|----------|-----|--------|
| `--color-text-primary` | `#051B11` | Headings, main text |
| `--color-text-secondary` | `#0A261F` | Body, subheadings |
| `--color-text-muted` | `#3D5A50` | Metadata, captions |

### Background colors

| Variable | Hex | Usage |
|----------|-----|--------|
| `--color-bg-primary` | `#FFFFFF` | Cards, modals |
| `--color-bg-secondary` | `#FDFCF8` | Page background (warm parchment) |
| `--color-bg-hero` | `#F0F4F2` | Hero / section backgrounds |
| `--color-bg-brand-light` | `#E8EBE5` | Light sage tint |

### UI colors

| Variable | Hex | Usage |
|----------|-----|--------|
| `--color-border` | `#D8DCD3` | Borders, dividers |
| `--color-success` | `#10B981` | Success messages |
| `--color-error` | `#EF4444` | Errors |
| `--color-warning` | `#F59E0B` | Warnings |

### Semantic aliases (for Recursos, Artigos, calculators)

The same palette is exposed as **`primary`** and **`neutral`** so existing `bg-primary`, `text-neutral-600`, etc. stay on-brand:

- **`primary`** = brand primary (forest green)
- **`primary-50` … `primary-800`** = tints/shades of brand
- **`neutral-50` … `neutral-900`** = sage/green tints (replacing gray)

So pages like Recursos and Artigos that use `text-neutral-900`, `bg-primary`, etc. automatically use the Executive Forest palette without extra changes.

---

## Using colors in components

### Tailwind classes (preferred)

Use theme-based utilities so one file controls all colors:

```tsx
// Brand
<button className="bg-brand-primary text-white">Guardar</button>
<h1 className="text-text-primary">Título</h1>
<p className="text-brand-primary">Corpo</p>

// Semantic (same palette)
<div className="bg-primary text-white">...</div>
<span className="text-neutral-600">...</span>

// Borders and backgrounds
<div className="border border-border bg-bg-secondary">...</div>
```

### Pre-made component classes

Defined in `globals.css`:

```tsx
<button className="btn-primary">Guardar</button>
<button className="btn-secondary">Cancelar</button>
<div className="card">Conteúdo</div>
<div className="bento-card">Bento</div>
<div className="premium-shadow-card">Card com sombra</div>
<div className="logo-gradient">Fundo gradiente</div>
<h1 className="logo-gradient-text">Texto gradiente</h1>
```

### Do not use

- Raw hex in components (e.g. `#0A261F`) – use tokens instead.
- Tailwind’s default gray/blue if you want brand consistency – use `neutral-*` and `primary` from the theme.

---

## Shadows

Shadows use a **tinted green** so they match the palette:

- `--shadow-premium` – cards at rest  
- `--shadow-premium-hover` – cards on hover  
- `--shadow-soft`, `--shadow-medium`, `--shadow-strong` – other levels  

All are defined in `@theme` and `:root` in `app/globals.css`.

---

## Single source of truth

1. **Edit only** `app/globals.css`: change `@theme` and `:root` together.
2. **Use tokens in components**: `text-text-primary`, `bg-brand-primary`, `border-border`, `primary`, `neutral-*`, etc.
3. **Avoid hardcoded hex** in TSX/CSS so the theme stays the single source of truth.

---

## Troubleshooting

### Colors don’t update

1. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac).
2. Restart dev server: `npm run dev`.
3. Confirm you changed both `@theme` and `:root` in `app/globals.css`.

### Some elements ignore the theme

Search the repo for the old hex or class (e.g. `#0A261F`, `cyan-500`) and replace with the right token (`brand-primary`, `primary`, etc.).

### Contrast / accessibility

- Prefer `text-text-primary` or `text-brand-primary` on light backgrounds.
- Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) for new colors.

---

**Happy theming.**
