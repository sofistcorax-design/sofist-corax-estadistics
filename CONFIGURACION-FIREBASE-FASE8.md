# Sofist Corax — Configuración Firebase (fase 8)

## Qué se configuró

- Proyecto Firebase predeterminado: `sofist-corax`, coincidente con el `projectId` que ya usa la aplicación.
- Hosting sirve la aplicación desde la raíz del proyecto (`index.html`, `manifest.json`, `sw.js` e iconos).
- Hosting excluye código de Functions, scripts de verificación, reglas, archivos de documentación, archivos ocultos y ZIPs.
- HTML principal y Service Worker reciben cabeceras para evitar que el navegador conserve versiones antiguas. El manifiesto también se revalida.
- Functions usa Node.js 20, que coincide con `functions/package.json`.
- Firestore conserva `firestore.rules` como archivo de reglas.

## Importante antes de publicar

Esta configuración es una propuesta coherente con el `projectId` que ya aparece en `index.html`; no demuestra por sí sola que el sitio Hosting actualmente activo pertenezca a ese proyecto ni que no use un dominio/target distinto. No se ejecutó ningún despliegue.

Antes de desplegar, en la máquina del propietario:

1. Instalar/actualizar Firebase CLI y ejecutar `firebase login`.
2. Ejecutar `firebase projects:list` y confirmar que `sofist-corax` es el proyecto correcto.
3. Ejecutar `firebase hosting:sites:list --project sofist-corax` y confirmar el sitio/dominio activo.
4. Ejecutar `firebase emulators:exec --only firestore,functions ...` con pruebas de reglas antes de publicar cambios de seguridad.
5. Revisar `firebase.json` y `firestore.rules` en un entorno de pruebas.

Despliegues separados, solo después de confirmar el destino:

- Reglas: `firebase deploy --only firestore:rules --project sofist-corax`
- Funciones: `firebase deploy --only functions --project sofist-corax`
- Hosting: `firebase deploy --only hosting --project sofist-corax`

No se deben compartir claves privadas, archivos de cuenta de servicio ni contraseñas. La `apiKey` web que aparece en el frontend es un identificador público de Firebase; la protección real depende de Authentication, reglas y restricciones de API.

## Alcance

Configuración local preparada; no se verificó acceso al proyecto remoto, no se ejecutó Firebase CLI y no se modificó producción. El directorio `public` se establece como `.` porque el `index.html` real y los recursos PWA están en la raíz del proyecto. Los patrones `ignore` evitan publicar el código servidor y documentación.
