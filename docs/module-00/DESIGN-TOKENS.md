# Design tokens

Canonical shared values: `packages/design-tokens/tokens.json`. Web root derives semantic color custom properties from this file; native components consume its colors, radius, and press timings. CSS contains responsive layout rules and web typography. Supporting palette is proposed.

| Purpose | Value |
|---|---|
| Confirmed logo anchor | #2D2B55 |
| Ink / secondary copy | #242536 / #666775 |
| Surface / border | #F7F8F8 / #E7E7E8 |
| Sage / peach / lavender / sand | #E6EEEA / #FAE8DC / #EDEAF5 / #F2EDDF |
| Success / error | #2C6652 / #A83B3B |
| Shared spacing | 4, 8, 16, 24, 32, 48 |
| Control / card / overlay radius | 8 / 14 / 18 |
| Native minimum button | 48 points |
| Web base action target | 44 pixels; some dense desktop actions are smaller |
| Focus | Immediate 3px outline, 4px offset |

Web: Geist, Geist Mono for identifiers/numbers, Georgia used only in original decorative course art. Hero uses clamp; task titles use a narrower scale. Native: platform system fonts and natural dynamic text sizing, without maximum font scaling caps. Long-list virtualization, full large-text layout QA, and complete contrast review remain pending. Light appearance only; no dark-mode completeness is claimed.

Animate UI owns its actual web spring tokens and reduced-motion behavior. The shared JSON's 120ms press/0.97 scale expresses native semantic parity, not identical engine parameters. Web SVG signature durations are documented exceptions in MOTION-SYSTEM.md.
