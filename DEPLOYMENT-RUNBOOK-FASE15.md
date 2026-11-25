# Sofist Corax — Fase 15: preparación y procedimiento de publicación

## Estado de esta fase

La aplicación queda preparada como candidata de publicación, pero **no se ha desplegado**. El proyecto tiene un `firebase.json` con Hosting en `public: "."` y `.firebaserc` apunta a `sofist-corax`; aun así, no se conoce desde los archivos si el sitio Hosting activo usa el sitio predeterminado o un target personalizado. Confirmar el destino en Firebase Console antes de publicar Hosting.

## Antes de empezar

1. Desde la aplicación activa, descarga el respaldo completo Pick 3 + Pick 4 y guárdalo fuera del teléfono.
2. Confirma en Firebase Console que el proyecto es `sofist-corax`.
3. En Hosting, confirma el ID del sitio y si corresponde al destino predeterminado `sofist-corax.web.app` o a un target distinto.
4. Confirma que la cuenta administradora puede iniciar sesión y tiene el custom claim `admin: true`.
5. En un entorno local con Node.js 20 y Firebase CLI autenticado, ejecuta:

```bash
node scripts/verify-project.js
node --check functions/index.js
npm --prefix functions install
```

No continúes si alguna comprobación falla.

## Orden de despliegue obligatorio

### 1. Cloud Functions nuevas

Desplegar solo las funciones que necesita el cliente nuevo; no desplegar funciones VIP:

```bash
firebase deploy --only functions:ensureAdminClaim,functions:adminPublishDraws,functions:sendCommunityMessage --project sofist-corax
```

Comprueba que las tres funciones aparecen desplegadas y activas antes de continuar.

### 2. Hosting

Si el sitio activo es el sitio predeterminado del proyecto:

```bash
firebase deploy --only hosting --project sofist-corax
```

Si Hosting utiliza un target personalizado, sustituye `hosting` por `hosting:NOMBRE_DEL_TARGET` después de confirmar el target real. No adivines ni crees un target nuevo.

### 3. Reglas Firestore — siempre al final

```bash
firebase deploy --only firestore:rules --project sofist-corax
```

Las reglas nuevas bloquean la creación directa de mensajes y las escrituras directas de sorteos. Las nuevas versiones del cliente ya usan Cloud Functions para esas operaciones. Publicar las reglas antes de Hosting puede interrumpir las versiones antiguas todavía abiertas en los navegadores.

## Pruebas después de publicar

- Iniciar sesión con una cuenta verificada normal: debe poder leer estadísticas y comunidad.
- Intentar publicar sorteos con una cuenta normal: debe rechazarse.
- Con la cuenta administradora: publicar un resultado de prueba válido en Pick 3 y Pick 4.
- Confirmar que el historial antiguo sigue visible y que los ceros iniciales se conservan.
- Enviar dos mensajes seguidos desde una misma cuenta: el servidor debe aplicar el límite de frecuencia.
- Probar responder a un mensaje y eliminar un mensaje propio.
- Instalar/abrir la PWA y comprobar que la versión nueva se carga.

## Plan de reversión

- Si falla el despliegue de Functions, detenerse; no publicar Hosting ni reglas.
- Si falla Hosting, no publicar reglas; la versión anterior seguirá usando las reglas actuales.
- Si después de publicar reglas se necesita volver al cliente antiguo, primero restaurar las reglas anteriores compatibles con ese cliente y luego revertir Hosting.
- No borrar colecciones ni documentos de Firestore durante una reversión.
- Mantener el respaldo completo descargado antes de empezar.

## Alcance excluido

- No se despliegan ni se modifican funciones, pantallas, reglas o datos VIP.
- No se cambian API keys, contraseñas, cuentas ni credenciales del proyecto.
- No se publica desde este entorno.
