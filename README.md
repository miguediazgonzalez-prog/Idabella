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

**Android (Chrome):** abre la URL, menú (⋮) → "Instalar app" (o aparecerá un
aviso automático).

**iOS (iPhone/iPad, Safari):** iOS no ofrece instalación automática — hay
que hacerlo a mano: toca el icono de **Compartir** (la flecha hacia arriba)
y luego **"Añadir a pantalla de inicio"**. La propia app se lo recuerda
con un aviso la primera vez que se abre desde Safari.

Una vez instalada en cualquiera de los dos, queda como app independiente
con su propio icono, sin barra de navegador, y el tablero funciona sin
conexión (la voz del sistema funciona offline; la voz clonada de
ElevenLabs siempre necesita internet).

**Aviso importante sobre iOS:** Safari puede borrar los datos guardados
(iconos personalizados, ajustes) si la app pasa muchos días sin abrirse,
por una política de privacidad de Apple (ITP). Para evitar perder el
trabajo, usa de vez en cuando "Exportar" en Ajustes → Copia de seguridad
y guarda ese archivo en un sitio seguro (Google Drive, email, etc.).

## Notas

- La app usa la Web Speech API del navegador para la voz del sistema.
- El modo "voz clonada" llama directamente a la API de ElevenLabs desde el
  navegador; no se cachea, siempre necesita conexión.
- La copia de seguridad puede incluir tu clave de ElevenLabs si la voz
  clonada está configurada — guarda el archivo exportado en un sitio
  privado.
