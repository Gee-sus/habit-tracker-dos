# HSL-Based Dark Theme Design Guide

## Overview

This guide explains the HSL color system used in the habit tracking app, designed for a minimalistic dark theme with yellow accents.

## HSL Color Model

HSL stands for **Hue, Saturation, Lightness**:
- **Hue (H)**: 0-360° - The color itself (0°=red, 120°=green, 240°=blue, 45°=yellow)
- **Saturation (S)**: 0-100% - Color intensity (0%=gray, 100%=full color)
- **Lightness (L)**: 0-100% - Brightness (0%=black, 50%=pure color, 100%=white)

## Design Principles

### 1. Lightness Hierarchy (Depth System)

**Lower Lightness = Deeper/Background Layer**
**Higher Lightness = Foreground/Elevated Layer**

```
L=0%   → Base background (deepest layer - pure black)
L=5%   → Card backgrounds (slightly elevated from base)
L=10%  → Raised elements (important cards, hover states)
L=15%  → Borders and dividers (subtle separation)
L=20%  → Nested elements (content within cards)
L=50%  → Muted text and inactive elements
L=70%  → Secondary text (less important info)
L=90%  → Primary text (main content, foreground)
L=95%  → Emphasized text (headings, highlights)
```

### 2. Neutral Colors (H=0, S=0)

**Pure neutrals** use `hsl(0, 0%, L%)` where only lightness varies:
- No hue = no color tint
- No saturation = pure gray
- Lightness controls brightness

**Usage:**
- Backgrounds: L=0% to L=20%
- Text: L=50% to L=95%
- Borders: L=15% to L=25%

### 3. Yellow Accents (H=45°, S=100%)

**Yellow accents** use `hsl(45, 100%, L%)` for highlights:
- Hue=45° = warm yellow
- Saturation=100% = vibrant, full color
- Lightness varies for different uses

**Yellow Variants:**
- `hsl(45, 100%, 50%)` - Bright yellow (primary accents, important text)
- `hsl(45, 100%, 45%)` - Medium yellow (secondary accents)
- `hsl(45, 80%, 40%)` - Dark yellow (borders, subtle backgrounds)
- `hsl(45, 50%, 35%)` - Muted yellow (background badges)
- `hsl(45, 100%, 60%)` - Glow yellow (special effects)

## Color Palette

### Background Colors

| Color | HSL | Hex | Usage |
|-------|-----|-----|-------|
| Base | `hsl(0, 0%, 0%)` | `#000000` | Main app background |
| Card | `hsl(0, 0%, 5%)` | `#0d0d0d` | Standard card background |
| Raised | `hsl(0, 0%, 10%)` | `#1a1a1a` | Important/raised cards |
| Nested | `hsl(0, 0%, 20%)` | `#333333` | Elements within cards |

### Text Colors

| Color | HSL | Hex | Usage |
|-------|-----|-----|-------|
| Primary | `hsl(0, 0%, 90%)` | `#e6e6e6` | Main content text |
| Secondary | `hsl(0, 0%, 70%)` | `#b3b3b3` | Descriptions, less important |
| Muted | `hsl(0, 0%, 50%)` | `#808080` | Labels, helper text |
| Disabled | `hsl(0, 0%, 35%)` | `#595959` | Inactive elements |
| Emphasized | `hsl(0, 0%, 95%)` | `#f2f2f2` | Headings, strong emphasis |

### Border Colors

| Color | HSL | Hex | Usage |
|-------|-----|-----|-------|
| Subtle | `hsl(0, 0%, 15%)` | `#262626` | Card borders, subtle dividers |
| Medium | `hsl(0, 0%, 20%)` | `#333333` | Standard borders |
| Strong | `hsl(0, 0%, 25%)` | `#404040` | Important borders |

### Yellow Accents

| Color | HSL | Hex | Usage |
|-------|-----|-----|-------|
| Bright | `hsl(45, 100%, 50%)` | `#ffcc00` | Primary accents, highlights |
| Medium | `hsl(45, 100%, 45%)` | `#e6b800` | Secondary accents |
| Dark | `hsl(45, 80%, 40%)` | `#b8940a` | Borders, subtle backgrounds |
| Muted | `hsl(45, 50%, 35%)` | `#5c4d1a` | Background badges |
| Glow | `hsl(45, 100%, 60%)` | `#ffd633` | Special effects, glows |

## Layering System

### Visual Depth Through Lightness

```
Layer 1 (Deepest): L=0%
  └─ Base background
     └─ Layer 2 (L=5%): Card background
        └─ Layer 3 (L=10%): Raised card (if important)
           └─ Layer 4 (L=20%): Nested content area
              └─ Layer 5 (L=90%): Primary text (foreground)
```

### Example: Habit Card Structure

```
Base Background (L=0%)
  └─ Card Container (L=5%)
     ├─ Border (L=15%)
     ├─ Title Text (L=90%)
     ├─ Description Text (L=70%)
     └─ Info Panel (L=20%)
        ├─ Label Text (L=50%)
        ├─ Value Text (L=70%)
        └─ Streak (Yellow accent L=50%)
```

## Implementation in Tamagui

### Using the Color System

```typescript
import { darkThemeColors } from '../utils/colors';

// Background
bg={darkThemeColors.background.base}

// Card
bg={darkThemeColors.background.card}
borderColor={darkThemeColors.border.subtle}

// Text
color={darkThemeColors.text.primary}

// Accent
color={darkThemeColors.accent.yellow.bright}
```

### Creating Depth

```typescript
// Standard card
<View bg={darkThemeColors.background.card} />

// Raised card (more important)
<View bg={darkThemeColors.background.raised} />

// Nested element
<View bg={darkThemeColors.background.nested} />
```

## Best Practices

### 1. Maintain Contrast

- **Minimum contrast**: Text should be at least 30% lighter than background
- **Example**: L=90% text on L=5% background = 85% contrast ✅

### 2. Use Lightness for Hierarchy

- **Lower L values** = Background elements
- **Higher L values** = Foreground elements
- **Keep differences noticeable**: At least 5% difference between layers

### 3. Yellow Accents for Emphasis

- Use bright yellow (`L=50%`) sparingly for important elements
- Use muted yellow (`L=35%`) for backgrounds
- Use dark yellow (`L=40%`) for borders

### 4. Avoid Too Many Layers

- **Maximum 5 layers** of depth
- Each layer should have clear purpose
- Use consistent spacing between layers

### 5. Text Readability

- **Primary text**: L=90% on L≤5% backgrounds
- **Secondary text**: L=70% on L≤10% backgrounds
- **Muted text**: L=50% on L≤20% backgrounds

## Converting HSL to Hex

### Manual Conversion

1. **Hue to RGB**: Convert hue angle to RGB values
2. **Apply Saturation**: Adjust color intensity
3. **Apply Lightness**: Adjust brightness
4. **Convert to Hex**: Convert RGB (0-255) to hex (#RRGGBB)

### Using the Helper Function

```typescript
const hslToHex = (h: number, s: number, l: number): string => {
  // Implementation in utils/colors.ts
  return hexColor;
};

// Usage
const color = hslToHex(45, 100, 50); // Returns "#ffcc00"
```

## Color Accessibility

### Contrast Ratios

- **WCAG AA**: 4.5:1 for normal text, 3:1 for large text
- **WCAG AAA**: 7:1 for normal text, 4.5:1 for large text

### Our System Compliance

- Primary text (L=90%) on base (L=0%): **21:1** ✅ (AAA)
- Secondary text (L=70%) on card (L=5%): **14:1** ✅ (AAA)
- Yellow accent (L=50%) on dark (L=5%): **10:1** ✅ (AAA)

## Examples

### Complete Card Example

```typescript
<View
  // Base card layer (L=5%)
  bg={darkThemeColors.background.card}
  borderColor={darkThemeColors.border.subtle} // L=15%
  borderWidth={1}
>
  {/* Title - Primary text (L=90%) */}
  <Text color={darkThemeColors.text.primary}>
    Habit Title
  </Text>
  
  {/* Description - Secondary text (L=70%) */}
  <Text color={darkThemeColors.text.secondary}>
    Description text
  </Text>
  
  {/* Info panel - Nested layer (L=20%) */}
  <View bg={darkThemeColors.background.nested}>
    {/* Label - Muted text (L=50%) */}
    <Text color={darkThemeColors.text.muted}>
      Streak:
    </Text>
    
    {/* Value - Yellow accent (L=50%) */}
    <Text color={darkThemeColors.accent.yellow.bright}>
      42
    </Text>
  </View>
</View>
```

## Summary

1. **HSL System**: Use HSL for easy lightness adjustments
2. **Lightness Hierarchy**: Lower = background, Higher = foreground
3. **Neutral Base**: H=0, S=0 for backgrounds, borders, text
4. **Yellow Accents**: H=45°, S=100% for highlights
5. **Depth**: Create depth through lightness variations (5% increments)
6. **Contrast**: Maintain high contrast for readability
7. **Consistency**: Use the same lightness values for similar elements

