document.addEventListener('DOMContentLoaded', function () {
  const qs = (sel, root = document) => root.querySelector(sel);

  const wrapper = qs('.wrapper');
  const loginForm = qs('.login-form');
  const registerForm = qs('.register-form');
  const loginTitle = qs('.title-login');
  const registerTitle = qs('.title-register');
  const signUpBtn = qs('#SignUpBtn');
  const signInBtn = qs('#SignInBtn');

  if (!wrapper || !loginForm || !registerForm) {
    console.warn('Auth toggle: .wrapper/.login-form/.register-form not found.');
    return;
  }

  // Whether forms are inside wrapper (CSS depends on this nesting)
  const formsInsideWrapper = wrapper.contains(loginForm) && wrapper.contains(registerForm);

  // Apply the view: class toggle + inline fallback (ensures visibility even if CSS/nesting is off)
  function applyView(isRegister) {
    wrapper.classList.toggle('register-active', isRegister);

    // Inline fallback so it works regardless of CSS
    loginForm.style.display = isRegister ? 'none' : '';
    registerForm.style.display = isRegister ? '' : 'none';

    if (loginTitle) {
      loginTitle.setAttribute('aria-selected', String(!isRegister));
      loginTitle.setAttribute('tabindex', isRegister ? '-1' : '0');
      loginTitle.classList.toggle('active', !isRegister);
    }
    if (registerTitle) {
      registerTitle.setAttribute('aria-selected', String(isRegister));
      registerTitle.setAttribute('tabindex', isRegister ? '0' : '-1');
      registerTitle.classList.toggle('active', isRegister);
    }
  }

  const setView = (view, { save = true, updateHash = false } = {}) => {
    const isRegister = view === 'register';
    applyView(isRegister);

    if (save) {
      try { localStorage.setItem('authView', view); } catch (_) {}
    }

    if (updateHash) {
      const hash = isRegister ? '#register' : '#login';
      try {
        if (location.hash !== hash) history.replaceState(null, '', hash);
      } catch (_) {
        location.hash = hash;
      }
    }
  };

  // Public API for legacy calls
  window.loginFunction = function () {
    setView('login', { updateHash: true });
  };
  window.registerFunction = function () {
    setView('register', { updateHash: true });
  };

  // Make titles focusable and ARIA-friendly if present
  [loginTitle, registerTitle].forEach((el) => {
    if (!el) return;
    el.setAttribute('role', 'tab');
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
  });

  const onActivate = (view) => (e) => {
    // Only prevent default for anchors or buttons without explicit type=button
    const t = e.currentTarget;
    const tag = t && t.tagName ? t.tagName.toLowerCase() : '';
    if (tag === 'a' || (tag === 'button' && t.getAttribute('type') !== 'button')) {
      e.preventDefault();
    }
    setView(view, { updateHash: true });
  };

  if (loginTitle) {
    loginTitle.addEventListener('click', onActivate('login'));
    loginTitle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setView('login', { updateHash: true });
      }
    });
  }

  if (registerTitle) {
    registerTitle.addEventListener('click', onActivate('register'));
    registerTitle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setView('register', { updateHash: true });
      }
    });
  }

  // Handle switch-form links (Register/Login links at bottom of forms)
  const switchLinks = document.querySelectorAll('.switch-link');
  switchLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const view = this.getAttribute('data-view');
      if (view === 'login' || view === 'register') {
        setView(view, { updateHash: true });
      }
    });
  });

  // Clear error states on input
  const clearErrorOnInput = (input) => {
    if (input) {
      input.addEventListener('input', function() {
        this.closest('.input-box')?.classList.remove('error');
      });
    }
  };
  
  clearErrorOnInput(qs('#log-email'));
  clearErrorOnInput(qs('#log-pass'));
  clearErrorOnInput(qs('#reg-name'));
  clearErrorOnInput(qs('#reg-email'));
  clearErrorOnInput(qs('#reg-pass'));
  
  if (qs('#agree')) {
    qs('#agree').addEventListener('change', function() {
      this.closest('.form-cols')?.classList.remove('error');
    });
  }

  // Handle form submissions
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = qs('#log-email');
      const passwordInput = qs('#log-pass');
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      
      // Remove previous error states
      emailInput.closest('.input-box')?.classList.remove('error');
      passwordInput.closest('.input-box')?.classList.remove('error');
      
      let hasError = false;
      
      if (!email) {
        emailInput.closest('.input-box')?.classList.add('error');
        hasError = true;
      }
      if (!password) {
        passwordInput.closest('.input-box')?.classList.add('error');
        hasError = true;
      }
      
      if (!hasError && email && password) {
        // Add your login logic here
        console.log('Login attempt:', { email, password });
        // Example: 
        // fetch('/api/login', { 
        //   method: 'POST', 
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, password }) 
        // })
        // .then(response => response.json())
        // .then(data => { /* handle success */ })
        // .catch(error => { /* handle error */ });
        alert('Login successful! (Add your authentication logic in js/script.js)');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = qs('#reg-name');
      const emailInput = qs('#reg-email');
      const passwordInput = qs('#reg-pass');
      const agreeCheckbox = qs('#agree');
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const agree = agreeCheckbox.checked;
      
      // Remove previous error states
      nameInput.closest('.input-box')?.classList.remove('error');
      emailInput.closest('.input-box')?.classList.remove('error');
      passwordInput.closest('.input-box')?.classList.remove('error');
      agreeCheckbox.closest('.form-cols')?.classList.remove('error');
      
      let hasError = false;
      
      if (!name) {
        nameInput.closest('.input-box')?.classList.add('error');
        hasError = true;
      }
      if (!email) {
        emailInput.closest('.input-box')?.classList.add('error');
        hasError = true;
      }
      if (!password) {
        passwordInput.closest('.input-box')?.classList.add('error');
        hasError = true;
      }
      if (!agree) {
        agreeCheckbox.closest('.form-cols')?.classList.add('error');
        hasError = true;
        alert('Please agree to the terms & conditions');
      }
      
      if (!hasError && name && email && password && agree) {
        // Add your registration logic here
        console.log('Registration attempt:', { name, email, password });
        // Example:
        // fetch('/api/register', { 
        //   method: 'POST', 
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ name, email, password }) 
        // })
        // .then(response => response.json())
        // .then(data => { /* handle success */ })
        // .catch(error => { /* handle error */ });
        alert('Registration successful! (Add your authentication logic in js/script.js)');
      }
    });
  }

  const getHashView = () => (String(location.hash).toLowerCase() === '#register' ? 'register' : 'login');

  // Initialize view from localStorage or URL hash
  let initial = null;
  try { initial = localStorage.getItem('authView'); } catch (_) { initial = null; }
  if (initial !== 'login' && initial !== 'register') initial = getHashView();
  setView(initial, { save: false });

  // Sync with hash navigation
  window.addEventListener('hashchange', () => {
    setView(getHashView(), { save: false });
  });

  // Developer aid if nesting is wrong
  if (!formsInsideWrapper) {
    console.warn('Auth toggle: forms are not inside .wrapper; CSS toggling may not apply. Inline fallback is active.');
  }
});