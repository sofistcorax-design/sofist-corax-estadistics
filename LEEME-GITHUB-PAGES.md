# Sofist Corax — entrega consolidada para GitHub Pages

Esta carpeta contiene la aplicación web y los archivos backend de Firebase. La web pública actual usa GitHub Pages; Firebase se utiliza como backend para Authentication, Firestore y Cloud Functions.

## Antes de sustituir archivos

1. En GitHub, abre el repositorio `sofistcorax-design/sofist-corax-estadistics`.
2. Descarga una copia del repositorio actual o crea una rama de respaldo.
3. Descomprime este paquete en tu computadora.
4. En la raíz del repositorio, sustituye los archivos de la aplicación por los de esta entrega. Conserva la configuración de GitHub del repositorio y no borres ramas ni historial.
5. Comprueba que `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png` y `icon-maskable-512.png` queden directamente en la raíz publicada.
6. Confirma en **Settings → Pages** que la fuente de publicación sigue apuntando a la rama/carpeta que contiene `index.html`.
7. Guarda los cambios con un commit. GitHub Pages publicará la actualización automáticamente.

## Backend Firebase

GitHub Pages no ejecuta Cloud Functions ni aplica reglas de Firestore. Los archivos `firebase.json`, `.firebaserc`, `firestore.rules` y `functions/` se incluyen para administrar el backend por separado.

Antes de desplegar backend, verifica en Firebase Console que el proyecto sea `sofist-corax`, que las funciones estén configuradas para Node.js 20 y que la cuenta administradora autorizada sea la correcta. Sigue el orden de despliegue de `DEPLOYMENT-RUNBOOK-FASE15.md`. No publiques reglas nuevas antes de que el cliente y las funciones compatibles estén desplegados.

No compartas contraseñas, tokens ni claves privadas. No se incluyen credenciales privadas en este paquete.

## Comprobación local

Desde esta carpeta, con Node.js instalado:

```bash
node scripts/verify-project.js
node --check functions/index.js
```

La comprobación local no sustituye las pruebas con Firebase Emulator ni una prueba controlada en el proyecto real.

## Alcance

- Incluye Pick 3, Pick 4, estadísticas, autenticación, chat, respaldo/restauración y recursos PWA presentes en el proyecto.
- No se añadieron nuevas funciones VIP en esta consolidación.
- No se ha publicado nada en GitHub ni desplegado nada en Firebase desde este paquete.
