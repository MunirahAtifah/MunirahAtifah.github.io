document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. THEME TOGGLER (DARK / LIGHT MODE)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyEl = document.body;

  // Retrieve theme preference from localStorage, default is dark-theme
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    bodyEl.classList.remove('dark-theme');
    bodyEl.classList.add('light-theme');
  } else {
    bodyEl.classList.add('dark-theme');
    bodyEl.classList.remove('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    if (bodyEl.classList.contains('dark-theme')) {
      bodyEl.classList.remove('dark-theme');
      bodyEl.classList.add('light-theme');
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      bodyEl.classList.remove('light-theme');
      bodyEl.classList.add('dark-theme');
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });

  // ==========================================================================
  // 2. MOBILE NAVIGATION MENU
  // ==========================================================================
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileMenuLinks = document.querySelectorAll('.nav-links a');

  // Toggle mobile menu visibility
  mobileToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('menu-active');
    
    // Change menu icon based on status
    const icon = mobileToggleBtn.querySelector('i');
    if (navMenu.classList.contains('menu-active')) {
      icon.classList.remove('ti-menu-2');
      icon.classList.add('ti-x');
    } else {
      icon.classList.remove('ti-x');
      icon.classList.add('ti-menu-2');
    }
  });

  // Close mobile menu when a nav link is clicked
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('menu-active')) {
        navMenu.classList.remove('menu-active');
        const icon = mobileToggleBtn.querySelector('i');
        icon.classList.remove('ti-x');
        icon.classList.add('ti-menu-2');
      }
    });
  });

  // ==========================================================================
  // 3. STICKY NAVBAR & ACTIVE LINK OBSERVER
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    // Add scroll class to navbar
    if (window.scrollY > 20) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    // Scroll active link highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active-link');
      }
    });
  });

  // ==========================================================================
  // 4. INTERSECTION OBSERVER FOR ENTRANCE ANIMATIONS
  // ==========================================================================
  const animationItems = document.querySelectorAll('.fade-in-up');
  
  const appearanceOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const appearanceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  }, appearanceOptions);

  animationItems.forEach(item => {
    appearanceObserver.observe(item);
  });

  // ==========================================================================
  // 5. PROJECT DETAILS MODALS
  // ==========================================================================
  const openModalBtns = document.querySelectorAll('.open-project-btn');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const modals = document.querySelectorAll('.project-modal');

  // Open modal handler
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-target');
      const targetModal = document.getElementById(targetId);
      if (targetModal) {
        targetModal.classList.add('modal-active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
        targetModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  // Close modal handler
  const closeModal = (modal) => {
    modal.classList.remove('modal-active');
    document.body.style.overflow = ''; // Unlock background scrolling
    modal.setAttribute('aria-hidden', 'true');
  };

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.project-modal');
      closeModal(parentModal);
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      const parentModal = overlay.closest('.project-modal');
      closeModal(parentModal);
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('modal-active')) {
          closeModal(modal);
        }
      });
    }
  });
});
