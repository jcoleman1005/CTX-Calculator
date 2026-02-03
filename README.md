# Rocephin (Ceftriaxone) IM Calculator

A small, web-based calculator to help pediatric providers determine intramuscular (IM) Ceftriaxone doses, reconstitution volumes, and per-site injection safety limits.

Live demo: [jcoleman1005.github.io/CTX-Calculator](https://jcoleman1005.github.io/CTX-Calculator/)

## Features
- Instant volume calculation: converts an ordered mg dose to the exact mL to draw, based on vial concentration.
- Reconstitution guidance: quick reference for adding 1% Lidocaine to 500 mg or 1 g vials.
- Pediatric safety logic: flags when a calculated injection volume exceeds the safe per-site limit for the patient's age group (Infant, Toddler, Older Child).
- Split-dose helper: when a dose is too large for one site, shows how many injections are required and the volume per injection.

## How to use
1. Enter the ordered Ceftriaxone dose (mg).
2. Select vial size (500 mg or 1000 mg).
3. Enter patient age or select age category.
4. The calculator displays:
   - Total volume to draw (mL)
   - Whether the volume exceeds the safe per-site limit
   - If needed, the recommended number of injection sites and volume per site

## Reconstitution (assumptions)
- 1000 mg vial: add 2.1 mL diluent → total yield ≈ 2.9 mL (≈350 mg/mL)
- 500 mg vial: add 1.0 mL diluent → total yield ≈ 1.4 mL (≈350 mg/mL)

## Injection site safety limits (used by the calculator)
- Infant (< 1 yr): max 1.0 mL per site
- Toddler (1–2 yrs): max 1.5 mL per site
- Child (> 2 yrs): max 2.0 mL per site

## Technical details
- Framework: React 18
- Styling: Tailwind CSS
- Architecture: Single-file HTML (no build step required)
- Deployment: GitHub Pages

## Contributing
Contributions, suggestions, and bug reports are welcome. Please open an issue or a pull request in this repository. For code changes, please include a brief description of the change and testing steps.

## Medical disclaimer
For Educational and Reference Purposes Only.

This application is intended as a calculation aid and double‑check tool for qualified medical professionals. It is NOT a substitute for professional clinical judgment, institutional policies, or drug manufacturer instructions.

While the calculations are based on standard reconstitution guidance, users must verify doses and volumes before administration. The author and repository maintainers are not responsible for clinical decisions or patient outcomes resulting from use of this tool.

## License & Contact
- License: (add license if desired)
- Author / Maintainer: jcoleman1005 — [GitHub profile](https://github.com/jcoleman1005)