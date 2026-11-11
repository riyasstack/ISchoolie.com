# Module 00 V3 color system

Source of truth: packages/design-tokens/tokens.json and foundation.css.

| Role | Exact value | Use |
| --- | --- | --- |
| White | #FFFFFF | Dominant page, account, document and panel canvas |
| Primary | #0071E3 | Actions, links, active context, focus |
| Soft surface | #F5F5F7 | Quiet navigation, grouped secondary surfaces |
| Main text | #1D1D1F | Headings, body, data |
| Subtle grey | #86868B | Decorative/disabled nonessential treatment, not normal small text |
| Soft blue | #E8F2FC | Selected context and informational emphasis |
| Accessible muted | #6E6E73 | Readable secondary copy |
| Border / soft border | #D2D2D7 / #E5E5EA | Controls and quiet separators |
| Preserved logo | #2D2B55 | Existing logo/wordmark only |

Measured token contrast against white: primary 4.70:1, main text 16.83:1, readable muted 5.07:1. Subtle grey fails normal-text AA and is not the readable secondary token. Semantic green/red remain for actual success/error states. Existing compatibility names sage/lavender map to soft blue; peach/sand map to soft grey. Legacy surface alias remains soft grey; new white canvas uses background/white roles. No palette value is silently changed to satisfy contrast.

This is token arithmetic, not computed-style/runtime accessibility certification. Native uses the same JSON palette. The original logo is not silently recolored; the blue introductory/product artwork is a UI concept, not a replacement approved logo.
