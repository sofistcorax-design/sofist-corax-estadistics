# Sofist Corax — entrega técnica y guía de validación

## Estado de esta entrega

Esta carpeta contiene el proyecto completo en staging. No se ha desplegado a Firebase ni se ha conectado a la base de producción. No contiene cambios del módulo VIP.

## Correcciones de esta iteración

- Importación de Pick 3 y Pick 4: ahora rechaza fechas imposibles (por ejemplo, 31 de febrero).
- Pick 3: los registros normalizados deben contener exactamente tres dígitos; no se truncan números mal formados.
- Pick 4: los registros importados deben contener exactamente cuatro dígitos.
- La sincronización de Pick 4 valida las fechas antes de incorporar filas descargadas de Firestore.
- Se añadió `firebase.json` con las rutas de Firestore Rules y Functions que ya se habían proporcionado. No se inventó configuración de Hosting.
- Se incrementó la versión de caché del Service Worker a `sofist-corax-v4`.

## Arquitectura de resultados

- Pick 3: colección `draws`, documentos por año (`yAAAA`), campo `rows`.
- Pick 4: colección `draws4`, documentos por año (`yAAAA`), campo `rows`.
- Los resultados locales se mantienen en `localStorage` (`p3rows` y `p4rows`).
- Usuarios verificados pueden leer los historiales cloud; la publicación/eliminación oficial requiere el custom claim `admin: true`.
- Las importaciones de usuarios normales permanecen locales.

## Pruebas realizadas

- Revisión estática de la estructura y de los puntos de integración.
- Comprobación de sintaxis JavaScript de scripts clásicos, módulo Firebase y Cloud Functions.
- Comprobación JSON de `firebase.json`, `functions/package.json` y `manifest.json`.
- Validación de integridad del ZIP de entrega.

## Pruebas aún necesarias antes de producción

1. Firebase Emulator Suite: reglas de `users`, `community_messages`, `draws` y `draws4` con usuario anónimo, usuario verificado y administrador.
2. Functions: ejecutar `ensureAdminClaim` con la cuenta autorizada y verificar el token renovado.
3. Firestore: probar carga, combinación y borrado de historiales en una base de pruebas, nunca primero en producción.
4. Navegadores: probar Chrome Android, Chrome escritorio y Safari/iOS si se soporta.
5. Fuentes externas: confirmar que los sitios/proxies de resultados responden y que el parser no duplica sorteos.
6. Exportar una copia de Firestore y respaldar el Hosting activo antes de cualquier despliegue.

## Despliegue seguro

Desde esta carpeta, con Firebase CLI autenticado y proyecto confirmado:

```bash
cd functions
npm install
cd ..
firebase use
firebase emulators:start --only auth,firestore,functions
```

Después de aprobar las pruebas en un proyecto de staging, desplegar por separado: `firebase deploy --only firestore:rules` y `firebase deploy --only functions`.

**No ejecutar `firebase deploy --only hosting` con el `firebase.json` de este paquete**: el archivo original entregado no incluía bloque `hosting`, y no se debe adivinar el directorio publicado. La publicación del HTML debe seguir el procedimiento ya utilizado por el propietario del Hosting.

## Nota estadística

Las frecuencias, rachas, atrasos, intervalos, tablas, puntuaciones y simulaciones describen el historial. No hacen que un número tenga más probabilidad matemática en un sorteo futuro.
