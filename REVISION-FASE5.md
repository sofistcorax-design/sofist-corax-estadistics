# Sofist Corax — Fase 5: correcciones de calidad estadística

## Correcciones
- La detección de resultados idénticos consecutivos ahora analiza Midday y Evening por separado. Antes, al intercalar ambos sorteos en el historial, una repetición real podía pasar inadvertida.
- Los registros inválidos o futuros ya no participan en el cálculo de cobertura ni en la detección de rachas.
- La explicación de probabilidad teórica de tres resultados iguales consecutivos ahora se adapta al formato: Pick 3 (1 entre 1,000,000) y Pick 4 (1 entre 100,000,000).
- La pantalla no afirma que los datos están limpios cuando todavía no existe ningún historial que evaluar.

## Validación
- Sintaxis JavaScript de los scripts embebidos y Cloud Functions.
- JSON de configuración y manifiesto.
- Integridad del ZIP.
- Revisión estática de las funciones de calidad.

## Pendiente
Estas correcciones no sustituyen pruebas reales de interfaz ni las pruebas de Firestore Emulator. No se ha desplegado nada en Firebase.
- Se retiró del paquete de Functions una copia HTML y un `package.json` anidados que no forman parte del punto de entrada de Cloud Functions; se conserva el `functions/package.json` correcto junto a `functions/index.js`.
