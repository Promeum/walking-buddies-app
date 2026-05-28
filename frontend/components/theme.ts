import chroma from 'chroma-js';
import { StyleSheet, useColorScheme } from 'react-native';

const colorScheme = useColorScheme();

const light = {
  background: '#FFF8F3',
  foreground: '#2C2E3A',
  card: '#FFFFFF',
  cardForeground: '#2C2E3A',
  popover: '#FFFFFF',
  popoverForeground: '#2C2E3A',
  primary: '#2C2E3A',
  primaryForeground: '#FFFFFF',
  secondary: '#8B92A8',
  secondaryForeground: '#2C2E3A',
  muted: '#F5EBE7',
  mutedForeground: '#6B7280',
  accent: '#FF9A76',
  accentForeground: '#2C2E3A',
  destructive: '#d4183d',
  destructiveForeground: '#FFFFFF',
  border: 'rgba(44, 46, 58, 0.08)',
  input: 'transparent',
  inputBackground: '#FFF4ED',
  switchBackground: '#8B92A8',
  ring: '#FF9A76',
  chart1: '#8B92A8',
  chart2: '#FF9A76',
  chart3: '#FFD4A3',
  chart4: '#A8C5A8',
  chart5: '#A8B0C0',
  sidebar: '#FFFFFF',
  sidebarForeground: '#2C2E3A',
  sidebarPrimary: '#2C2E3A',
  sidebarPrimaryForeground: '#FFFFFF',
  sidebarAccent: '#FFF8F3',
  sidebarAccentForeground: '#2C2E3A',
  sidebarBorder: 'rgba(44, 46, 58, 0.08)',
  sidebarRing: '#FF9A76',
};

const dark = {
  background: chroma.oklch(0.145, 0, 0).hex(),
  foreground: chroma.oklch(0.985, 0, 0).hex(),
  card: chroma.oklch(0.145, 0, 0).hex(),
  cardForeground: chroma.oklch(0.985, 0, 0).hex(),
  popover: chroma.oklch(0.145, 0, 0).hex(),
  popoverForeground: chroma.oklch(0.985, 0, 0).hex(),
  primary: chroma.oklch(0.985, 0, 0).hex(),
  primaryForeground: chroma.oklch(0.205, 0, 0).hex(),
  secondary: chroma.oklch(0.269, 0, 0).hex(),
  secondaryForeground: chroma.oklch(0.985, 0, 0).hex(),
  muted: chroma.oklch(0.269, 0, 0).hex(),
  mutedForeground: chroma.oklch(0.708, 0, 0).hex(),
  accent: chroma.oklch(0.269, 0, 0).hex(),
  accentForeground: chroma.oklch(0.985, 0, 0).hex(),
  destructive: chroma.oklch(0.396, 0.141, 25.723).hex(),
  destructiveForeground: chroma.oklch(0.637, 0.237, 25.331).hex(),
  border: chroma.oklch(0.269, 0, 0).hex(),
  input: chroma.oklch(0.269, 0, 0).hex(),
  inputBackground: chroma.oklch(0.269, 0, 0).hex(),
  switchBackground: chroma.oklch(0.269, 0, 0).hex(),
  ring: chroma.oklch(0.439, 0, 0).hex(),
  chart1: chroma.oklch(0.488, 0.243, 264.376).hex(),
  chart2: chroma.oklch(0.696, 0.17, 162.48).hex(),
  chart3: chroma.oklch(0.769, 0.188, 70.08).hex(),
  chart4: chroma.oklch(0.627, 0.265, 303.9).hex(),
  chart5: chroma.oklch(0.645, 0.246, 16.439).hex(),
  sidebar: chroma.oklch(0.205, 0, 0).hex(),
  sidebarForeground: chroma.oklch(0.985, 0, 0).hex(),
  sidebarPrimary: chroma.oklch(0.488, 0.243, 264.376).hex(),
  sidebarPrimaryForeground: chroma.oklch(0.985, 0, 0).hex(),
  sidebarAccent: chroma.oklch(0.269, 0, 0).hex(),
  sidebarAccentForeground: chroma.oklch(0.985, 0, 0).hex(),
  sidebarBorder: chroma.oklch(0.269, 0, 0).hex(),
  sidebarRing: chroma.oklch(0.439, 0, 0).hex(),
};

const inline = {
  fontSize: 16,
  textBase: 16,
  textLg: 18,
  textXl: 22,
  text2xl: 26,
  fontWeightMedium: 500,
  fontWeightNormal: 400,
  radius: 32, /* 2rem */

  radiusSm: 32 - 4,
  radiusMd: 32 - 2,
  radiusLg: 32,
  radiusXl: 32 + 4,

  slateGray: '#5B6B7A',
  softCream: '#FFF8F3',
  lightCream: '#FFFFFF',
  lightTerracotta: '#FFE5D9',
  lightBlue: '#D4E4FF',
  lightSage: '#E0F4E0',
  lightPink: '#FFE8F0',
  lightPeach: '#FFF4ED',
  terracotta: '#FF9A76',
  coral: '#FFB6B9',
  peach: '#FFC2A3',
  sage: '#A8C5A8',
  skyBlue: '#A3C7FF',
  lavender: '#D4C5FF',
  mutedNavy: '#3D4554',
  urbanBlue: '#8B92A8',

  ...light
  // ...(colorScheme === 'dark' ? dark : light)
};

const base = {
  // * { /* base: StyleSheet.create({...}) */
  //   @apply border-border outline-ring/50;
  // }

  // body { /* body: StyleSheet.create({...}) */
  //   @apply bg-background text-foreground;
  // }

  html: StyleSheet.create({
    text: {
      fontSize: inline.fontSize,
      fontFamily: 'system-ui' //'Plus Jakarta Sans', , -apple-system, sans-serif
    }
  })
}

/**
* Default typography styles for HTML elements (h1-h4, p, label, button, input).
* These are in @layer base, so Tailwind utility classes (like text-sm, text-lg) automatically override them.
*/

const h1 = StyleSheet.create({
  text: {
    fontSize: inline.text2xl,
    fontWeight: inline.fontWeightMedium,
    lineHeight: 24,
  }
});

const h2 = StyleSheet.create({
  text: {
    fontSize: inline.textXl,
    fontWeight: inline.fontWeightMedium,
    lineHeight: 24,
  }
});

const h3 = StyleSheet.create({
  text: {
    fontSize: inline.textLg,
    fontWeight: inline.fontWeightMedium,
    lineHeight: 24,
  }
});

const h4 = StyleSheet.create({
  text: {
    fontSize: inline.textBase,
    fontWeight: inline.fontWeightMedium,
    lineHeight: 24,
  }
});

const label = StyleSheet.create({
  text: {
    fontSize: inline.textBase,
    fontWeight: inline.fontWeightMedium,
    lineHeight: 24,
  }
});

const button = StyleSheet.create({
  text: {
    fontSize: inline.textBase,
    fontWeight: inline.fontWeightMedium,
    lineHeight: 24,
  }
});

const input = StyleSheet.create({
  text: {
    fontSize: inline.textBase,
    fontWeight: inline.fontWeightNormal,
    lineHeight: 24,
  }
});


export {
  base, button, h1, h2, h3, h4, inline, input, label
};

