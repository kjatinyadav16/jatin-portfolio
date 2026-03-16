# Kothakota Jatin Yadav - Portfolio Website

A highly interactive, modern, and visually stunning personal portfolio website built with HTML, Vanilla CSS, and JavaScript. It features clean minimal design, smooth scroll animations, a fully responsive layout, and a robust Light/Dark mode toggle implementation.

## Project Structure
- `index.html`: The main markup containing all sections.
- `css/style.css`: The styling including CSS variables for theming, glassmorphism, responsive queries, and animations.
- `js/script.js`: Handles theme toggling, IntersectionObserver (for scroll reveals), mobile navigation, and parallax background effects.

## How to Run Locally
1. Clone or download this repository.
2. Open your terminal and navigate to the project directory.
3. Start a local server. If you have Python installed, you can run:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to `http://localhost:8000`.

## Deployment Instructions

### 1. Vercel
Vercel is great for static frontend deployments.
1. Create a free account at [Vercel](https://vercel.com/).
2. You can either use the Vercel CLI or deploy via GitHub.
   **Via GitHub (Recommended):**
   - Push this source code to a new GitHub repository.
   - On the Vercel dashboard, click "Add New..." -> "Project".
   - Import your GitHub repository.
   - No build settings are required since it is a pure HTML/CSS/JS project.
   - Click "Deploy".
   **Via Vercel CLI:**
   - Run `npm i -g vercel` in your terminal.
   - Run `vercel` in the project directory and follow the prompts.

### 2. Netlify
Netlify is another excellent platform for static sites.
1. Create a free account at [Netlify](https://www.netlify.com/).
2. On your Netlify dashboard, click "Add new site".
3. Choose "Deploy manually".
4. Simply drag and drop the `JatinPortfolio` folder containing your `index.html`, `css`, and `js` folders directly into the upload area.
5. Your site will immediately be live! (You can also deploy via GitHub similarly to Vercel).

### 3. GitHub Pages
GitHub Pages is perfect if you are already hosting your source code on GitHub.
1. Push this repository to GitHub.
2. Go to your repository settings.
3. Scroll down to the "Pages" section on the left sidebar.
4. Under "Build and deployment", select the `main` branch (or whichever branch your code is on) as the source.
5. Save the settings. Your website will be available at `https://<your-github-username>.github.io/<repository-name>/`.
