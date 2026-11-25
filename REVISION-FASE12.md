# Sofist Corax — Fase 12: respaldo integral y recuperación local

## Cambios

- Se añadió un archivo JSON de respaldo completo que incluye Pick 3 y Pick 4, fecha de exportación, versión del formato y cantidades.
- Se añadió restauración del respaldo completo desde la sección Datos.
- La restauración valida las fechas, modalidad y longitud exacta de los números; conserva ceros iniciales y Fireball.
- La restauración combina el respaldo con los datos locales existentes; no reemplaza ni elimina el historial del dispositivo.
- Tras restaurar, guarda ambas bases en `localStorage` y trata de publicar en la nube mediante la ruta administrativa segura. Si no hay permisos de administrador, conserva la restauración local e informa que no se publicó.
- Se mantienen disponibles las exportaciones CSV/JSON individuales de Pick 3.

## Pruebas locales

- Sintaxis de los scripts JavaScript.
- Verificación estática de botones y estructura del respaldo.
- Prueba de normalización Pick 4 con `0007` y Fireball `5`.
- Pruebas de validación de fecha y fusión de historial en el servidor.
- Integridad del paquete ZIP.

## Límites

- No se ha probado la interacción visual en un navegador real.
- No se ha ejecutado restauración contra Firestore de producción.
- La copia descargada por el usuario es el respaldo independiente recomendado antes de actualizar o cambiar de dispositivo.
- No se modificó el módulo VIP.
