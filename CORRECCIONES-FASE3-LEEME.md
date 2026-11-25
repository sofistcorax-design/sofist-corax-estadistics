# Sofist Corax — Fase 3: explicaciones estadísticas fáciles

## Qué se incorporó
- Se añadió una guía sencilla para la sección **Intervalos A–D**: A (00–25), B (26–50), C (51–75) y D (76–99).
- Se añadió una guía sencilla para la sección **10 Tablas**.
- Se mejoró la explicación de **Intervalos entre apariciones**, aclarando qué se mide y por qué un número atrasado no tiene más probabilidad de salir.
- Se mantuvieron las explicaciones fáciles ya existentes para **Rachas**, **Estabilidad** y **Patrones**.
- No se modificaron los cálculos estadísticos ni la estructura de Firestore en esta fase.
- Se omitió el trabajo de VIP, según la indicación del usuario.

## Comprobaciones
- Se ejecutó `node --check` sobre los scripts JavaScript incrustados en `index.html`: sin errores de sintaxis.
- No se ejecutaron pruebas visuales en navegador ni pruebas de datos reales.
- No se desplegó en Firebase Hosting ni en Firestore.

## Recomendación
Probar la app en una copia o entorno de pruebas antes de sustituir archivos de producción. Conservar una copia de seguridad de la versión publicada y de Firestore.
