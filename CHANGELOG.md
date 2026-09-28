# Changelog

### Changed

- `.env`: incluida/actualizada con variables recomendadas: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `DOMAIN`, `PORT`, `STRIPE_PRICE_BASIC`, `STRIPE_PRICE_PREMIUM`, `STRIPE_PRICE_FAMILY`, `ADMIN_TOKEN`.

### Notes

- El proyecto es un demo: usar `ADMIN_TOKEN` y `data/db.json` es solo para desarrollo. Recomendaciones para producción: autenticación real (JWT/sesiones), persistencia en base de datos (Postgres/SQLite), y verificación de firmas webhook con `STRIPE_WEBHOOK_SECRET`.


### Added

- Primera versión demo: servidor Express (`server.js`), vistas básicas (`views/*.ejs`), estilos (`public/styles.css`), assets (`icons/*`), `data/db.json` para persistencia demo, `package.json` con dependencias y scripts, y `.env.example` con variables de entorno.

### Changed

- N/A

### Fixed

- Se corrigio errores en el `checkout`
- Se corrigio las keys
- Se corrigio las ids de los precios

### Added
- Cambios en `.env`

---

### Notes (Seguridad / Producción)

- El proyecto es un demo: el almacenamiento en `data/db.json` y el uso de `ADMIN_TOKEN` como protección son soluciones temporales para demo/local. Recomendaciones:
	- Implementar autenticación (JWT / sesiones) para usuarios y admin.
	- Migrar la persistencia a una base de datos (Postgres / SQLite / similar).
	- Configurar y usar `STRIPE_WEBHOOK_SECRET` en producción para verificar firmas de webhooks.



### Added

- `views/index.ejs`: cambios en la página de inicio — header con enlaces a planes y dashboard, modal de login admin, y enlaces a rutas principales.
- `views/plans.ejs`: listado de planes (Básico, Premium, Familiar) con formularios que envían `POST /create-checkout-session` (campos ocultos `email` y `plan`).
- `views/dashboard.ejs`: panel de usuario que muestra el estado de la suscripción leyendo `data/db.json` por `email` (email, plan, estado, subscriptionId, updatedAt).

### Added

- `views/admin.ejs`: panel admin demo que lista `price ids`, usuarios y permite cancelar suscripciones mediante `POST /admin/cancel-sub`.
- `server.js`: soporte para Checkout (crear sesiones en modo `subscription`), endpoints `GET /success`, `GET /cancel`, `POST /webhook` (manejador de eventos Stripe) y rutas/admin demo (`/admin`, `/admin-login`, `/admin/cancel-sub`).

### Added

- `data/db.json`: almacenamiento demo para usuarios y estado de suscripciones.
- `public/styles.css`: estilos añadidos para layout, hero, grid de planes, modal, cards y reglas responsive.
- `icons/`: adición de `favicon.ico`, `avatar.png`.

### Added
- `icons/`: adición de `logo.png`, `logo-transparente.png`, ajustes en el css para el logo (logo-transparente)
- Cambios en `README.md`
 
---

### 2026-06-14

**Added**
- Tres nuevos servicios añadidos al catálogo: `Reparaciones de electrodomésticos`, `Instalación de sistemas de seguridad`, y `Asesoría en tecnología doméstica`.
- Galerías de imágenes representativas para productos y servicios (URLs Unsplash) en `server.js` y `public/script.js`.
- Botón de eliminación por producto en el modal del carrito (UI + comportamiento) para eliminar items individualmente.
 
**Added**
- Tres nuevos servicios añadidos al catálogo: `Reparaciones de electrodomésticos`, `Instalación de sistemas de seguridad`, y `Asesoría en tecnología doméstica`.
- Galerías de imágenes representativas para productos y servicios (URLs Unsplash) en `server.js` y `public/script.js`.
- Campo `features` agregado a cada producto y mostrado en `views/product.ejs` como "Ventajas del servicio".
- Botón de eliminación por producto en el modal del carrito (UI + comportamiento) — `public/script.js`.
- Botón "Contratar" (buy-now) en tarjetas de producto y botón directo en el hero que generan Checkout (`/create-checkout-session`).
- Endpoint `POST /create-cart-checkout` para iniciar Checkout desde el carrito con múltiples items.
- Login / Account UI (modales) y flujo básico de sesión en frontend para permitir comprar desde el carrito.

**Changed**
- Contador de planes visibles en `views/index.ejs` actualizado a `9`.
- Reemplazo de iconos genéricos por imágenes reales en `public/script.js` y `server.js`.
- Ampliación de `views/product.ejs` para incluir galería y lista de `features`.
- Ajustes de estilo en `public/styles.css`: tamaño compacto del botón de papelera (`.cart-item .btn.icon`) y mejor alineamiento de elementos del modal.
- Refactor en `public/script.js` para: renderizado de productos filtrados, manejo de carrito (`addToCart`, `removeFromCart`), contador y mensajes toast.

**Fixed**
- Corrección de la ruta y renderizado de detalle de producto (`GET /product/:id` y `views/product.ejs`).
- Correcciones en la resolución de `priceId` en `server.js` (soporte para `price_...` y `prod_...`, cache y creación de price por defecto en desarrollo).
- Arreglo en el flujo de checkout desde el carrito y manejo de respuestas del endpoint `POST /create-cart-checkout`.

**Files touched**
- `server.js` — productos ampliados, resolución de `priceId`, nuevos endpoints (`/create-cart-checkout`), y ajustes de seguridad/errores.
- `public/script.js` — catálogo de productos actualizado (imágenes, galerías, features), búsqueda, dark mode, carrito (add/remove/buy), checkout directo y envio de formularios.
- `views/index.ejs` — contador de planes, hero y formularios de checkout directo, modales (login, account, cart).
- `views/product.ejs` — vista detallada con galería y lista de ventajas.
- `public/styles.css` — estilos para modal, carrito y ajuste del botón de papelera.
- `CHANGELOG.md` — entrada ampliada (esta actualización).

**Notes / Recommendations**
- Las imágenes utilizadas son URLs públicas (Unsplash). Para producción, almacenar imágenes propias o usar un CDN/almacenamiento controlado.
- Revisar y configurar correctamente las variables de entorno en `.env` (IDs de precio Stripe, claves secretas) antes de desplegar.

