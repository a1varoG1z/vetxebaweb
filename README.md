# Web oficial · Víctor Echevarría

Sitio estático multipágina para el artista Víctor Echevarría (también conocido como Víctor Etxebarria), preparado para desplegar en GitHub Pages.

## Estructura

- `index.html` → portada
- `obra.html` → página de obra
- `biografia.html` → página de biografía
- `contacto.html` → página de contacto
- `styles.css` → diseño visual
- `script.js` → menú móvil y año automático del footer
- `assets/victor-echevarria-hero.svg` → imagen principal actual
- `.github/workflows/deploy-pages.yml` → despliegue automático en GitHub Pages

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub (por ejemplo: `victor-echevarria-web`).
2. En este directorio, ejecutar:

   ```bash
   git init
   git add .
   git commit -m "Primera versión web de Víctor Echevarría"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/victor-echevarria-web.git
   git push -u origin main
   ```

3. En GitHub, ir a **Settings → Pages** y verificar:
   - **Source**: `GitHub Actions`

4. Esperar a que el workflow termine en la pestaña **Actions**.
5. La web quedará publicada en la URL que muestra GitHub Pages.

## Personalización rápida

- Cambiar textos en `index.html`.
- Reemplazar la imagen principal por una foto real:
  - guardar archivo en `assets/` (por ejemplo `assets/foto-victor.jpg`)
  - actualizar el `src` del `<img>` en `index.html`.
- Ajustar estilo visual en `styles.css`.
