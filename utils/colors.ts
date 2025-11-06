/**
 * HSL-Based Dark Theme Color System (Minimalistic & Cool)
 * 
 * Design Principles:
 * - Neutral Colors: H≈0, S≈0 (pure grays/blacks)
 * - Base: L≈0% for absolute base background
 * - Cards: L≈5% for main card surface
 * - Raised Elements: L≈10% (closer to user)
 * - Text: L≈90%+ (lighter, comes over the top)
 * - Borders: Simple gradients (5% to 10%, or 0% to 5%)
 * - Shadows: Darker, shorter (minimalistic depth)
 * - Interactive: Light-from-above effect (shining/glowing)
 * 
 * HSL Color Format: hsl(Hue, Saturation%, Lightness%)
 * 
 * Lightness Hierarchy (Lower = Deeper/Background, Higher = Closer/Top):
 * - L=0%: Base background (deepest layer - absolute base)
 * - L=5%: Card backgrounds (main surface)
 * - L=10%: Raised/important elements (closer to user)
 * - L=15%: Borders and dividers
 * - L=20%: Nested elements
 * - L=50%: Muted text and inactive elements
 * - L=70%: Secondary text
 * - L=90%: Primary text (foreground, comes over top)
 * - L=95%: Emphasized text (closest to user)
 */

// Helper function to convert HSL to hex for Tamagui
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Neutral Colors (H=0, S=0, varying Lightness)
export const darkThemeColors = {
  // Base Backgrounds (Neutral grays - H=0, S=0)
  background: {
    base: hslToHex(0, 0, 0),      // hsl(0, 0%, 0%) - Absolute base (pure black)
    card: hslToHex(0, 0, 5),      // hsl(0, 0%, 5%) - Main card surface
    raised: hslToHex(0, 0, 10),   // hsl(0, 0%, 10%) - Raised/important elements (closer to user)
    hover: hslToHex(0, 0, 12),    // hsl(0, 0%, 12%) - Hover state (lighter, raised)
    pressed: hslToHex(0, 0, 8),   // hsl(0, 0%, 8%) - Pressed state (darker, pushed down)
    nested: hslToHex(0, 0, 20),   // hsl(0, 0%, 20%) - Nested elements
  },

  // Borders and Dividers (Gradient borders - 5% to 10%, or 0% to 5%)
  border: {
    subtle: hslToHex(0, 0, 15),   // hsl(0, 0%, 15%) - Subtle borders
    medium: hslToHex(0, 0, 20),   // hsl(0, 0%, 20%) - Medium borders
    strong: hslToHex(0, 0, 25),   // hsl(0, 0%, 25%) - Strong borders
    // Gradient borders (light from above effect)
    // Top border: lighter (closer to 10% or 5%)
    top: hslToHex(0, 0, 10),      // hsl(0, 0%, 10%) - Top border (lighter, from 5% card)
    bottom: hslToHex(0, 0, 5),    // hsl(0, 0%, 5%) - Bottom border (darker, from 0% base)
    left: hslToHex(0, 0, 8),      // hsl(0, 0%, 8%) - Left border (medium)
    right: hslToHex(0, 0, 7),     // hsl(0, 0%, 7%) - Right border (medium-dark)
    // Alternative gradient for raised cards (10% to 15%)
    raisedTop: hslToHex(0, 0, 15), // hsl(0, 0%, 15%) - Top border for raised cards
    raisedBottom: hslToHex(0, 0, 10), // hsl(0, 0%, 10%) - Bottom border for raised cards
  },

  // Text Colors (Lighter shades - L≈90%+, comes over the top)
  text: {
    primary: hslToHex(0, 0, 90),   // hsl(0, 0%, 90%) - Primary text (foreground)
    secondary: hslToHex(0, 0, 70), // hsl(0, 0%, 70%) - Secondary text
    muted: hslToHex(0, 0, 50),     // hsl(0, 0%, 50%) - Muted text
    disabled: hslToHex(0, 0, 35),  // hsl(0, 0%, 35%) - Disabled text
    emphasized: hslToHex(0, 0, 95), // hsl(0, 0%, 95%) - Emphasized text (closest to user)
  },

  // Shadows (Darker tones with shorter lengths - minimalistic depth)
  shadow: {
    color: hslToHex(0, 0, 0),     // hsl(0, 0%, 0%) - Pure black shadow
    opacity: {
      subtle: 0.3,                // Subtle shadow
      medium: 0.5,                 // Medium shadow
      strong: 0.7,                 // Strong shadow
    },
    // Short shadow offsets (closer to element, minimalistic)
    offset: {
      subtle: { width: 0, height: 2 },   // Very short, subtle
      medium: { width: 0, height: 3 },   // Short, medium
      strong: { width: 0, height: 4 },   // Short, strong
    },
    radius: {
      subtle: 3,                  // Small blur radius
      medium: 5,                   // Medium blur radius
      strong: 8,                   // Larger blur radius
    },
  },
  
  // Interactive states (Light-from-above effect - shining/glowing)
  interactive: {
    // Pressed state (darker, pushed down)
    pressed: hslToHex(0, 0, 8),   // hsl(0, 0%, 8%) - Darker when pressed
    // Hover/Active state (lighter, raised up - light from above)
    hover: hslToHex(0, 0, 12),    // hsl(0, 0%, 12%) - Lighter when hovered (shining)
    active: hslToHex(0, 0, 14),   // hsl(0, 0%, 14%) - Even lighter when active (glowing)
    // Light-from-above border colors (for pressed state)
    pressedTop: hslToHex(0, 0, 12), // hsl(0, 0%, 12%) - Top border when pressed (lighter, shining)
    pressedBottom: hslToHex(0, 0, 6), // hsl(0, 0%, 6%) - Bottom border when pressed (darker)
  },
};

/**
 * Usage Examples:
 * 
 * 1. Base Background:
 *    bg={darkThemeColors.background.base}  // L=0% (absolute base)
 * 
 * 2. Card Surface:
 *    bg={darkThemeColors.background.card}  // L=5% (main card)
 *    borderTopColor={darkThemeColors.border.top}  // L=10% (lighter, gradient)
 *    borderBottomColor={darkThemeColors.border.bottom}  // L=5% (darker, gradient)
 * 
 * 3. Raised Card (Important):
 *    bg={darkThemeColors.background.raised}  // L=10% (closer to user)
 * 
 * 4. Primary Text (Foreground):
 *    color={darkThemeColors.text.primary}  // L=90% (comes over top)
 * 
 * 5. Emphasized Text:
 *    color={darkThemeColors.text.emphasized}  // L=95% (closest to user)
 * 
 * 6. Pressed State (Light-from-above):
 *    bg={darkThemeColors.interactive.pressed}  // L=8% (darker)
 *    borderTopColor={darkThemeColors.interactive.pressedTop}  // L=12% (lighter, shining)
 *    borderBottomColor={darkThemeColors.interactive.pressedBottom}  // L=6% (darker)
 * 
 * 7. Shadow (Minimalistic):
 *    shadowColor={darkThemeColors.shadow.color}
 *    shadowOffset={darkThemeColors.shadow.offset.subtle}  // Short, subtle
 *    shadowOpacity={darkThemeColors.shadow.opacity.subtle}
 *    shadowRadius={darkThemeColors.shadow.radius.subtle}
 */
