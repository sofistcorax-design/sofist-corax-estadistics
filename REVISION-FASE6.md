# Sofist Corax — Revisión de fase 6

## Corrección aplicada

- Se eliminó de la importación manual de Pick 3 una ruta heredada que intentaba escribir mediante `db.collection(...)`, aunque la variable `db` ya no existe en la arquitectura Firebase actual.
- La importación ahora utiliza `persistAll()`, el mismo mecanismo de guardado local y publicación protegida por custom claim que utilizan las demás operaciones de Pick 3.
- El mensaje posterior a la importación ya no consulta la variable inexistente ni da a entender que una escritura directa antigua a Firestore se haya realizado.

## Alcance y seguridad

- No se modificaron las reglas de Firestore ni la configuración de Hosting.
- No se alteraron cuentas, datos de producción ni el módulo VIP.
- No se ejecutó ningún despliegue.

## Verificaciones

- Se verificará la sintaxis de los scripts JavaScript embebidos.
- Se comprobará que no queden referencias ejecutables a la variable global `db` antigua.
- Se validarán los JSON y la integridad del ZIP.

## Pendiente externo

La prueba real de Auth/Firestore y el despliegue requieren acceso autorizado al proyecto Firebase y conocer el `firebase.json` real que usa Hosting. No se deben compartir claves privadas ni credenciales de servicio.

## Verificación automatizada añadida

Se añadió `scripts/verify-project.js`, una comprobación local sin dependencias que valida:

- presencia de los archivos principales;
- JSON de configuración y manifiesto;
- sintaxis de todos los bloques JavaScript de `index.html` y de Cloud Functions;
- ausencia de la antigua llamada `db.collection(...)`;
- uso de `persistAll()` en la importación manual de Pick 3.

Ejecución desde la raíz del proyecto:

```bash
node scripts/verify-project.js
```

Resultado en esta revisión: todas las comprobaciones locales pasaron.

También se incorporaron pruebas de regresión de los importadores Pick 3 y Pick 4: conservan ceros iniciales, capturan Fireball y rechazan fechas imposibles o futuras. Estas pruebas pasan con el archivo actual.
