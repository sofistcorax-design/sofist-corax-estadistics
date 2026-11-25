# Sofist Corax — Revisión fase 9

## Objetivo
Evitar pérdida accidental de historial al publicar resultados desde un dispositivo administrador con una copia local incompleta.

## Cambios
- La publicación por año ahora usa transacciones de Firestore (`runTransaction`).
- Antes de escribir, lee el documento anual existente y combina sus filas con las filas locales.
- Conserva sorteos que solo existían en la nube, aunque no estén en el dispositivo que publica.
- Si el registro local no trae Fireball, conserva el Fireball existente para ese mismo día y sorteo.
- Los resultados locales válidos pueden corregir el número anterior; la combinación evita duplicados por fecha y tipo de sorteo.
- No elimina documentos de años que no estén presentes en el historial local.
- Actualiza la versión de caché del Service Worker a `sofist-corax-v6`.
- Añade pruebas de regresión para Pick 3 y Pick 4, ceros iniciales, conservación de Fireball e historial exclusivo de la nube.

## Verificación local
Ejecutar desde la raíz del proyecto:

```bash
node scripts/verify-project.js
node --check functions/index.js
```

Resultado en esta revisión: todas las comprobaciones locales incluidas pasaron.

## Límites
- No se ejecutaron pruebas contra Firebase Emulator ni contra el proyecto de producción.
- No se desplegó Hosting, Firestore Rules ni Cloud Functions.
- La configuración de Hosting de fase 8 publica desde la raíz (`public: "."`) porque `index.html` y los recursos están en esa ubicación en este paquete. Antes de desplegar, confirmar que el sitio de Hosting activo usa este mismo directorio/objetivo y que no existe otro `firebase.json` en el flujo real de publicación.
- No se modificó el módulo VIP.
