# Sofist Corax — Fase 13: seguridad del chat y control de frecuencia

## Cambios

- Se añadió la callable `sendCommunityMessage`.
- El servidor exige autenticación con correo verificado y valida el texto (1–500 caracteres) y la respuesta seleccionada.
- El nombre, foto y rol del mensaje se obtienen del perfil y de los claims del usuario; el navegador ya no puede falsificar la insignia de administrador ni publicar mensajes a nombre de otra cuenta.
- Se añadió un límite de un mensaje por usuario cada 1.5 segundos, aplicado en una transacción Firestore con un documento `chat_rate_limits/{uid}`.
- Las respuestas se reconstruyen desde el mensaje original guardado, evitando que el cliente altere el contenido citado.
- Las reglas bloquean la creación directa de mensajes desde clientes; lectura y eliminación conservan los permisos anteriores.
- La interfaz usa la callable y muestra un mensaje específico cuando el servidor pide esperar antes de enviar otro mensaje.

## Pruebas locales

- Sintaxis de scripts y Cloud Functions.
- Verificación estática de que la creación directa del chat está bloqueada.
- Verificación de la callable, identidad autenticada y límite de frecuencia.
- Prueba del umbral de 1.5 segundos con marcas de tiempo simuladas.
- Integridad del historial, respaldo y ZIP.

## Orden de despliegue — obligatorio

1. Desplegar Cloud Functions (`sendCommunityMessage`).
2. Desplegar Hosting con el cliente que invoca la callable.
3. Desplegar Firestore Rules que bloquean la creación directa desde clientes.

No se ha desplegado nada en producción.

## Límites

- No se ha probado en Firebase Emulator ni con varios usuarios reales concurrentes.
- El límite de frecuencia es por cuenta autenticada; no sustituye controles anti-abuso más amplios como Firebase App Check.
- El módulo VIP no se ha modificado.
