# Veloce Motors - Premium Car Dealership 🏎️✨

A complete, production-quality, multi-page frontend website for a luxury car dealership called **"VELOCE MOTORS"**. The design embraces a **"Dark Luxury Automotive"** aesthetic—cinematic, sleek, motion-rich, and highly interactive.

This project was built from the ground up without heavy JS frameworks (like React or Vue) to showcase mastery over modern CSS, semantic HTML, and complex DOM animations using Vanilla JavaScript and GSAP.

## 🌟 Key Features

* **Dark Luxury Design System:** Deep black backgrounds (`#0A0A0C`), sleek glassmorphism UI elements, and striking Electric Amber (`#FF6A00`) accents.
* **Cinematic Animations:** Powered by GSAP and ScrollTrigger. Features scroll-reveals, kinetic typography, parallax sections, and staggered bento-grid reveals.
* **Smooth Scrolling:** Integrated with Lenis for a buttery-smooth, premium scrolling experience.
* **Custom Interactions:** 
  * A bespoke trailing custom cursor (`custom-cursor` and `custom-cursor-ring`).
  * Magnetic buttons that smoothly pull toward the user's cursor.
  * Page transition curtains for seamless navigation between HTML pages.
* **Interactive Calculators & Forms:** 
  * Live auto loan financing calculator with animated donut charts and dual-binding range sliders.
  * Multi-step trade-in valuation form with progress tracking.
* **Complex Data Handling (Vanilla JS):** Client-side mock inventory filtering, sorting, and dynamic card rendering with skeleton loading states.

## 🛠️ Technology Stack

* **Core:** Semantic HTML5, CSS3 (Custom Properties/Variables), Vanilla JavaScript (ES6+).
* **Animations:** [GSAP (GreenSock)](https://gsap.com/) & ScrollTrigger.
* **Scrolling:** [Lenis](https://lenis.studiofreight.com/).
* **Carousels:** [Swiper.js](https://swiperjs.com/).
* **Architecture:** Component-driven CSS architecture (`variables.css`, `style.css`, `components.css`).

## 📁 Project Structure

The project includes over 12 fully responsive pages:

* `index.html` - Cinematic Home Page
* `inventory.html` - Interactive Car Inventory & Filters
* `vehicle-detail.html` - Deep-dive Specs & Color Configurator
* `financing.html` - Loan Calculator & Application
* `trade-in.html` - Multi-step Valuation Form
* `services.html` - Maintenance & Service Booking
* `compare.html` - Vehicle Comparison Table
* `test-drive.html` - VIP Test Drive Booking
* `about.html`, `contact.html`, `faq.html`, `login.html`, `dashboard.html`, `404.html`

## 🚀 Getting Started

Since this is a vanilla frontend project, no complex build steps (like Webpack or Vite) are required!

1. Clone the repository:
   ```bash
   git clone https://github.com/daniyal-dev075/Car-dealership-Web-Design.git
   ```
2. Open the project folder.
3. Use an extension like **Live Server** in VS Code to run the project.
   * *Alternatively, you can just double-click `index.html` to open it directly in your browser!*

## 💡 Performance Optimization

* Heavy use of CSS `transform` and `opacity` properties for animations to prevent layout thrashing and maintain 60 FPS.
* CSS `clamp()` functions used extensively for fluid, responsive typography without aggressive media queries.

---
*Crafted with passion for automotive excellence.*