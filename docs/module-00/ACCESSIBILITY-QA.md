# Module 00 V3 accessibility QA

Source/build checks are not WCAG certification. Token arithmetic: primary on white 4.70:1, main text on white 16.83:1, readable muted on white 5.07:1. The mandatory #86868B is reserved for nonessential/disabled treatment because it fails normal small-text AA.

Implemented: visible immediate focus rings, explicit form labels, linked inline errors, password visibility state/labels, category pressed states, semantic headings/main landmarks, Radix dialog focus ownership, native accessible roles/selected/disabled state, user-reduced-motion provider and media fallback, native text scaling and bounded file inputs. Local profile review revalidates required fields after snapshot restoration. Blob URLs/cache copies are scoped and cleared; identity/consent boundaries remain intact.

Generated-HTML checks cover label associations, duplicate IDs, nested links/buttons and landmarks across the screen/workflow catalog, plus state boundary/locked-choice attributes. These checks do not run hydration, keyboard, screen-reader or computed layout. Final command/results are recorded in FINAL-DESIGN-REPORT.md and output/module-00-v3/qa-summary.json.

Unverified: actual focus order/restoration after steps and dialogs, error announcements on every platform, zoom/large text, contrast over media/disabled states, all nine viewport widths, VoiceOver/TalkBack, pointer-vs-touch motion, and whether every component state meets acceptance. No visual or assistive-technology pass is claimed.
