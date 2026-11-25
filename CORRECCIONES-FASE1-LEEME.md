# Sofist Corax — paquete de correcciones Fase 1 (STAGING)

Este paquete es una propuesta de corrección basada en el ZIP y los archivos de configuración/reglas entregados. **No está desplegado en Firebase. No lo publiques directamente en producción.**

## Cambios incluidos

1. `firestore.rules`: reglas alineadas con las colecciones observadas en el frontend (`users`, `community_messages`, `vip_requests`, `draws`). El rol administrativo usa el custom claim `admin: true`, que solo asigna la Cloud Function.
2. `functions/index.js`: las funciones VIP usan la colección real `vip_requests`, estados `pendiente/aprobada/rechazada`, y precios que coinciden con `VIP_CONFIG` del frontend (1500/2000/3000 CUP).
3. `functions/package.json`: copia del manifiesto ubicado en el subdirectorio anidado, colocada en la raíz de `functions`, que es la ruta indicada por `firebase.json`.
4. `index.html`: el cliente reconoce el custom claim `admin: true` y siempre crea perfiles con `role: user`; los permisos reales se derivan del claim firmado, no del documento de perfil.

## Pendientes críticos que NO se han cambiado todavía

- El módulo de resultados declara `db = null` y no se encontró inicialización de esa variable ni lectura activa de `draws`. La sincronización cloud de resultados debe implementarse como una tarea separada, con importación segura y pruebas de migración.
- No hay panel frontend conectado a `adminListVipRequests` / `adminReviewVipRequest`; las funciones quedan alineadas, pero no se ha creado la interfaz administrativa.
- `firebase.json` recibido no incluye bloque `hosting`. Como el sitio ya está publicado, no se inventó una configuración de Hosting ni un `public` directory.
- La carpeta `functions/functions` original se conserva por seguridad; una vez validado el despliegue se puede retirar la copia duplicada.
- Las reglas deben probarse con Firebase Emulator Suite y datos de prueba antes de publicarse.

## Antes de desplegar

1. Haz backup/export de Firestore y conserva el ZIP original.
2. Verifica el proyecto Firebase activo con `firebase use`.
3. Ejecuta pruebas de reglas en Emulator Suite.
4. Instala dependencias desde `functions/` con `npm install`.
5. Despliega primero Functions en un entorno de prueba; luego prueba claims y VIP.
6. Publica las reglas solo después de confirmar que todas las operaciones legítimas siguen funcionando.
7. No ejecutes `firebase deploy --only hosting` con este `firebase.json`: el archivo entregado no define Hosting.

## Importante sobre el administrador

La función `ensureAdminClaim` autoriza una sola dirección de correo codificada en el backend. Cambia `ADMIN_EMAIL` únicamente si el propietario del proyecto lo solicita y verifica la cuenta. El claim `admin` debe actualizarse en el token del usuario (el frontend fuerza la renovación).
