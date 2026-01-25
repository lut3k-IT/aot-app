## 2025-06-12 - [Pre-existing Build Failure]
**Learning:** The project has a pre-existing build failure (`TypeError: Cannot destructure property 'store' of 't(...)' as it is null`) related to `next build` prerendering and i18next/Redux context. This persists even after reverting changes.
**Action:** When validating optimizations, if the build fails, try to verify if it's a regression or pre-existing by reverting and checking. If pre-existing, document it and proceed if the optimization logic is sound and verified via other means (lint, code review).
