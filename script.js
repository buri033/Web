/* ==========================================================================
   AURA CAFÉ - JAVASCRIPT DE INTERACTIVIDAD & CALCULADORA BARISTA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. NAVIGATION & MOBILE MENU TOGGLE
     ------------------------------------------------------------------------ */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const siteHeader = document.getElementById('site-header');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
  }

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const activeNav = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (activeNav) activeNav.classList.add('active');
      } else {
        if (activeNav) activeNav.classList.remove('active');
      }
    });

    // Header elevation shadow
    if (scrollY > 50) {
      siteHeader.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }
  });

  /* ------------------------------------------------------------------------
     2. COFFEE CATALOG CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const coffeeCards = document.querySelectorAll('.coffee-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      coffeeCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     3. INTERACTIVE BREW RATIO CALCULATOR
     ------------------------------------------------------------------------ */
  const methodSelect = document.getElementById('calc-method');
  const calcRadios = document.getElementsByName('calc-mode-radio');
  const waterGroup = document.getElementById('water-input-group');
  const cupsGroup = document.getElementById('cups-input-group');
  const inputWater = document.getElementById('input-water');
  const inputCups = document.getElementById('input-cups');

  const resCoffee = document.getElementById('res-coffee');
  const resWater = document.getElementById('res-water');
  const resBloom = document.getElementById('res-bloom');
  const stepBloomVal = document.getElementById('step-bloom-val');

  // Method Ratios (Water : Coffee)
  const methodRatios = {
    v60: 15,         // 1:15
    chemex: 16,      // 1:16
    aeropress: 14,   // 1:14
    frenchpress: 13, // 1:13
    espresso: 2      // 1:2
  };

  function calculateRatio() {
    if (!methodSelect) return;

    const selectedMethod = methodSelect.value;
    const ratio = methodRatios[selectedMethod] || 15;

    let calcMode = 'water';
    calcRadios.forEach(radio => {
      if (radio.checked) calcMode = radio.value;
    });

    let totalWater = 300;

    if (calcMode === 'cups') {
      const cups = parseFloat(inputCups.value) || 1;
      totalWater = cups * 200; // 200mL per cup
    } else {
      totalWater = parseFloat(inputWater.value) || 300;
    }

    // Calculation
    let coffeeGrams = 0;
    if (selectedMethod === 'espresso') {
      coffeeGrams = (totalWater / ratio).toFixed(1);
    } else {
      coffeeGrams = (totalWater / ratio).toFixed(1);
    }

    const bloomWater = Math.round(coffeeGrams * 3);

    // Update UI
    resCoffee.textContent = `${coffeeGrams} g`;
    resWater.textContent = `${totalWater} mL`;
    resBloom.textContent = `${bloomWater} mL`;
    if (stepBloomVal) stepBloomVal.textContent = `${bloomWater} mL`;
  }

  // Add Listeners to Form Inputs
  if (methodSelect) {
    methodSelect.addEventListener('change', calculateRatio);
    inputWater.addEventListener('input', calculateRatio);
    inputCups.addEventListener('input', calculateRatio);

    calcRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'cups') {
          waterGroup.classList.add('hidden');
          cupsGroup.classList.remove('hidden');
        } else {
          cupsGroup.classList.add('hidden');
          waterGroup.classList.remove('hidden');
        }
        calculateRatio();
      });
    });

    // Initial calculation call
    calculateRatio();
  }

  /* ------------------------------------------------------------------------
     4. CONTACT FORM SUBMISSION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      showToast(`¡Gracias ${name}! Hemos recibido tu mensaje. Te responderemos pronto.`);
      contactForm.reset();
    });
  }

});

/* ------------------------------------------------------------------------
   5. MODAL DIALOG & TOAST UTILITIES
   ------------------------------------------------------------------------ */
function openCoffeeModal(coffeeName, price) {
  const modal = document.getElementById('coffee-modal');
  const title = document.getElementById('modal-title');
  const priceElem = document.getElementById('modal-price');

  if (modal && title && priceElem) {
    title.textContent = coffeeName;
    priceElem.textContent = price;
    modal.classList.remove('hidden');
  }
}

function closeCoffeeModal() {
  const modal = document.getElementById('coffee-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
