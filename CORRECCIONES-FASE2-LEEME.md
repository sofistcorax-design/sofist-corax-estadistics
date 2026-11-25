# Sofist Corax — Fase 2: sincronización de sorteos

## Qué se incorporó
- Sincronización de Pick 3 desde `draws/{yAAAA}`.
- Sincronización de Pick 4 desde `draws4/{yAAAA}`.
- Lectura de ambos historiales para usuarios con correo verificado.
- Publicación y eliminación en la nube únicamente con el custom claim `admin == true` confirmado por Firebase Authentication.
- Combinación de historial local y nube al iniciar sesión; no se reemplaza el historial local por una descarga parcial.
- Publicación por año y eliminación de documentos de años que ya no existan cuando el administrador ejecuta un borrado explícito.
- Se conserva el guardado local para usuarios normales. Sus importaciones no se convierten en cambios oficiales en Firestore.
- La actualización automática de los resultados comienza después de terminar la primera lectura de Firestore para evitar competir con la carga inicial.

## Estructura Firestore
- `draws/y2026` contiene `rows: ["AAAA-MM-DD|M|123|4", ...]` para Pick 3.
- `draws4/y2026` contiene `rows: ["AAAA-MM-DD|E|1234|", ...]` para Pick 4.
- Cada documento publicado incluye `updatedAt` y `updatedBy`.

## Seguridad
Las reglas agregan `draws4` con el mismo criterio que `draws`: lectura para usuarios verificados y escritura solo para el administrador con custom claim `admin: true`. La función `ensureAdminClaim` de Fase 1 es la única ruta prevista para otorgar ese claim.

## Antes de publicar
1. Revisar que `sofistcorax@gmail.com` sea la cuenta administrativa real y que la función `ensureAdminClaim` esté desplegada.
2. Ejecutar pruebas con Firebase Emulator para Authentication, Firestore Rules y Functions.
3. Probar con una cuenta normal que puede leer, pero no publicar ni borrar datos oficiales.
4. Probar con la cuenta admin la importación, actualización y borrado de Pick 3 y Pick 4.
5. Hacer una copia de seguridad de Firestore antes de desplegar reglas o funciones.

## Limitaciones conocidas
- No se ha desplegado nada en Firebase.
- No se han ejecutado pruebas contra el proyecto Firebase real ni contra Emulator Suite; las comprobaciones realizadas son estáticas y de sintaxis JavaScript.
- La sincronización usa el formato de documentos por año que el código original ya intentaba utilizar para Pick 3. Si la base actual contiene otra estructura, debe migrarse o adaptarse antes de publicar.
- Esta fase no añade todavía una pantalla administrativa para revisar solicitudes VIP.
- `firebase.json` se conserva sin bloque `hosting`; no se debe ejecutar un despliegue de Hosting con esta configuración.
