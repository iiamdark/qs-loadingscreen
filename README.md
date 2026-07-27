# 🚨 QS-LoadingScreen - Fork con Fix Temporal

> **⚠️ AVISO IMPORTANTE:** Este repositorio es un **fork temporal** del [qs-loadingscreen original](https://github.com/emanueldev1/qs-loadingscreen) de **Quasar Store**.  
> Los cambios aquí implementados son **parches temporales** hasta que Quasar Store publique una actualización oficial con las correcciones definitivas.

---

## 🐛 Bugs Corregidos (Fix Temporal)

### 1. ❌ Video y música no se reproducían

**Causa:** Los componentes `<ReactPlayer>` usaban `src={url}` en lugar de `url={url}`. ReactPlayer **no acepta** `src` como prop — la prop correcta es `url`. Esto impedía que tanto el video de fondo como el reproductor de música se cargaran.

**Solución:** Cambiado `src` → `url` en ambos reproductores. También se añadieron configuraciones adicionales de YouTube (`iv_load_policy: 3`, `fs: 0`, `disablekb: 1`) y `playsInline` para mejor compatibilidad.

### 2. ❌ Estado del servidor y ping no cargaban

**Causa:** La API de FiveM (`servers-frontend.fivem.net`) está protegida por Cloudflare y bloquea peticiones sin headers de navegador. Además:
- El `serverId` por defecto era un placeholder inválido (`"serverConnectId like 3qyo9t"`)
- El endpoint original puede cambiar o caerse sin fallback

**Solución:**
- Añadidos headers `User-Agent`, `Accept`, `Accept-Language`, `Referer` para evitar bloqueos de Cloudflare
- **Doble endpoint:** primero intenta `frontend.cfx-services.net` (nuevo) y si falla, usa `servers-frontend.fivem.net` (legacy)
- **Validación de Server ID:** detecta placeholders y muestra advertencia clara en consola
- Polling reducido de 5s → 15s para evitar rate-limiting

### 3. 🧹 Componente AudioControls

**Causa:** El componente `AudioControls` recibía props (`toggleAudioSource`, `audioSource`) que **nunca se pasaban** desde el componente padre, causando comportamiento indefinido.

**Solución:** Eliminadas las props no utilizadas y el código muerto comentado. Añadida protección `playerRef?.current` con try/catch para evitar errores cuando el player interno no está listo.

### 4. 📝 jsconfig.json inválido

**Causa:** Trailing comma (coma final) en el array `"include"`, lo cual es JSON inválido y causaba error en el editor.

**Solución:** Eliminada la coma final.

---

## 🚀 Instalación Rápida

### Opción 1: Desde release (recomendado)

1. Descarga el último `release.zip` desde [Releases](https://github.com/iiamdark/qs-loadingscreen/releases)
2. Extrae la carpeta `qs-loadingscreen` en la carpeta `resources` de tu servidor FiveM
3. Añade al `server.cfg`:
   ```lua
   ensure qs-loadingscreen
   ```
4. **IMPORTANTE:** Edita `config.json` y cambia el `serverId` por el ID de tu servidor

### Opción 2: Compilar desde código fuente

```bash
# Clonar el repositorio
git clone https://github.com/iiamdark/qs-loadingscreen.git
cd qs-loadingscreen/web

# Instalar dependencias
npm install

# Compilar
npm run build

# Copiar la carpeta web/build a tu servidor FiveM
```

### Opción 3: Ver preview en navegador

```bash
cd web
npm run dev
# Abre http://localhost:5173
```

---

## ⚙️ Configuración

Edita `config.json` con los datos de **tu servidor**:

```json
{
    "server": {
        "serverId": "TU_SERVER_ID_AQUI",  ← Cámbialo por tu Server ID (ej: "6r9ob4")
        "titleMode": "mixed",
        "title": "MI SERVIDOR [Ctext-primary font-bold]ROLEPLAY[/C]",
        "logoUrl": "https://tuservidor.com/logo.png"
    },
    "audio": {
        "enabled": true,
        "url": "https://www.youtube.com/watch?v=VIDEO_ID",
        "volume": 0.5,
        "loop": true,
        "useVideoAudio": true
    },
    "background": {
        "type": "video",
        "videoUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
        "loop": true
    }
}
```

### ¿Dónde encuentro mi Server ID?

1. Ve a https://servers.fivem.net/
2. Busca tu servidor
3. Haz clic en tu servidor para abrir la página de detalle
4. El Server ID es el código en la URL: `https://servers.fivem.net/servers/detail/XXXXXX`

---

## 📁 Estructura del Proyecto

```
qs-loadingscreen/
├── client.lua                  # Lógica de cliente FiveM
├── fxmanifest.lua              # Manifiesto del recurso
├── config.json                 # Configuración principal
├── web/
│   ├── build/                  # Archivos compilados (output)
│   ├── src/
│   │   ├── index.jsx           # Componente principal
│   │   ├── screens/quasar/
│   │   │   └── index.jsx       # Lógica de la loading screen
│   │   ├── components/ui/      # Componentes UI
│   │   └── lib/utils.js        # Utilidades
│   ├── public/config.json      # ⚡ Misma config que la raíz
│   └── package.json
```

---

## 🎨 Personalización

### Colores
Edita `web/src/index.css` — variables CSS en `:root` y `.dark`:
```css
--primary: 199 100% 50%;    /* Azul vibrante */
--secondary: 180 100% 50%;  /* Cian neón */
--background: 240 10% 5%;   /* Fondo oscuro */
```

### Textos con estilos
Usa la sintaxis `[Cclase1 clase2]texto[/C]` en `config.json`:
```json
{
    "server": {
        "title": "MI SERVER [Ctext-red-600 font-bold]RP[/C]"
    }
}
```

---

## 📄 Licencia

Este fork mantiene la licencia **LGPLv3** del proyecto original.

Creado originalmente por [Quasar Store](https://www.quasar-store.com/) · Fix temporal por [iiamdark](https://github.com/iiamdark)
