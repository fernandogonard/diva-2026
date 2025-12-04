# 🚀 GUÍA DE DEPLOYMENT - HOTEL DIVA 2026

## Estado Actual
✅ **LISTO PARA PRODUCCIÓN**

---

## 📋 OPCIONES DE DEPLOYMENT

### **Opción 1: Vercel (RECOMENDADO) ⭐**

Vercel es óptimo para proyectos Vite porque:
- Deployment automático desde Git
- Aplica automáticamente headers de `vercel.json`
- CDN global incluido
- SSL/HTTPS gratis
- Velocidad optimizada

**Pasos:**
1. Ir a https://vercel.com/new
2. Importar repositorio GitHub
3. Vercel detecta Vite automáticamente
4. Click "Deploy"
5. Configurar dominio: hoteldiva.com.ar

**Archivo importante:** `vercel.json`
- Ya incluye todos los security headers
- CSP, HSTS, X-Frame-Options configurados

---

### **Opción 2: Netlify**

**Pasos:**
1. Ir a https://app.netlify.com/signup
2. Conectar GitHub
3. Seleccionar repositorio
4. Build command: `npm run build`
5. Publish directory: `dist`

**Agregar headers:** Crear `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://wa.me; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
```

---

### **Opción 3: AWS S3 + CloudFront**

Para máximo control y seguridad.

---

## 🔐 SECURITY CHECKLIST PRE-DEPLOYMENT

- [ ] Verificar que `vercel.json` está en root
- [ ] Revisar que `.env` NO está en repositorio (.gitignore)
- [ ] Ejecutar `npm run build` sin errores
- [ ] Verificar que `dist/` se generó correctamente
- [ ] Revisar que no hay console.log en producción
- [ ] Validar que images están optimizadas
- [ ] Confirmar que WhatsApp links usan números correctos: +54 9 223 503-3585

---

## 📊 POST-DEPLOYMENT VERIFICATION

Después de deploy, verificar:

### 1. Security Headers
```bash
# Ejecutar desde terminal
curl -I https://hoteldiva.com.ar/

# Buscar estas headers:
# Content-Security-Policy
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Strict-Transport-Security
```

### 2. SEO Verification
- [ ] Google Search Console: Agregar sitio
- [ ] Verificar robots.txt: https://hoteldiva.com.ar/robots.txt
- [ ] Verificar sitemap.xml: https://hoteldiva.com.ar/sitemap.xml
- [ ] PageSpeed Insights: https://pagespeed.web.dev
- [ ] Móvil: Verificar responsive design

### 3. Functional Testing
- [ ] Todas las secciones cargan
- [ ] WhatsApp links funcionan
- [ ] Lazy loading de imágenes funciona
- [ ] Animations suaves
- [ ] No errores en console del navegador

### 4. Performance Metrics
- [ ] First Contentful Paint (FCP): < 1.5s
- [ ] Largest Contentful Paint (LCP): < 2.5s
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] Lighthouse Score: 90+

---

## 🌍 CONFIGURAR DOMINIO

### 1. Registrar dominio
- GoDaddy, Namecheap, Google Domains, etc.

### 2. Apuntar a Vercel
En el registrador de dominio:

**Nameservers de Vercel:**
```
ns1.vercel.sh
ns2.vercel.sh
```

O usar DNS records:
```
CNAME: hoteldiva.com.ar → cname.vercel.sh
TXT: _acme-challenge.hoteldiva.com.ar → (proporcionado por Vercel)
```

### 3. Configurar en Vercel
1. Ir a Vercel Dashboard
2. Proyecto → Settings → Domains
3. Agregar `hoteldiva.com.ar`
4. Agregar `www.hoteldiva.com.ar` (con redirect a hoteldiva.com.ar)
5. Esperar DNS propagation (5-48 horas)

---

## 📧 EMAIL & CONTACTO

- **Email:** matias@hoteldiva.com.ar
- **WhatsApp:** +54 9 223 503-3585
- **Dirección:** Calle Garay 1630, Mar del Plata, Buenos Aires

---

## 📱 MONITOREO POST-LAUNCH

### Sentry (Error Tracking) - RECOMENDADO
```bash
npm install --save @sentry/react @sentry/tracing
```

En `src/main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
});
```

### Google Analytics
```bash
npm install react-ga4
```

En `src/main.tsx`:
```typescript
import ReactGA from "react-ga4";
ReactGA.initialize(process.env.VITE_GA_ID);
```

### Uptime Monitoring
- UptimeRobot: Monitorear que el sitio está online 24/7
- Set alerts si tiempo de respuesta > 2s

---

## 🔄 CI/CD PIPELINE

Ya configurado en Vercel automáticamente:

1. Push a `main` branch
2. Vercel ejecuta build
3. Tests (si existen)
4. Deploy a staging (automático)
5. Deploy a producción (automático si todo OK)

---

## 📝 COMANDOS ÚTILES

```bash
# Desarrollo local
npm run dev

# Build producción
npm run build

# Preview del build
npm run preview

# Auditar dependencias
npm audit

# Listar tamaño de bundle
npm run build && du -sh dist/

# Limpiar cache
rm -rf node_modules dist .vite
npm install
```

---

## 🆘 TROUBLESHOOTING

### "Security headers no se aplican"
- Verificar que `vercel.json` está en **root** (mismo nivel que package.json)
- Verificar sintaxis JSON válida
- Re-deploy proyecto

### "Imágenes no cargan en producción"
- Verificar que `/public/images/` existe en `dist/`
- Check CORS headers si imágenes vienen de CDN externo
- Usar lazy loading para mejor performance

### "WhatsApp links no funcionan"
- Verificar número: +54 9 223 503-3585
- Probar en desktop primero (WhatsApp Web)
- En móvil, debe estar instalada app WhatsApp

---

## 📞 SOPORTE

**Problemas con deployment:** Contactar a Vercel support
**Problemas de seguridad:** Revisar CSO_SECURITY_AUDIT.md
**Problemas funcionales:** Revisar console.log en navegador

---

**Última actualización:** 4 de Diciembre de 2025  
**Status:** ✅ LISTO PARA DEPLOYMENT SEGURO
