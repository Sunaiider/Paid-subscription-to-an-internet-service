const products = [
  {
    id: 'plan-1',
    name: 'Plan Básico Hogar',
    description: 'Velocidad estable para navegación, redes sociales y trabajo remoto.',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    plan: 'basic',
    priceId: 'price_1SRaRw6x08voOZbHrOY8PjKG',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'plan-2',
    name: 'Plan Rápido Streaming',
    description: 'Ideal para series y videollamadas simultáneas sin cortes.',
    price: 40.00,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    plan: 'premium',
    priceId: 'price_1SRadU6x08voOZbHwbND79ee',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'plan-3',
    name: 'Plan Familiar',
    description: 'Cobertura para varios dispositivos en el hogar con mayor velocidad.',
    price: 60.00,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    plan: 'family',
    priceId: 'price_1SRaeX6x08voOZbHYY4isz1T',
    gallery: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'service-1',
    name: 'Reparaciones de electrodomésticos',
    description: 'Servicio técnico a domicilio para reparar lavadoras, refrigeradores y más.',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    plan: 'service1', 
    priceId: 'price_1TiExd6x08voOZbHE63JHqAf',
    gallery: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905251738-48416c8edfc1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1630581684735-978de7fb3ced?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'service-2',
    name: 'Instalación de sistemas de seguridad',
    description: 'Instalamos cámaras, sensores y alarmas para proteger tu hogar.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80',
    plan: 'service2',
    priceId: 'price_1TiEzt6x08voOZbHv2rmn6lZ',
    gallery: [
      'https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'service-3',
    name: 'Asesoría en tecnología doméstica',
    description: 'Consultoría para elegir y configurar dispositivos inteligentes en tu hogar.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    plan: 'service3',
    priceId: 'price_1TiF1C6x08voOZbHGcOBNSej',
    gallery: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'plan-4',
    name: 'Plan Empresarial',
    description: 'Conexión estable y soporte para tu pequeña empresa.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    plan: 'empresarial',
    priceId: 'price_1TiF4o6x08voOZbHn0jJMniI',
    gallery: [
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'plan-5',
    name: 'Plan Gamer',
    description: 'Baja latencia y estabilidad para partidas en línea.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    plan: 'gamer',
    priceId: 'price_1TiF6V6x08voOZbHoGN9UnmQ',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'plan-6',
    name: 'Plan Profesional',
    description: 'Ideal para quienes necesitan conexión rápida todo el día.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    plan: 'professional',
    priceId: 'price_1TiFA36x08voOZbH88mox1xR',
    gallery: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const state = {
  cart: {},
  searchQuery: ''
};

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function renderCartCount() {
  const count = Object.values(state.cart).reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.querySelector('.cart-counter');
  if (countEl) countEl.textContent = count;
  return count;
}

function renderProducts(productListEl) {
  const query = state.searchQuery.toLowerCase().trim();
  const filtered = products.filter(product => {
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  productListEl.innerHTML = filtered.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-meta">
          <span class="price">${formatPrice(product.price)}</span>
          <button class="btn add-cart" data-product-id="${product.id}">Agregar al carrito</button>
        </div>
        <div class="product-actions">
          <a class="btn secondary" href="/product/${encodeURIComponent(product.id)}">Ver más</a>
          <button class="btn buy-now" type="button" data-product-id="${product.id}">Contratar</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.productId;
      addToCart(id);
    });
  });

  document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.productId;
      const product = products.find(item => item.id === id);
      if (product) {
        submitCheckoutForm(product);
      }
    });
  });
}

function submitCheckoutForm(product) {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = '/create-checkout-session';
  form.style.display = 'none';

  const fields = {
    email: 'test@example.com',
    plan: product.plan,
    price_id: product.priceId
  };
  if (product.plan.startsWith('service')) {
    fields.mode = 'payment';
  }

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  if (!state.cart[productId]) {
    state.cart[productId] = { ...product, quantity: 0 };
  }
  state.cart[productId].quantity += 1;
  renderCartCount();
  showCartMessage(`${product.name} agregado al carrito.`);
}

function removeFromCart(productId) {
  if (!state.cart[productId]) return;

  delete state.cart[productId];
  renderCartCount();
  showCartMessage('Producto eliminado del carrito.');
  openCartModal();
}

function showCartMessage(text) {
  const existing = document.querySelector('.toast-message');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2000);
}

function applyDarkModePreference() {
  const stored = localStorage.getItem('darkMode');
  const enabled = stored === 'true';
  document.documentElement.classList.toggle('dark-mode', enabled);
}

function toggleDarkMode() {
  const active = document.documentElement.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', active.toString());
}

function handleContactSubmit(event, contactForm, contactFeedback) {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    contactFeedback.textContent = 'Por favor completa todos los campos.';
    contactFeedback.classList.add('error');
    return;
  }

  contactFeedback.textContent = 'Mensaje enviado. Gracias por contactarnos.';
  contactFeedback.classList.remove('error');
  contactForm.reset();
}

function showCartSummary() {
  const totalItems = renderCartCount();
  const text = totalItems > 0 ? `Tienes ${totalItems} producto(s) en el carrito.` : 'El carrito está vacío.';
  showCartMessage(text);
}

function openLoginModal() {
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    loginModal.classList.remove('hidden');
  }
}

function closeLoginModal() {
  const loginModal = document.getElementById('loginModal');
  if (loginModal) {
    loginModal.classList.add('hidden');
  }
}

function openCartModal() {
  const cartModal = document.getElementById('cartModal');
  const cartContent = document.getElementById('cartContent');
  const buyCartButton = document.getElementById('buyCartButton');

  if (!cartModal || !cartContent || !buyCartButton) return;

  const items = Object.values(state.cart);
  if (items.length === 0) {
    cartContent.innerHTML = '<p class="muted">Tu carrito está vacío.</p>';
    buyCartButton.disabled = true;
  } else {
    cartContent.innerHTML = items.map(item => `
      <div class="cart-item">
        <span>${item.name} × ${item.quantity}</span>
        <strong>${formatPrice(item.price * item.quantity)}</strong>
        <button class="btn icon remove-item" data-product-id="${item.id}" aria-label="Eliminar ${item.name}">🗑</button>
      </div>
    `).join('');
    buyCartButton.disabled = false;

    cartContent.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', (event) => {
        const id = event.currentTarget.dataset.productId;
        removeFromCart(id);
      });
    });
  }

  cartModal.classList.remove('hidden');
}

async function buyCart() {
  if (!state.user) {
    openLoginModal();
    return;
  }

  const items = Object.values(state.cart).map(item => ({
    price_id: item.priceId,
    quantity: item.quantity,
    plan: item.plan
  }));

  if (items.length === 0) {
    showCartMessage('El carrito está vacío.');
    return;
  }

  try {
    const response = await fetch('/create-cart-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: state.user.email,
        items
      })
    });

    const result = await response.json();
    if (response.ok) {
      if (result.url) {
        window.location.href = result.url;
      } else if (result.urls && Array.isArray(result.urls) && result.urls.length) {
        // Manejar array de URLs (puede contener objetos {type,url})
        const entries = result.urls;
        // si son objetos, abrir primero subscription en la misma pestaña y payment en nueva pestaña
        if (typeof entries[0] === 'object') {
          const subscription = entries.find(e => e.type === 'subscription');
          const payment = entries.find(e => e.type === 'payment');
          if (subscription) {
            if (payment) {
              try { window.open(payment.url, '_blank'); } catch (e) { /* ignore */ }
            }
            window.location.href = subscription.url;
          } else {
            // fallback: abrir la primera
            window.location.href = entries[0].url;
            for (let i = 1; i < entries.length; i++) {
              try { window.open(entries[i].url, '_blank'); } catch (e) { /* ignore */ }
            }
          }
        } else {
          // array de strings: comportamiento previo
          window.location.href = result.urls[0];
          for (let i = 1; i < result.urls.length; i++) {
            try { window.open(result.urls[i], '_blank'); } catch (e) { /* ignore */ }
          }
        }
      } else {
        showCartMessage('Respuesta inesperada del servidor.');
      }
    } else {
      showCartMessage(result.error || 'No se pudo iniciar el pago.');
    }
  } catch (err) {
    showCartMessage('Error al conectar con el servidor.');
  }
}

function closeCartModal() {
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.classList.add('hidden');
  }
}

function openAccountModal() {
  const accountModal = document.getElementById('accountModal');
  const accountEmail = document.getElementById('accountEmail');
  const accountName = document.getElementById('accountName');
  if (state.user && accountEmail && accountName) {
    accountEmail.value = state.user.email;
    accountName.value = state.user.name;
  }
  if (accountModal) {
    accountModal.classList.remove('hidden');
  }
}

function closeAccountModal() {
  const accountModal = document.getElementById('accountModal');
  if (accountModal) {
    accountModal.classList.add('hidden');
  }
}

function setHeaderForUser() {
  const loginButton = document.getElementById('loginButton');
  const accountButton = document.getElementById('accountButton');
  if (loginButton) {
    loginButton.classList.add('hidden');
  }
  if (accountButton) {
    accountButton.classList.remove('hidden');
  }
}

function setHeaderForGuest() {
  const loginButton = document.getElementById('loginButton');
  const accountButton = document.getElementById('accountButton');
  if (loginButton) {
    loginButton.classList.remove('hidden');
  }
  if (accountButton) {
    accountButton.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const productListEl = document.getElementById('productList');
  const searchInput = document.getElementById('searchInput');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const cartButton = document.getElementById('cartButton');
  const shopNowBtn = document.getElementById('shopNowBtn');
  const contactForm = document.getElementById('contactForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      state.searchQuery = event.target.value;
      renderProducts(productListEl);
    });
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }

  if (cartButton) {
    cartButton.addEventListener('click', () => {
      if (!state.user) {
        openLoginModal();
      } else {
        openCartModal();
      }
    });
  }

  const loginButton = document.getElementById('loginButton');
  const accountButton = document.getElementById('accountButton');
  const closeLoginModalButton = document.getElementById('closeLoginModal');
  const closeAccountModalButton = document.getElementById('closeAccountModal');
  const closeCartModalButton = document.getElementById('closeCartModal');
  const continueShopping = document.getElementById('continueShopping');

  if (loginButton) {
    loginButton.addEventListener('click', openLoginModal);
  }

  if (accountButton) {
    accountButton.addEventListener('click', openAccountModal);
  }

  if (closeLoginModalButton) {
    closeLoginModalButton.addEventListener('click', closeLoginModal);
  }

  if (closeAccountModalButton) {
    closeAccountModalButton.addEventListener('click', closeAccountModal);
  }

  if (closeCartModalButton) {
    closeCartModalButton.addEventListener('click', closeCartModal);
  }

  if (continueShopping) {
    continueShopping.addEventListener('click', closeCartModal);
  }

  const buyCartButton = document.getElementById('buyCartButton');
  if (buyCartButton) {
    buyCartButton.addEventListener('click', buyCart);
  }

  const loginForm = document.getElementById('loginForm');
  const accountForm = document.getElementById('accountForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const name = document.getElementById('loginName').value.trim();
      if (!email || !name) return;
      state.user = { email, name };
      setHeaderForUser();
      closeLoginModal();
      showCartMessage(`Bienvenido, ${name}. Ahora puedes ver tu carrito.`);
    });
  }

  if (accountForm) {
    accountForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = document.getElementById('accountEmail').value.trim();
      const name = document.getElementById('accountName').value.trim();
      if (!email || !name) return;
      state.user = { email, name };
      closeAccountModal();
      showCartMessage('Datos de cuenta actualizados.');
    });
  }

  if (shopNowBtn) {
    shopNowBtn.addEventListener('click', () => {
      document.querySelector('#productos').scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (contactForm && contactFeedback) {
    contactForm.addEventListener('submit', (event) => handleContactSubmit(event, contactForm, contactFeedback));
  }

  applyDarkModePreference();
  if (productListEl) renderProducts(productListEl);
  renderCartCount();
});
