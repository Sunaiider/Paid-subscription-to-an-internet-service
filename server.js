require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const DOMAIN = process.env.DOMAIN || 'http://localhost:4242';
const PORT = process.env.PORT || 4242;

// Capturar errores globales para evitar que el proceso muera sin traza
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason && reason.stack ? reason.stack : reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});

// Price IDs (crear en Stripe Dashboard -> Productos -> Precios)
const PRICES = {
  basic: process.env.STRIPE_PRICE_BASIC,
  premium: process.env.STRIPE_PRICE_PREMIUM,
  family: process.env.STRIPE_PRICE_FAMILY,
  gamer: process.env.STRIPE_PRICE_GAMER,
  professional: process.env.STRIPE_PRICE_PROFESSIONAL,
  empresarial: process.env.STRIPE_PRICE_EMPRESARIAL,
  service1: process.env.STRIPE_PRICE_SERVICE1,
  service2: process.env.STRIPE_PRICE_SERVICE2,
  service3: process.env.STRIPE_PRICE_SERVICE3,
};

const products = [
  {
    id: 'plan-1',
    name: 'Plan Básico Hogar',
    description: 'Velocidad estable para navegación, redes sociales y trabajo remoto.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    plan: 'basic',
    priceId: process.env.STRIPE_PRICE_BASIC,
    details: 'Con velocidad suficiente para los usos cotidianos del hogar. Excelente relación precio y fiabilidad.',
    features: [
      'Soporte técnico local incluido',
      'Ideal para hasta 3 dispositivos simultáneos',
      'Conexión estable para navegación y trabajo remoto'
    ],
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
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    plan: 'premium',
    priceId: process.env.STRIPE_PRICE_PREMIUM,
    details: 'Optimizado para entretenimiento, video y plataformas de streaming con alta calidad de reproducción.',
    features: [
      'Reproducción de video en alta definición',
      'Soporte para streaming simultáneo',
      'Baja latencia en videollamadas'
    ],
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
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    plan: 'family',
    priceId: process.env.STRIPE_PRICE_FAMILY,
    details: 'Diseñado para familias con varios dispositivos conectados al mismo tiempo y uso mixto de internet.',
    features: [
      'Prioridad en tráfico para varios dispositivos',
      'Cobertura para hogares medianos',
      'Soporte para tablets, computadoras y TV'
    ],
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
    priceId: process.env.STRIPE_PRICE_PREMIUM,
    details: 'Nuestros técnicos certificados diagnosticaron y reparan tus electrodomésticos con piezas de calidad y garantía local.',
    features: [
      'Diagnóstico a domicilio rápido y efectivo',
      'Reparación con piezas de repuesto disponibles',
      'Garantía de servicio local durante 30 días'
    ],
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
    priceId: process.env.STRIPE_PRICE_FAMILY,
    details: 'Diseñamos e instalamos un sistema de seguridad adaptado a tu hogar, con monitoreo básico y asesoría de uso.',
    features: [
      'Instalación segura y ordenada de cámaras y sensores',
      'Configuración inicial de alertas y monitoreo',
      'Asesoría sobre mejores puntos de cobertura'
    ],
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
    priceId: process.env.STRIPE_PRICE_BASIC,
    details: 'Te ayudamos a elegir equipos, conectar dispositivos y optimizar tu red para un hogar más inteligente.',
    features: [
      'Selección de dispositivos inteligente según tu presupuesto',
      'Configuración y conexión paso a paso',
      'Consejos para automatización y seguridad doméstica'
    ],
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
    priceId: process.env.STRIPE_PRICE_empresarial,
    details: 'Soporte premium y ancho de banda para soluciones de trabajo remoto y herramientas en la nube.',
    features: [
      'Soporte técnico especializado para empresas',
      'Conexión estable para videoconferencias y herramientas en la nube',
      'Uso eficiente de ancho de banda para equipos de trabajo'
    ],
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
    priceId: process.env.STRIPE_PRICE_GAMER,
    details: 'Pensado para gamers que exigen conexiones rápidas y estables con mínima latencia.',
    features: [
      'Baja latencia para juegos en línea',
      'Conexión estable durante horas de juego',
      'Optimizado para streaming de videojuegos'
    ],
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
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL,
    details: 'Una opción equilibrada para profesionales y estudiantes que demandan ancho de banda constante.',
    features: [
      'Conexión confiable para trabajos remotos',
      'Optimizado para videoconferencias y archivos grandes',
      'Soporte estable durante jornada laboral'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    ]
  }
];
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

// Cache para evitar llamadas repetidas a la API de Stripe en runtime
const resolvedPriceCache = {};
// Mapa temporal para encadenar checkouts (token -> url). Expiran automáticamente.
const pendingNextCheckouts = {};
function setPendingNext(token, url, ttlMs = 10 * 60 * 1000) {
  pendingNextCheckouts[token] = { url, expires: Date.now() + ttlMs };
  setTimeout(() => { if (pendingNextCheckouts[token] && pendingNextCheckouts[token].expires <= Date.now()) delete pendingNextCheckouts[token]; }, ttlMs + 1000);
}

// Resolver price_id: acepta tanto price_... como prod_... (producto).
// Si se recibe prod_..., intenta reutilizar un price mensual existente; si no existe, crea uno con importe por defecto.
async function resolvePriceId(planKey, options = {}) {
  const raw = PRICES[planKey];
  if (!raw) return null;
  const mode = options.mode === 'payment' ? 'payment' : 'subscription';
  const cacheKey = raw.startsWith('prod_') ? `${raw}:${mode}` : raw;
  if (resolvedPriceCache[cacheKey]) return resolvedPriceCache[cacheKey];

  try {
    if (raw.startsWith('price_')) {
      resolvedPriceCache[raw] = raw;
      return raw;
    }

    if (raw.startsWith('prod_')) {
      // buscar precios existentes para ese producto
      const list = await stripe.prices.list({ product: raw, limit: 50 });
      const oneTime = list.data.find(p => !p.recurring && p.active);
      const monthly = list.data.find(p => p.recurring && p.recurring.interval === 'month' && p.active);
      if (mode === 'payment' && oneTime) {
        resolvedPriceCache[cacheKey] = oneTime.id;
        return oneTime.id;
      }
      if (mode === 'subscription' && monthly) {
        resolvedPriceCache[cacheKey] = monthly.id;
        return monthly.id;
      }

      // crear un precio por defecto según el plan
      const defaultAmounts = { basic: 2000, premium: 4000, family: 6000 };
      const amount = defaultAmounts[planKey] || 2000;
      const created = await stripe.prices.create({
        unit_amount: amount,
        currency: 'usd',
        ...(mode === 'subscription' ? { recurring: { interval: 'month' } } : {}),
        product: raw,
      });
      resolvedPriceCache[cacheKey] = created.id;
      return created.id;
    }

    // no reconocido
    return null;
  } catch (err) {
    console.error('Error resolviendo price id para', raw, err && err.message ? err.message : err);
    return null;
  }
}

if (!STRIPE_SECRET_KEY) {
  console.error('Falta STRIPE_SECRET_KEY en .env');
}

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
// Servir carpeta de iconos para que el favicon/shortcut icon esté disponible en /icons/...
app.use('/icons', express.static(path.join(__dirname, 'icons')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Responder directamente a /favicon.ico con el avatar (algunos navegadores solicitan /favicon.ico)
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'icons', 'avatar.png'));
});

const DB_PATH = path.join(__dirname, 'data', 'db.json');
function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH));
  } catch (err) {
    return { users: [] };
  }
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.render('index', { products });
});

app.get('/product/:id', (req, res) => {
  const productId = req.params.id.trim();
  const product = products.find(item => item.id === productId);
  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('product', { product });
});

app.get('/plans', async (req, res) => {
  try {
    const productsForView = await Promise.all(products.map(async (p) => {
      // Priorizar price ID desde .env (PRICES) si está definido para el plan,
      // si no, usar el priceId presente en el objeto product si existe.
      let resolvedPrice = null;
      if (PRICES[p.plan]) {
        resolvedPrice = await resolvePriceId(p.plan);
      } else if (p.priceId) {
        resolvedPrice = p.priceId;
      }
      return Object.assign({}, p, { priceId: resolvedPrice });
    }));

    res.render('plans', { products: productsForView, prices: PRICES });
  } catch (err) {
    console.error('Error preparando vista de planes', err && err.stack ? err.stack : err);
    res.render('plans', { products, prices: PRICES });
  }
});

// API para devolver los productos con priceId resuelto (usado por frontend)
app.get('/api/products', async (req, res) => {
  try {
    const productsForView = await Promise.all(products.map(async (p) => {
      let resolvedPrice = null;
      if (PRICES[p.plan]) {
        resolvedPrice = await resolvePriceId(p.plan);
      } else if (p.priceId) {
        resolvedPrice = p.priceId;
      }
      return Object.assign({}, p, { priceId: resolvedPrice });
    }));
    res.json({ products: productsForView });
  } catch (err) {
    console.error('Error en /api/products', err && err.stack ? err.stack : err);
    res.status(500).json({ error: 'Error preparando productos' });
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const { plan, email, price_id, mode } = req.body;
  const checkoutMode = mode === 'payment' ? 'payment' : 'subscription';
  const planKey = plan || 'basic';
  const rawPriceId = price_id || PRICES[planKey];
  let resolvedPriceId = null;
  let fallbackPriceData = null;

  if (rawPriceId) {
    resolvedPriceId = rawPriceId.startsWith('price_')
      ? rawPriceId
      : await resolvePriceId(planKey, { mode: checkoutMode });
  }

  if (!resolvedPriceId) {
    const defaultAmounts = {
      basic: 2000,
      premium: 4000,
      family: 6000,
      empresarial: 5000,
      gamer: 3500,
      professional: 4500,
      service1: 5500,
      service2: 6500,
      service3: 4000
    };
    const amount = defaultAmounts[planKey] || 2000;
    const name = planKey.startsWith('service') ? 'Servicio puntual' : `Plan ${planKey}`;
    fallbackPriceData = {
      currency: 'usd',
      product_data: { name },
      unit_amount: amount,
      ...(checkoutMode === 'subscription' ? { recurring: { interval: 'month' } } : {})
    };
  }

  try {
    // Si el precio original vino como prod_ y aún no se resolvió, intentar resolverlo de nuevo con el modo correcto
    if (!resolvedPriceId && rawPriceId && rawPriceId.startsWith('prod_')) {
      resolvedPriceId = await resolvePriceId(planKey, { mode: checkoutMode });
    }

    const lineItem = resolvedPriceId
      ? { price: resolvedPriceId, quantity: 1 }
      : { price_data: fallbackPriceData, quantity: 1 };

    const session = await stripe.checkout.sessions.create({
      mode: checkoutMode,
      payment_method_types: ['card'],
      line_items: [lineItem],
      customer_email: email,
      success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/cancel`
    });

    res.redirect(303, session.url);
  } catch (err) {
    console.error('Stripe checkout error', err);
    res.status(500).send('Error creando Checkout Session');
  }
});

app.post('/create-cart-checkout', async (req, res) => {
  const { email, items } = req.body;
  if (!email || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Datos de carrito inválidos.' });
  }

  try {
    // Separar items por tipo: services -> pago puntual; otros -> suscripción
    const paymentItems = [];
    const subscriptionItems = [];
    items.forEach(it => {
      const planKey = it.plan || '';
      if (/^service/i.test(planKey)) paymentItems.push(it);
      else subscriptionItems.push(it);
    });

    const defaultAmounts = {
      basic: 2000,
      premium: 4000,
      family: 6000,
      empresarial: 5000,
      gamer: 3500,
      professional: 4500,
      service1: 5500,
      service2: 6500,
      service3: 4000
    };

    async function buildLineItem(item, mode) {
      let priceId = item.price_id;
      const planKey = item.plan || '';

      if (priceId && priceId.startsWith('prod_')) {
        priceId = await resolvePriceId(planKey, { mode });
      }

      if (priceId && priceId.startsWith('price_')) {
        return { price: priceId, quantity: item.quantity || 1 };
      }

      // fallback price_data
      const amount = defaultAmounts[planKey] || 2000;
      return {
        price_data: {
          currency: 'usd',
          product_data: { name: planKey.startsWith('service') ? 'Servicio puntual' : `Plan ${planKey}` },
          unit_amount: amount,
          ...(mode === 'subscription' ? { recurring: { interval: 'month' } } : {})
        },
        quantity: item.quantity || 1
      };
    }

    // Si hay ambos tipos, crear la sesión payment primero y luego la subscription
    if (subscriptionItems.length > 0 && paymentItems.length > 0) {
      // crear sesión payment (segunda que se quiere ejecutar)
      const paymentLineItems = await Promise.all(paymentItems.map(i => buildLineItem(i, 'payment')));
      const paymentSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: paymentLineItems,
        customer_email: email,
        success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/cancel`
      });

      // almacenar URL de payment en token temporal para redirigir después de la subscripción
      const crypto = require('crypto');
      const token = crypto.randomBytes(8).toString('hex');
      setPendingNext(token, paymentSession.url);

      // crear sesión subscription que al completar redirige al pago puntual
      const subscriptionLineItems = await Promise.all(subscriptionItems.map(i => buildLineItem(i, 'subscription')));
      const subscriptionSession = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: subscriptionLineItems,
        customer_email: email,
        success_url: `${DOMAIN}/continue-checkout?next=${token}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/cancel`
      });

      return res.json({ urls: [
        { type: 'subscription', url: subscriptionSession.url },
        { type: 'payment', url: paymentSession.url }
      ] });
    }

    // Caso normal: solo subscription o solo payment
    const createdUrls = [];
    if (subscriptionItems.length > 0) {
      const lineItems = await Promise.all(subscriptionItems.map(i => buildLineItem(i, 'subscription')));
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: lineItems,
        customer_email: email,
        success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/cancel`
      });
      createdUrls.push(session.url);
    }

    if (paymentItems.length > 0) {
      const lineItems = await Promise.all(paymentItems.map(i => buildLineItem(i, 'payment')));
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: lineItems,
        customer_email: email,
        success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/cancel`
      });
      createdUrls.push(session.url);
    }

    if (createdUrls.length === 1) return res.json({ url: createdUrls[0] });
    return res.json({ urls: createdUrls });
  } catch (err) {
    console.error('Stripe cart checkout error', err && err.stack ? err.stack : err);
    res.status(500).json({ error: 'Error creando sesión de pago del carrito.' });
  }
});

app.get('/success', async (req, res) => {
  const sessionId = req.query.session_id;
  if (!sessionId) return res.send('No session_id');
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(`<h2>Pago completado</h2><p>Gracias ${session.customer_email}. Puedes ver tu panel <a href="/dashboard?email=${session.customer_email}">aquí</a>.</p>`);
  } catch (err) {
    res.status(500).send('Error retrieving session');
  }
});

// Ruta intermedia para encadenar checkouts: redirige a la URL almacenada para el token
app.get('/continue-checkout', (req, res) => {
  const token = req.query.next;
  if (!token) return res.status(400).send('Token requerido');
  const entry = pendingNextCheckouts[token];
  if (!entry) return res.status(404).send('Enlace de continuación no encontrado o expirado.');
  // borrar el token y redirigir
  delete pendingNextCheckouts[token];
  // redirigir directamente a la URL de la sesión siguiente
  return res.redirect(entry.url);
});

app.get('/cancel', (req, res) => res.send('<h2>Pago cancelado</h2>'));

app.get('/dashboard', (req, res) => {
  const email = req.query.email;
  const db = readDB();
  const user = db.users.find(u => u.email === email);
  res.render('dashboard', { user, email });
});

// --- Admin middleware + routes (demo protection mediante x-admin-token header) ---
function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.admin_token;
  if (!ADMIN_TOKEN) return res.status(403).send('Admin token no configurado.');
  if (!token || token !== ADMIN_TOKEN) return res.status(401).send('No autorizado (admin token incorrecto).');
  next();
}

app.get('/admin', adminAuth, (req, res) => {
  const db = readDB();
  res.render('admin', { db, prices: PRICES });
});

app.post('/admin/cancel-sub', adminAuth, async (req, res) => {
  const { subscriptionId } = req.body;
  if (!subscriptionId) return res.status(400).json({ ok: false, error: 'subscriptionId requerido' });
  try {
    // Cancelar suscripción en Stripe
    await stripe.subscriptions.del(subscriptionId);

    // Actualizar DB local
    const db = readDB();
    const user = db.users.find(u => u.subscriptionId === subscriptionId);
    if (user) {
      user.status = 'canceled';
      user.updatedAt = new Date().toISOString();
      writeDB(db);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Error cancelando suscripción', err && err.stack ? err.stack : err);
    res.status(500).json({ ok: false, error: err && err.message ? err.message : 'error' });
  }
});

// Login simple desde el index: recibe una contraseña y si coincide con ADMIN_TOKEN
// renderiza la vista de admin (evita pasar el token en la URL). Esto es para demo/local only.
app.post('/admin-login', (req, res) => {
  const password = req.body.password;
  if (!ADMIN_TOKEN) return res.status(403).send('Admin token no configurado.');
  if (!password) return res.status(400).send('Contraseña requerida.');

  if (password === ADMIN_TOKEN) {
    const db = readDB();
    return res.render('admin', { db, prices: PRICES });
  }

  // en caso de fallo, mostrar un mensaje simple
  return res.status(401).send('Contraseña incorrecta.');
});

// Webhook endpoint: must use raw body
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    if (STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } else {
      // Si no hay webhook secret, parsear sin verificar (solo para pruebas locales muy controladas)
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Webhook recibida:', event.type);
  const db = readDB();

  // Manejar eventos relevantes
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const subscriptionId = session.subscription;
    // Guardar usuario
    const now = new Date().toISOString();
    let user = db.users.find(u => u.email === email);
    if (!user) {
      user = { email, plan: 'unknown', subscriptionId, status: 'active', updatedAt: now };
      db.users.push(user);
    } else {
      user.subscriptionId = subscriptionId;
      user.status = 'active';
      user.updatedAt = now;
    }
    writeDB(db);
  }

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    const subscriptionId = invoice.subscription;
    const user = db.users.find(u => u.subscriptionId === subscriptionId);
    if (user) {
      user.status = 'active';
      user.updatedAt = new Date().toISOString();
      writeDB(db);
    }
  }

  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object;
    const subscriptionId = invoice.subscription;
    const user = db.users.find(u => u.subscriptionId === subscriptionId);
    if (user) {
      user.status = 'past_due';
      user.updatedAt = new Date().toISOString();
      writeDB(db);
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object;
    const user = db.users.find(u => u.subscriptionId === sub.id);
    if (user) {
      user.status = 'canceled';
      user.updatedAt = new Date().toISOString();
      writeDB(db);
    }
  }

  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}. Abrir ${DOMAIN}`);
  if (!STRIPE_WEBHOOK_SECRET) console.log('Advertencia: STRIPE_WEBHOOK_SECRET no configurado. Se omitirá la verificación de firma (solo para pruebas locales).');
});
