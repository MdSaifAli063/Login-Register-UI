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

  if (signUpBtn) signUpBtn.addEventListener('click', onActivate('register'));
  if (signInBtn) signInBtn.addEventListener('click', onActivate('login'));

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