# Module 00 V3 typography

Web uses next/font/google Inter, display swap and built-in self-hosting. The CSS stack starts with -apple-system/BlinkMacSystemFont, then optimized Inter, Segoe UI/Roboto/Helvetica/Arial. No SF Pro files redistributed. The previous Geist and Georgia display treatments are removed from the product foundation.

Android uses @expo-google-fonts/inter (400/500/600/700), loaded through existing expo-font. ProductText resolves the correct weight and line height. iOS keeps native system typography. Native text remains scalable; no maxFontSizeMultiplier cap was added. Inputs and role tab labels use the same platform font direction. Font-loading errors fall back to platform behavior; actual device acceptance is pending.

Hero: approximately 44-72px desktop, 38-56px narrow layouts. Marketing sections 32-52px; app titles 32px/27px mobile; sections 18-22px; body 16-18px; labels 14px; readable metadata 12-14px. Primarily 400/500/600, with 700 only for existing justified brand/emphasis. Heading tracking is tighter than body; long text uses comfortable line height and bounded measure. Data tables use tabular numerals.

Inter is SIL Open Font License 1.1; see https://rsms.me/inter/ and bundled @expo-google-fonts/inter license files. Apple fonts remain OS-provided. Font shift/actual glyph quality, 200% zoom and device text scaling still need rendered measurement.
