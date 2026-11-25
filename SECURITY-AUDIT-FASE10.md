# Sofist Corax — Auditoría de seguridad, fase 10

## Alcance
Revisión estática de autenticación, custom claims, reglas Firestore, perfiles, comunidad, acceso a sorteos y configuración de publicación. No se modificó el módulo VIP ni se desplegó ningún recurso.

## Resultado de la revisión

- Las reglas exigen sesión con correo verificado para los perfiles, comunidad y lectura de sorteos.
- El privilegio administrativo se basa en el custom claim `admin == true`; no se confía en el campo `role` del perfil para autorizar operaciones.
- La función `ensureAdminClaim` valida sesión, correo verificado y una dirección de correo autorizada antes de establecer el custom claim mediante Firebase Admin SDK.
- El usuario no puede cambiar su propio `role` en el documento de perfil.
- La creación de mensajes exige que el `uid` coincida con el usuario autenticado y limita el tamaño del texto.
- Las escrituras oficiales de Pick 3 y Pick 4 requieren el custom claim administrativo.
- La regla final deniega lectura y escritura en colecciones que no estén declaradas expresamente.

## Riesgos y límites pendientes

1. **Sin prueba de emulador:** no está instalado/configurado Firebase CLI ni Firestore Emulator en este entorno. La revisión de reglas es estática y no demuestra el comportamiento del motor de reglas en ejecución.
2. **App Check:** no se ha activado porque requiere registrar y verificar la aplicación en Firebase Console; activarlo sin completar ese paso puede bloquear clientes legítimos.
3. **Frecuencia del chat:** la interfaz aplica una pausa entre mensajes, pero un cliente modificado puede omitirla. Las reglas actuales no implementan rate limiting robusto por usuario.
4. **Permisos administrativos:** la cuenta autorizada y el estado de custom claims deben verificarse en Firebase Console antes de producción. No se han alterado cuentas ni credenciales.
5. **Documentos de sorteos:** las reglas autorizan al administrador a escribir en `draws` y `draws4`; la validación detallada de cada fila también se ejecuta en el cliente antes de publicar, pero un cliente administrador comprometido podría escribir directamente mediante SDK. Una futura fase puede trasladar la publicación exclusivamente a una Cloud Function validada en servidor.

## Verificación local

Ejecutar:

```bash
node scripts/verify-project.js
node --check functions/index.js
```

El verificador ahora comprueba además invariantes estáticas de seguridad: claim administrativo, correo verificado, inmutabilidad del rol, UID del autor, lectura y escritura de sorteos y regla de denegación general.

## Decisión de despliegue

**No desplegar todavía.** Antes se debe ejecutar la suite contra Firebase Emulator y revisar los datos/índices existentes del proyecto. Esta fase no cambia `firestore.rules`, `functions/index.js`, credenciales ni Hosting: evita introducir una modificación de seguridad no probada en una aplicación activa.
