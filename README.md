# Mi Tablero de Voz

Tablero de comunicación (AAC) con iconos, texto libre y texto-a-voz.
Instalable como app (PWA) y funciona sin conexión salvo el modo de voz clonada.

## Funciones

- Iconos organizados por categoría con pestañas, más buscador.
- Favoritos y recientes para acceso rápido a lo que más se usa.
- Cada icono habla al tocarlo y se añade a una frase que se puede ampliar.
- Botón "Repetir" para volver a escuchar lo último dicho.
- Voz del sistema (offline, gratis) o voz clonada vía ElevenLabs (requiere
  internet y clave de API propia).
- Descarga del audio generado con la voz clonada.
- Copia de seguridad: exportar/importar iconos personalizados y ajustes
  como archivo `.json`.
- Instalable en Android/iOS/escritorio como app independiente (PWA), con
  icono propio y funcionamiento offline del tablero.

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm install
npm run build
```

Genera `dist/` con los archivos estáticos, el manifest de la PWA y el
service worker.

## Publicar en Render.com

**Opción A — Blueprint automático (usa `render.yaml`):**
1. Sube este proyecto a un repositorio de GitHub/GitLab.
2. En Render: **New → Blueprint**, conecta el repositorio.

**Opción B — Manual:**
1. Sube el proyecto a un repositorio Git.
2. En Render: **New → Static Site**, conecta el repositorio.
3. Configura:
   - **Build Command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. Deploy.

No hace falta configurar variables de entorno: la clave de ElevenLabs se
introduce dentro de la propia app (en Ajustes) y se guarda solo en el
dispositivo de quien la usa.

## Instalar la app en el móvil/tablet

Una vez publicada en Render, abre la URL en Chrome (Android) o Safari
(iOS) y usa "Instalar app" / "Añadir a pantalla de inicio". Quedará como
una app independiente, con su propio icono, y el tablero funcionará sin
conexión (la voz del sistema funciona offline; la voz clonada de
ElevenLabs siempre necesita internet).

## Notas

- La app usa la Web Speech API del navegador para la voz del sistema.
- El modo "voz clonada" llama directamente a la API de ElevenLabs desde el
  navegador; no se cachea, siempre necesita conexión.
- La copia de seguridad puede incluir tu clave de ElevenLabs si la voz
  clonada está configurada — guarda el archivo exportado en un sitio
  privado.
