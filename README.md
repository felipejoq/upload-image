# ⤴️ Subir imágenes - Full Stack!

Este es un proyecto "Full Stack" que se divide en un back-end para generar un servicio que recibe peticiones  
POST para subir imágenes. Y un front-end que genera la interfaz para interactuar con el back-end.

## ⚙️ Back-end:

El back-end tiene 2 recursos registrados, ambos son llamados con el verbo HTTP POST y uno sirve para verificar  
que el servidor está operativo y el otro es para subir las imágenes al almacenamiento remoto en Cloudinary.

| RUTA        | MÉTODO | PARÁMETROS                                        | RESPUESTA                                                       | DESCRIPCIÓN                                                                                                               |
|-------------|--------|---------------------------------------------------|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| /api/ping   | POST   | NO                                                | ``` { ok: boolean, message: string } ```                        | Sirve para verificar que el servidor está ONLINE.                                                                         |
| /api/upload | POST   | Body con un campo ```image``` del tipo ```file``` | ```{ ok: boolean, message: string, image: string_url_image }``` | Si todo sale bien el servidor responde con un mensaje satisfactorio y devuelve la URL de la imagen alojada en Cloudinary. |

- El backend valida que la imagen no pese más de 200kb y que sea de formatos JPG, JPEG y PNG.

## 👨‍💻Front-end

- Realizado con Vite y JavaScript Vanilla es una interfaz que permite al usuario seleccionar una imagen mediante una
  ventana de diálogo en el explorador de archivos o bien arrastrar un archivo del tipo imagen a la zona señalada para
  luego presionar el botón subir.
- Esta interfaz valida que el formato de los archivos sean los que corresponden, solo permite subir un archivo a la vez
  y también valida el tamaño del archivo.
- Si la respuesta es satisfactoria de parte del servidor, la interfaz genera un input donde el usuario puede copiar la
  URL pública de la imagen que acaba de subir alojada en Cloudinary.

## 📸 Vista previa

![Vista previa de la interfaz](https://github.com/felipejoq/upload-image/blob/main/preview.jpg?raw=true)

## 🚀 Para ejecutar en desarrollo:

1. Clonar el repositorio:

```bash
git clone https://github.com/felipejoq/upload-image.git
```

### ⚙️ Ejecutar el backend

1. Navegar a la carpeta del backend:

```bash
cd ./upload-image/backend
```

2. Instalar los módulos con npm o yarn

```bash
npm install
ó
yarn install
```

3. Renombrar .env.example a .env y editar con tus credenciales de cloudinary.
4. Ejecutar el comando dev:

```bash
npm run dev
ó
yarn dev
```

### 👨‍💻 Ejecutar el Frontend

1. Navegar a la carpeta del frontend usando otra terminal.

```bash
cd ./upload-image/frontend
```

2. Instalar los módulos con npm o yarn

```bash
npm install
ó
yarn install
```

3. Ejecutar el comando dev.

```bash
npm run dev
ó
yarn dev
```