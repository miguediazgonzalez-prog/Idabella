# Mi Tablero de Voz

Tablero de comunicación (AAC) con iconos, texto libre y texto-a-voz. Incluye
modo de voz del sistema (offline, gratis) y modo de voz clonada vía
ElevenLabs (requiere internet y una clave de API propia).

## Desarrollo local

```bash
npm install
npm run dev
```

Abre la URL que muestre la terminal (normalmente `http://localhost:5173`).

## Compilar para producción

```bash
npm install
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos listos para
publicar.

## Publicar en Render.com

**Opción A — Blueprint automático (usa `render.yaml`):**
1. Sube este proyecto a un repositorio de GitHub/GitLab.
2. En Render: **New → Blueprint**, conecta el repositorio. Render detecta
   `render.yaml` y configura todo solo.

**Opción B — Manual:**
1. Sube el proyecto a un repositorio Git.
2. En Render: **New → Static Site**, conecta el repositorio.
3. Configura:
   - **Build Command:** `npm install && npm run build`
   - **Publish directory:** `dist`
4. Deploy.

No hace falta configurar variables de entorno: la clave de ElevenLabs se
introduce dentro de la propia app (en Ajustes) y se guarda solo en el
dispositivo de quien la usa, no en el servidor.

## Notas

- La app usa la Web Speech API del navegador para la voz del sistema —
  funciona sin conexión en Chrome para Android.
- El modo "voz clonada" llama directamente a la API de ElevenLabs desde el
  navegador del usuario; necesita internet y una cuenta con crédito.
- Instálala como acceso directo desde Chrome en Android: menú (⋮) → "Añadir
  a pantalla de inicio".
