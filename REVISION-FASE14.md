# Sofist Corax — Fase 14: rendimiento PWA e iconos

## Cambios

- Redimensioné los iconos a sus tamaños reales declarados: 192×192 y 512×512.
- Optimicé los PNG con paleta de 256 colores, conservando el aspecto del logotipo y reduciendo el peso de cada icono.
- Tamaños resultantes aproximados: icono 192 ≈ 13 KB; iconos 512 ≈ 46 KB cada uno (antes cada archivo pesaba aproximadamente 1.4 MB).
- Actualicé la caché del Service Worker a `sofist-corax-v7`.
- Incluí los tres iconos y el manifest en la precarga de la PWA para evitar que la instalación inicial tenga que descargar recursos repetidamente.
- Amplié el verificador para revisar dimensiones, peso y caché de los recursos PWA.

## Pruebas locales

- Sintaxis JavaScript de los scripts y Cloud Functions.
- Validación de dimensiones PNG y límites de tamaño.
- Verificación de recursos precargados en el Service Worker.
- Todas las comprobaciones previas de seguridad, respaldo y sincronización.

## Límites

- No se midió rendimiento real con Lighthouse ni en dispositivos físicos.
- No se probó instalación/actualización PWA en Android o iOS en esta sesión.
- No se desplegó Hosting.
- El módulo VIP no se modificó.
