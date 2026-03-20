# Kendren Cornish Portfolio

A comprehensive digital portfolio and research repository built for **Kendren Cornish**, highlighting intersections of Applied AI, Comparative Theology, and Military/Nonprofit service.

## Project Structure
- **Global Stylings:** Custom-designed academic dark mode aesthetic (`style.css`).
- **Pages:**
  - `index.html`: Main landing page bridging machine learning with existential frameworks.
  - `about.html`, `military.html`, `nonprofit.html`: Personal background and identity pillars.
  - `research.html`, `projects.html`, `blog.html`: Showcases of academic work, FinTech analytics, and long-form writings exploring AI ethics and classical Chinese texts.
  - `graduate.html`: Graduate admissions strategy and thesis scoping.
  - `socials.html`: Contact forms and outbound links.
  - `resume-ai/`: A fully functional React/Vite-based AI Resume tailoring platform compiled and integrated directly.

## Technology Stack
- **Core Frontend:** HTML5, Vanilla JavaScript, Custom CSS (No external frameworks for max performance).
- **Embedded Tools:** Vite, React, Node.js (specifically for the nested `resume-ai` app).
- **Deployment:** Configured for Vercel or GitHub Pages static hosting.

## Automated Updates
To update the integrated `resume-ai` React application code, you don't need to manually move files. Just run the provided sync script from the root of this folder:

```bash
./update_resume.sh
```

This automatically navigates to your source code, rebuilds the standalone Resume AI application, safely deletes the old version, and syncs the new distribution build seamlessly into this portfolio site.
