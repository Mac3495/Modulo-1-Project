# Task Manager App

## Descripción
Task Manager App es una aplicación web para la gestión de tareas, permitiendo a los usuarios registrar, iniciar sesión y administrar sus tareas. Cada usuario tiene sus propias tareas, que pueden estar en los estados 'pendiente', 'en progreso' o 'completada'.

## Tecnologías utilizadas
- **Frontend:** React con Vite, React Router
- **Backend:** Node.js, Express
- **Base de datos:** MongoDB (desplegado en Atlas)
- **Autenticación:** JWT, bcrypt para encriptación de contraseñas

## Características principales
- Registro e inicio de sesión de usuarios con correo y contraseña.
- CRUD de tareas:
  - Crear, editar y eliminar tareas.
  - Cambiar el estado de las tareas ('pendiente', 'en progreso', 'completada').
  - Solo las tareas 'pendiente' y 'en progreso' pueden editarse.
  - Las tareas 'completadas' solo pueden eliminarse.
- Servicio de logout.

## Instalación y configuración
### Requisitos previos
- Node.js instalado
- MongoDB Atlas o una instancia local de MongoDB

### Pasos de instalación
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/Mac3495/Modulo-1-Project.git
   ```
2. Entrar en el directorio del proyecto:
   ```sh
   cd task-manager-app
   ```
3. Instalar dependencias del backend:
   ```sh
   cd backend
   npm install
   ```
4. Configurar variables de entorno en un archivo `.env` en el backend:
   ```sh
   MONGO_URI=tu_conexion_a_mongodb
   JWT_SECRET=tu_secreto_jwt
   ```
5. Iniciar el backend:
   ```sh
   node index.js
   ```
6. Instalar dependencias del frontend:
   ```sh
   cd ../frontend
   npm install
   ```
7. Iniciar el frontend:
   ```sh
   npm run dev
   ```

## Uso
1. Regístrate con un correo y contraseña.
2. Inicia sesión.
3. Agrega, edita y elimina tareas según los estados permitidos.
4. Cierra sesión cuando termines.

## Despliegue
- **Backend:** Deploy en Render
- **Frontend:** Deploy en Vercel
