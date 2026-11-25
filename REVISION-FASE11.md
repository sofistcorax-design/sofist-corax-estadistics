# Sofist Corax — Fase 11: publicación oficial en servidor

## Cambios

- Se añadió la callable `adminPublishDraws` en `functions/index.js`.
- La función exige el custom claim `admin` y correo verificado mediante `requireAdmin`.
- El servidor valida tipo Pick 3/Pick 4, fecha real no futura según la zona horaria de Florida, turno Midday/Evening, longitud exacta del número, Fireball opcional y límites de tamaño.
- La publicación se agrupa por año y se realiza en una única transacción Firestore, conservando sorteos que ya estaban en la nube y el Fireball existente cuando la carga entrante lo deja vacío.
- El navegador ahora llama a `adminPublishDraws`; ya no escribe directamente en `draws` ni `draws4`.
- Las reglas Firestore bloquean escrituras de clientes en ambas colecciones. Las Cloud Functions usan Admin SDK y no dependen de permisos de escritura del cliente.
- El verificador añade pruebas estáticas de seguridad y regresiones de validación/mezcla en servidor.

## Pruebas locales

```bash
node scripts/verify-project.js
node --check functions/index.js
```

Las comprobaciones locales deben pasar antes de integrar la fase.

## Orden de despliegue — obligatorio

Para evitar que la versión actualmente publicada del navegador se quede sin permisos antes de recibir la nueva función:

1. Desplegar primero Cloud Functions (`adminPublishDraws`).
2. Desplegar Hosting con el cliente que invoca esa función.
3. Desplegar Firestore Rules que bloquean las escrituras directas de clientes.

No invertir el orden. No se ha ejecutado ningún despliegue en esta fase.

## Límites

- No se ha probado con Firebase Emulator ni con la base de datos real.
- La publicación multi-año usa una transacción atómica; los límites de tamaño y número de documentos se validan antes de escribir.
- La frecuencia del chat y App Check quedan para fases posteriores.
- El módulo VIP no se ha modificado.
