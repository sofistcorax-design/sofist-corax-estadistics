# Sofist Corax — Revisión de fase 7

## Protección de historial compartido

Se corrigió `publishDrawCollection()` para evitar borrados destructivos durante la sincronización:

- Ya no elimina documentos anuales de Firestore cuando un año no aparece en el historial local.
- Solo crea o actualiza documentos de años que sí contienen registros válidos.
- Comprueba que exista una sesión autenticada y vuelve a verificar el custom claim `admin` antes de publicar.
- Valida el formato de cada fila, fecha histórica real, tipo de sorteo (`M`/`E`), longitud del número (3 o 4 dígitos según la colección) y Fireball opcional de un dígito.
- Cancela toda la publicación si detecta filas inválidas, en vez de publicar silenciosamente un conjunto parcial.
- Deduplica por fecha y tipo de sorteo antes de agrupar por año.

## PWA

Se incrementó la versión de caché del Service Worker de `sofist-corax-v4` a `sofist-corax-v5` para que la instalación del navegador retire el caché anterior al activar la nueva versión.

## Verificaciones locales

Ejecutar desde la raíz:

```bash
node scripts/verify-project.js
```

La verificación comprueba archivos esenciales, JSON, sintaxis JavaScript, parsers Pick 3/Pick 4, el uso de `persistAll()` en la importación Pick 3 y que la publicación Firestore no elimine años ausentes del almacenamiento local.

## Límites

Esta fase no cambia reglas de Firestore ni configuración de Firebase Hosting. No se ha desplegado a producción ni se han ejecutado pruebas con credenciales reales o Firebase Emulator. La publicación ahora es intencionalmente no destructiva; para borrar un año de datos oficiales debe diseñarse y autorizarse una operación administrativa explícita, separada de la sincronización normal.
