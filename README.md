# 🔐 Login & Register UI

A clean, modern Login & Register interface built with HTML, CSS, and JavaScript — featuring floating labels, polished focus/hover states, responsive design, and optional user/brand logo support.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000000)
![Icons](https://img.shields.io/badge/Icons-Boxicons-1E90FF)
![Responsive](https://img.shields.io/badge/Responsive-Yes-34D399)

---

## ✨ Features

- 🧭 Two-tab auth: Login and Register
- 📝 Floating labels for inputs
- 👁️ Clear focus and hover states (keyboard accessible)
- 📱 Responsive card layout
- 🧩 Boxicons integrated for crisp icons
- 👤 Optional brand/user logo header
- 🧪 Basic HTML5 validation (required fields)
- 🎛️ Easy theme tweaks via CSS variables

---

## 📂 Project Structure


. ├── index.html ├── css/ │ └── style.css └── js/ └── script.js

---

## 🚀 Quick Start

- Option 1: Double-click index.html to open in your browser
- Option 2 (Recommended): Use a local server for best results
  - VS Code: Install “Live Server” → Open index.html → Right-click → “Open with Live Server”
  - Python: `python -m http.server 8080` then visit http://localhost:8080

---

## 🖱️ Usage

- Switch between Login and Register:
  - Click the “Login” / “Register” tabs at the top, or
  - Use the “Register” / “Login” link under the submit button
- The provided js/script.js should handle switching forms (e.g., toggling classes or calling `registerFunction()` / `loginFunction()` as used in the HTML)

---

## 🧑‍🎨 Add Your Logo or Avatar

Place a brand/user header inside the `.wrapper`, above `.form-header` in `index.html`.

Example (brand logo):
```html
<div class="brand">
  <div class="brand-logo">
    <img src="assets/logo.png" alt="Brand logo">
  </div>
  <h2 class="brand-title">Welcome back</h2>
</div>
```

Example (user avatar):
```html
<div class="brand">
  <div class="brand-logo avatar">
    <img src="assets/user-avatar.jpg" alt="User avatar">
  </div>
  <h2 class="brand-title">Sign in to continue</h2>
</div>
```
Notes:

- Put your image under assets/ (or any path you prefer) and update the src.
- The .avatar class renders the logo circular, ideal for user photos.
- Ensure the stylesheet includes styles for .brand, .brand-logo, and .brand-title (if you’re using the enhanced UI styles).

## 🎨 Customization

- Colors, radii, shadows, and transitions can be centralized via CSS variables (in css/style.css).
  
Icons: Boxicons are included via CDN:
```
<link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
```
Use them in HTML like:
```
<i class="bx bx-envelope"></i>
<i class="bx bx-lock-alt"></i>
<i class="bx bx-user"></i>
```
Background: Replace or remove any background image/gradient rules in your
CSS if desired.

## ♿ Accessibility

- Labels are associated with inputs via for and id.
- Keyboard users can tab through inputs and buttons.
- Consider honoring prefers-reduced-motion in CSS if you add animations.

## 🧰 Scripts

js/script.js can:
- Toggle the active form (login/register)
- Add/remove a class on .wrapper (e.g., .register-active) if your CSS uses it
- Handle basic events like button clicks and form submission
- Add your authentication logic (e.g., fetch/axios) as needed.

🖼️ Preview

![image](https://github.com/MdSaifAli063/Login-Register-UI/blob/8b116218cd8637c3cb2fa8729e3ae9b3d97ef82e/Screenshot%202025-09-13%20014449.png)
![image](https://github.com/MdSaifAli063/Login-Register-UI/blob/fee633c0c5cf603380553214d3c6e641b300882a/Screenshot%202025-09-13%20014254.png)


## 🤝 Contributing

- Fork the repo
- Create a feature branch: git checkout -b feat/better-validation
- Commit changes: git commit -m "Improve form validation and focus states"
- Push and open a PR

## 📄 License

This project is provided as-is for personal or commercial use. If you need a specific license (e.g., MIT), add a LICENSE file and update this section accordingly.

## 🙏 Acknowledgements

- Icons: Boxicons
- Fonts/Design inspiration: Inter + modern auth UI patterns

❓ FAQ

Q: Can I use Font Awesome instead?
A: Yes, swap the Boxicons CDN and update icon class names accordingly.
Q: How do I change the primary color?
A: Update the relevant CSS variables (e.g., --blue-500, --blue-600) in css/style.css.
