# Plataforma de suscripciones (demo)

Demo minimalista de una plataforma de suscripción recurrente para un servicio de Internet. Usa Node.js + Express + Stripe (Checkout + Webhooks). Incluye:

- Páginas públicas con planes
- Checkout de Stripe para crear suscripciones
- Webhook para recibir eventos y actualizar estado (almacenado en JSON para demo)
- Panel de usuario simple para ver el estado de la suscripción

Requisitos:
- Node.js 18+
- Cuenta de Stripe (modo test)
- Stripe CLI (para reenviar webhooks en local)

Instalación rápida:

1. Copia `.env.example` a `.env` y rellena `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `DOMAIN` y los price IDs (ver pasos siguientes).
2. Instala dependencias:

```powershell
npm install
```

3. Inicia la app:

```powershell
npm start
```


Crear los price IDs en tu Stripe Dashboard:

1. Entra a https://dashboard.stripe.com/
2. Ve a Productos -> "Añadir producto" y crea un producto para cada plan (ej. "Plan Básico").
3. Dentro del producto, crea un precio (Price) recurrente mensual y guarda el `price_id` que genera Stripe (ej: `price_1NabcXYZ...`).
4. Añade los price_id al archivo `.env` usando las claves:

```properties
STRIPE_PRICE_BASIC=price_1Nabc...
STRIPE_PRICE_PREMIUM=price_1Ndef...
STRIPE_PRICE_FAMILY=price_1Nghi...
```

5. En otra terminal, usa Stripe CLI para reenviar webhooks (ejemplo):

```powershell
stripe listen --forward-to localhost:4242/webhook
```

5. Abrir en el navegador: `http://localhost:4242`

Panel admin (demo):

- En `.env` añade `ADMIN_TOKEN` (puedes copiarlo desde `.env.example` y cambiarlo). Este token se usa para proteger el panel admin de manera sencilla.
- Accede a `http://localhost:4242/admin` enviando el header HTTP `x-admin-token: <ADMIN_TOKEN>`. En el navegador puedes pasar el token como query `?admin_token=...` (solo para pruebas locales):

	`http://localhost:4242/admin?admin_token=changeme_admin_token`

El panel permite ver los price IDs configurados, listar usuarios y cancelar una suscripción (esto invoca la API de Stripe y actualiza el `data/db.json`).

Notas:
- En este demo los datos se guardan en `data/db.json` (formato muy simple). Para producción usar una base de datos real y autenticación.
- Stripe se encarga de la renovación automática; nuestro webhook actualiza el estado cuando hay pagos exitosos.

Siguientes pasos recomendados:
- Añadir autenticación (JWT / sesiones)
- Persistencia real (Postgres / SQLite)
- Panel admin para gestionar planes y ver facturación (hecho)
- Tests automáticos

## Cambios recientes

- **Vistas:** se añadieron las plantillas `views/index.ejs`, `views/plans.ejs`, `views/admin.ejs` y `views/dashboard.ejs` para la página pública, el listado de planes, el panel admin y el panel de usuario respectivamente.
- **Servidor:** `server.js` contiene la aplicación Express con rutas públicas, endpoints de Stripe (Checkout + Webhooks) y rutas de administración (demo).
- **Persistencia demo:** `data/db.json` usado como almacenamiento simple para usuarios y estado de suscripciones (solo para demostración).
- **Estilos públicos:** `public/styles.css` con estilos básicos para la interfaz.
- **Iconos:** carpeta `icons/` con logos e íconos (`logo.png`, `logo-transparente.png`, `favicon.ico`, `avatar.png`).
- **Configuración:** `.env.example` proporcionado para variables de entorno y `.gitignore` para exclusiones comunes.
- **Dependencias y scripts:** `package.json` incluye dependencias y el script `npm start` para levantar la app.

Nota: Esta lista refleja el estado actual del proyecto (archivos presentes). Si quieres entradas más específicas (fechas, autor, descripción de cambios por commit), dime y las añado.
