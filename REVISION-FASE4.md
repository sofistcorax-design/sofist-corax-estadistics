# Sofist Corax — Fase 4: limpieza técnica y control de calidad

## Cambios realizados
- Eliminada la antigua ruta de escritura Firestore basada en `db` que permanecía siempre `null` y podía confundir el flujo de persistencia.
- Eliminado el lector `fromSnap` sin uso; la carga de historiales se concentra en el puente Firebase actual.
- Corregida la información de “Acerca de” para indicar Firebase Hosting, no GitHub Pages.
- Se conserva el guardado local inmediato. La publicación compartida de Pick 3/Pick 4 continúa protegida por el custom claim `admin: true` y las reglas Firestore.
- No se amplió ni se modificó el módulo VIP; se conserva el código heredado para no borrar funciones existentes sin autorización.

## Validación local realizada
- `node --check` para scripts clásicos, módulo Firebase y Cloud Functions.
- Validación JSON de `firebase.json`, `functions/package.json` y `manifest.json`.
- Integridad del ZIP comprobada.
- Revisión estática de las rutas de importación, sincronización y calidad de datos.

## Pendiente externo (no simulado)
- Pruebas de reglas con Firebase Emulator Suite.
- Prueba de login/claims con la cuenta administradora autorizada.
- Lectura y publicación de Pick 3/Pick 4 contra Firestore de staging.
- Pruebas de navegador Android/iOS/escritorio y validación de fuentes externas.
- Confirmar la configuración real de Hosting. El `firebase.json` recibido no incluye bloque `hosting`; no se inventó `public` ni se desplegó Hosting.

## Importante
Esta entrega es una versión de staging. Antes de desplegar reglas o funciones, exportar Firestore y confirmar el proyecto Firebase activo. No desplegar Hosting desde este `firebase.json`.
