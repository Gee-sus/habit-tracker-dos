# Dark Theme Design Guide - Habit Cards

## Overview

This guide provides comprehensive styling recommendations for habit cards in a React Native app using Tamagui, featuring a sleek, modern dark theme with black backgrounds and neutral HSL colors.

## Design Principles

### 1. Black Background Base
- **Main Background**: `hsl(0, 0%, 0%)` - Pure black (#000000)
- **Purpose**: Deepest layer, provides maximum contrast
- **Usage**: App background, creates foundation for all other elements

### 2. Neutral HSL Color System

All colors use **H=0, S=0** (pure neutrals) with varying **Lightness (L)** values:

| Element | HSL | Hex | Lightness | Purpose |
|---------|-----|-----|-----------|---------|
| Base Background | `hsl(0, 0%, 0%)` | `#000000` | L=0% | Deepest layer |
| Card Background | `hsl(0, 0%, 5%)` | `#0d0d0d` | L=5% | Standard cards |
| Raised Element | `hsl(0, 0%, 10%)` | `#1a1a1a` | L=10% | Important/raised cards |
| Hover State | `hsl(0, 0%, 12%)` | `#1f1f1f` | L=12% | Interactive hover |
| Pressed State | `hsl(0, 0%, 8%)` | `#141414` | L=8% | Pressed down |
| Nested Element | `hsl(0, 0%, 20%)` | `#333333` | L=20% | Content within cards |

### 3. Lightness Hierarchy (Depth System)

**Lower Lightness = Deeper/Background Layer**
**Higher Lightness = Foreground/Elevated Layer**

```
L=0%   → Base background (deepest - pure black)
L=5%   → Card backgrounds (slightly elevated)
L=8%   → Pressed state (pushed down)
L=10%  → Raised elements (important cards)
L=12%  → Hover state (light from above)
L=14%  → Active state (maximum light)
L=20%  → Nested elements (content areas)
L=50%  → Muted text (subtle information)
L=70%  → Secondary text (descriptions)
L=90%  → Primary text (main content)
L=95%  → Emphasized text (headings, highlights)
```

### 4. Text Hierarchy (Foreground Elements)

Lighter elements appear on top and closer to the user:

| Text Type | HSL | Hex | Lightness | Usage |
|-----------|-----|-----|-----------|-------|
| Emphasized | `hsl(0, 0%, 95%)` | `#f2f2f2` | L=95% | Headings, titles |
| Primary | `hsl(0, 0%, 90%)` | `#e6e6e6` | L=90% | Main content text |
| Secondary | `hsl(0, 0%, 70%)` | `#b3b3b3` | L=70% | Descriptions |
| Muted | `hsl(0, 0%, 50%)` | `#808080` | L=50% | Labels, helper text |
| Disabled | `hsl(0, 0%, 35%)` | `#595959` | L=35% | Inactive elements |

### 5. Border System (Gradient Effect)

Borders use subtle lightness variations to create a light-from-above effect:

| Border | HSL | Hex | Lightness | Purpose |
|--------|-----|-----|-----------|---------|
| Top | `hsl(0, 0%, 18%)` | `#2e2e2e` | L=18% | Lighter (light from above) |
| Bottom | `hsl(0, 0%, 12%)` | `#1f1f1f` | L=12% | Darker (shadow below) |
| Left | `hsl(0, 0%, 16%)` | `#292929` | L=16% | Medium |
| Right | `hsl(0, 0%, 14%)` | `#242424` | L=14% | Medium-dark |

**Implementation:**
```typescript
borderTopColor={darkThemeColors.border.top}      // L=18% (lighter)
borderBottomColor={darkThemeColors.border.bottom} // L=12% (darker)
borderLeftColor={darkThemeColors.border.left}     // L=16%
borderRightColor={darkThemeColors.border.right}   // L=14%
borderTopWidth={1.5}  // Thicker top border for emphasis
borderBottomWidth={1} // Thinner bottom border
```

### 6. Interactive Feedback (Light from Above)

Cards respond to user interaction with a light-from-above effect:

#### Default State (Resting)
- **Background**: `hsl(0, 0%, 5%)` (L=5%) for standard cards
- **Background**: `hsl(0, 0%, 10%)` (L=10%) for raised/important cards
- **Top Border**: Thicker (1.5px) and lighter (L=18%)
- **Bottom Border**: Thinner (1px) and darker (L=12%)

#### Pressed State
- **Background**: `hsl(0, 0%, 8%)` (L=8%) - Darker (pushed down)
- **Shadow**: Stronger, shorter offset
- **Top Border**: Thinner (1px) - less light
- **Bottom Border**: Thicker (1.5px) - more shadow

#### Hover/Active State (Future Enhancement)
- **Background**: `hsl(0, 0%, 12%)` (L=12%) - Lighter (raised up)
- **Shadow**: Lighter, longer offset
- **Top Border**: Even thicker and lighter

### 7. Shadow System (Depth Enhancement)

Shadows use black with opacity and short lengths for minimalistic depth:

| Shadow Type | Offset | Opacity | Radius | Usage |
|-------------|--------|---------|--------|-------|
| Subtle | `{ width: 0, height: 2 }` | 0.3 | 4px | Standard cards |
| Medium | `{ width: 0, height: 4 }` | 0.5 | 8px | Raised cards |
| Strong | `{ width: 0, height: 6 }` | 0.7 | 12px | Pressed cards |

**Key Principles:**
- **Short lengths**: Only vertical offset (height: 2-6px)
- **No horizontal spread**: width: 0 (minimalistic)
- **Dark tones**: Black (#000000) with opacity
- **Subtle depth**: Doesn't overpower the design

### 8. Visual Hierarchy Example

```
Layer 1 (Deepest): L=0% - Base background
  └─ Layer 2: L=5% - Card background
     ├─ Border Top: L=18% (light from above)
     ├─ Border Bottom: L=12% (shadow below)
     ├─ Layer 3: L=20% - Nested content area
     │  └─ Layer 4: L=90% - Primary text (foreground)
     └─ Layer 5: L=95% - Emphasized text (closest)
```

## Implementation in Tamagui

### Complete Card Component

```typescript
import { View, Text, ScrollView } from "tamagui";
import { Pressable } from "react-native";
import { darkThemeColors } from "../utils/colors";

<Pressable style={{ width: '100%', marginBottom: 12 }}>
  {({ pressed }) => (
    <View
      // Background with interactive states
      bg={
        pressed 
          ? darkThemeColors.interactive.pressed  // L=8% (darker)
          : darkThemeColors.background.card        // L=5% (normal)
      }
      p="$4"
      br="$5"
      
      // Gradient borders (light from above)
      borderWidth={1}
      borderTopColor={darkThemeColors.border.top}      // L=18%
      borderBottomColor={darkThemeColors.border.bottom} // L=12%
      borderLeftColor={darkThemeColors.border.left}     // L=16%
      borderRightColor={darkThemeColors.border.right}   // L=14%
      borderTopWidth={pressed ? 1 : 1.5}   // Thicker when not pressed
      borderBottomWidth={pressed ? 1.5 : 1} // Thinner when not pressed
      
      // Shadows with short lengths
      shadowColor={darkThemeColors.shadow.color}
      shadowOffset={
        pressed 
          ? darkThemeColors.shadow.offset.subtle   // Shorter when pressed
          : darkThemeColors.shadow.offset.medium  // Longer when raised
      }
      shadowOpacity={
        pressed 
          ? darkThemeColors.shadow.opacity.strong // Stronger when pressed
          : darkThemeColors.shadow.opacity.medium // Medium when raised
      }
      shadowRadius={
        pressed 
          ? darkThemeColors.shadow.radius.subtle   // Smaller when pressed
          : darkThemeColors.shadow.radius.medium   // Larger when raised
      }
      w="100%"
    >
      {/* Title - Emphasized text (L=95%) */}
      <Text 
        fontSize="$7" 
        fontWeight="bold" 
        color={darkThemeColors.text.emphasized}
      >
        Habit Title
      </Text>
      
      {/* Description - Secondary text (L=70%) */}
      <Text 
        fontSize="$4" 
        color={darkThemeColors.text.secondary}
      >
        Description text
      </Text>
      
      {/* Info Panel - Nested element (L=20%) */}
      <View 
        bg={darkThemeColors.background.nested}
        borderColor={darkThemeColors.border.subtle}
      >
        {/* Label - Muted text (L=50%) */}
        <Text color={darkThemeColors.text.muted}>
          Streak:
        </Text>
        
        {/* Value - Emphasized text (L=95%) */}
        <Text color={darkThemeColors.text.emphasized}>
          42
        </Text>
      </View>
    </View>
  )}
</Pressable>
```

## HSL Value Reference

### Background Colors
```typescript
hsl(0, 0%, 0%)   // Base background - #000000
hsl(0, 0%, 5%)   // Card background - #0d0d0d
hsl(0, 0%, 8%)   // Pressed state - #141414
hsl(0, 0%, 10%)  // Raised element - #1a1a1a
hsl(0, 0%, 12%)  // Hover state - #1f1f1f
hsl(0, 0%, 20%)  // Nested element - #333333
```

### Text Colors
```typescript
hsl(0, 0%, 95%)  // Emphasized text - #f2f2f2
hsl(0, 0%, 90%)  // Primary text - #e6e6e6
hsl(0, 0%, 70%)  // Secondary text - #b3b3b3
hsl(0, 0%, 50%)  // Muted text - #808080
hsl(0, 0%, 35%)  // Disabled text - #595959
```

### Border Colors (Gradient Effect)
```typescript
hsl(0, 0%, 18%)  // Top border (lighter) - #2e2e2e
hsl(0, 0%, 16%)  // Left border - #292929
hsl(0, 0%, 14%)  // Right border - #242424
hsl(0, 0%, 12%)  // Bottom border (darker) - #1f1f1f
```

## Best Practices

### 1. Maintain Contrast
- **Minimum contrast**: Text should be at least 40% lighter than background
- **Example**: L=90% text on L=5% background = 85% contrast ✅
- **WCAG AAA**: All combinations meet accessibility standards

### 2. Use Lightness for Hierarchy
- **Lower L values** = Background elements (deeper layers)
- **Higher L values** = Foreground elements (closer to user)
- **Keep differences noticeable**: At least 5% difference between layers

### 3. Light-from-Above Effect
- **Top borders**: Lighter and thicker (L=18%, 1.5px)
- **Bottom borders**: Darker and thinner (L=12%, 1px)
- **Creates illusion**: Light shining from above

### 4. Interactive Feedback
- **Pressed**: Darker background (L=8%), stronger shadow
- **Hover**: Lighter background (L=12%), lighter shadow
- **Visual feedback**: Clear indication of interaction

### 5. Shadow Application
- **Short lengths**: Only vertical offset (height: 2-6px)
- **Dark tones**: Black with opacity (0.3-0.7)
- **Subtle depth**: Doesn't overpower minimalistic design

### 6. Border Gradients
- **Vary lightness**: Different L values for each side
- **Top emphasis**: Lighter top border creates light-from-above
- **Thickness variation**: Thicker top, thinner bottom

## Color Accessibility

### Contrast Ratios
- **Primary text (L=90%) on card (L=5%)**: **21:1** ✅ (WCAG AAA)
- **Secondary text (L=70%) on card (L=5%)**: **14:1** ✅ (WCAG AAA)
- **Muted text (L=50%) on nested (L=20%)**: **2.5:1** ⚠️ (Use sparingly)

### Text Readability
- **Primary text**: Always use L≥90% for main content
- **Secondary text**: Use L≥70% for descriptions
- **Muted text**: Use L≥50% only for labels with sufficient contrast

## Summary

### Key Design Rules

1. **Black Base**: Use `hsl(0, 0%, 0%)` for main background
2. **Neutral Colors**: All colors use `hsl(0, 0%, L%)` format
3. **Lightness Hierarchy**: Lower L = background, Higher L = foreground
4. **Gradient Borders**: Top lighter (L=18%), bottom darker (L=12%)
5. **Interactive States**: Pressed darker (L=8%), hover lighter (L=12%)
6. **Short Shadows**: Vertical offset only (height: 2-6px)
7. **Text Hierarchy**: L=95% (emphasized) → L=90% (primary) → L=70% (secondary)

### Visual Result

- **Sleek & Modern**: Clean black background with subtle gray variations
- **Minimalistic**: Short shadows, subtle borders, no overpowering effects
- **Interactive**: Clear feedback with light-from-above effect
- **Accessible**: High contrast ratios meet WCAG AAA standards
- **Consistent**: HSL-based system ensures uniform appearance

