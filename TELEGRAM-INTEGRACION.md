# Integración Telegram — SOFIST CORAX

## Qué incorpora
- Endpoint HTTPS `telegramResultsWebhook` en Cloud Functions.
- Acepta mensajes reenviados por una persona que contengan evidencia del origen `@boliteros_top_bot` (el texto `Desde: @boliterostop_bot` o el origen reenviado identificado por Telegram).
- Reconoce la fecha, Medio Día/Tarde y Pick 2, 3, 4 y 5.
- Guarda el registro consolidado en `telegram_results/{AAAA-MM-DD}_{M|E}`.
- Sincroniza Pick 3 y Pick 4 con las colecciones históricas `draws` y `draws4` en el formato anual existente.
- Pick 2 y Pick 5 quedan guardados en `telegram_results`; la interfaz actual debe ampliarse aparte para mostrarlos en estadísticas.
- El número posterior al emoji de pelota se conserva en el texto original, pero no se interpreta como Fireball.

## Seguridad
Nunca pegues el token del bot en el código, GitHub, ni en este chat.
El endpoint valida el encabezado `X-Telegram-Bot-Api-Secret-Token` contra el secreto `TELEGRAM_WEBHOOK_SECRET` de Firebase.

Genera una cadena aleatoria larga para el secreto (por ejemplo, 32 bytes aleatorios en un gestor de contraseñas) y guárdala:

```bash
firebase functions:secrets:set TELEGRAM_WEBHOOK_SECRET --project sofist-corax
```

Cuando el CLI lo solicite, pega el secreto. No lo publiques ni lo subas al repositorio.

## Despliegue
Desde la raíz del proyecto, con Firebase CLI autenticado y permisos sobre `sofist-corax`:

```bash
node --check functions/index.js
npm --prefix functions install
firebase deploy --only functions:telegramResultsWebhook --project sofist-corax
```

El despliegue devuelve la URL HTTPS de la función. Copia esa URL.

## Configurar el webhook de Telegram
Sustituye `TOKEN_DEL_BOT` y `URL_DE_LA_FUNCION` localmente; no guardes el comando con el token en un archivo compartido ni lo publiques:

```bash
curl -X POST "https://api.telegram.org/botTOKEN_DEL_BOT/setWebhook" \
  -d "url=URL_DE_LA_FUNCION" \
  -d "secret_token=EL_MISMO_SECRETO_CONFIGURADO_EN_FIREBASE"
```

La respuesta debe indicar `"ok":true`. Comprueba el estado sin compartir el token:

```bash
curl "https://api.telegram.org/botTOKEN_DEL_BOT/getWebhookInfo"
```

## Prueba
1. Abre el chat privado con el bot nuevo y pulsa Iniciar.
2. Reenvía desde ALPHA PLUS un mensaje original de `@boliteros_top_bot`.
3. Verifica en Firestore `telegram_results` que se creó/actualizó el documento.
4. Comprueba que Pick 3 y Pick 4 se añadieron a `draws` y `draws4`.
5. Comprueba que Pick 2 y Pick 5 están en `telegram_results.results`.

## Limitaciones conocidas
- Esta primera integración procesa mensajes reenviados manualmente; no lee por sí sola todo el historial del grupo.
- Si Telegram oculta el origen del mensaje y el texto no incluye `Desde: @boliterostop_bot`, el mensaje se ignora deliberadamente.
- No despliega Hosting ni modifica reglas Firestore.
- Antes de producción, revisar la semántica del número posterior al emoji de pelota y probar con mensajes reales de ambos horarios.
