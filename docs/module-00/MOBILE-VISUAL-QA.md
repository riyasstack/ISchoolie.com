# Module 00 V3 mobile visual QA

**No emulator, signed device run or native screenshot inspected.** Android/iOS JS+Hermes bundle export, Expo Doctor, lint and types are compile/source evidence only. Mobile browser widths are all unverified; see WEB-VISUAL-QA.md.

Implemented source: shared palette and geometry, ProductText with platform/weight-aware Inter on Android and system iOS text, scaled line-height, role-specific tabs, separate auth categories/password visibility, profile screen, progressive local onboarding with profile/cover image preview, existing task/register/learning/guardian/tutor parity. Native picker copies only a selected image, bounds type/size/header and removes its temporary cache copy after reading. Actual OS behavior is unverified.

Required device matrix: five role tab sets; access/activation/recovery/MFA; profile setup/save/restore/photo/cover/remove; screen-state restriction/expiry clearing; safe areas and keyboard avoidance; rotation/large text; TalkBack/VoiceOver; reduced motion; back/deep links; interrupted picker and cache cleanup; low-end startup/scroll/frame behavior. No platform-owner console is added to native. Release still uses the real Module 01 access entry, while development prototypes stay isolated.
