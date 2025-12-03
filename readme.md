# 📝 Gestor de Tareas - Backend (Node.js + Express)

Backend profesional desarrollado en **Node.js** utilizando **Express**, arquitectura **MVC**, middlewares personalizados y rutas organizadas.  
Este servidor expone una API REST utilizada por el frontend para crear, editar, eliminar y listar tareas.

---

## 🚀 Tecnologías utilizadas
- **Node.js**
- **Express**
- **MVC Architecture**
- **Middlewares personalizados**
- **FileSystem / JSON**
- **CORS**
- **dotenv**

---

## 📁 Estructura del proyecto

```
gestor-de-tareas-backend/
│── config/ # Configuración general
│── controllers/ # Lógica de cada endpoint
│── middlewares/ # Validaciones, autenticación
│── models/ # Modelos de datos
│── routes/ # Rutas de la API
│── server.js # Punto de entrada del servidor
│── package.json
│── package-lock.json
│── .gitignore
```

---

## 📌 Endpoints principales (API REST)

| Método | Endpoint         | Descripción                       |
|--------|------------------|-----------------------------------|
| GET    | /api/tareas      | Obtener todas las tareas          |
| POST   | /api/tareas      | Crear una tarea nueva             |
| PUT    | /api/tareas/:id  | Actualizar una tarea existente    |
| DELETE | /api/tareas/:id  | Eliminar una tarea                |

---

## 🛠️ Instalación y uso en modo desarrollo

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/migueldavidortigoza/gestor-de-tareas-pro-backend
cd gestor-de-tareas-pro-backend
```
2️⃣ Instalar dependencias
```
npm install
```
3️⃣ Crear archivo .env
```
PORT=3000
```
4️⃣ Ejecutar el servidor
```
npm start
El servidor estará disponible en:
👉 http://localhost:3000
```

🌍 Deploy (Render)
Backend desplegado en Render:
```
https://TU-BACKEND-DEPLOY.onrender.com
```
(Reemplazar con la URL real cuando lo publiques)

🔗 Conexión con el frontend
```
const API_URL = "https://TU-BACKEND-DEPLOY.onrender.com/api/tareas";
```

👨‍💻 Autor
Miguel David Ortigoza
Full Stack Web Developer
GitHub: https://github.com/migueldavidortigoza


⭐ Contribuciones
Las contribuciones, issues y mejoras son siempre bienvenidas.