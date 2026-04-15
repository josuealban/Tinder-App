# Documentación de la API Tindel - Postman

Este documento contiene el listado completo de solicitudes HTTP para probar todas las entidades del sistema desde Postman.

**URL Base:** `http://localhost:3000`

---

## 🔑 Autenticación (Auth)
*Endpoints para gestionar el acceso.*

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/register` | Registrar un nuevo usuario | `{"email": "user@test.com", "password": "password123", "name": "Test User", "age": 25}` |
| **POST** | `/auth/login` | Iniciar sesión y obtener JWT | `{"email": "user@test.com", "password": "password123"}` |

---

## 👤 Usuarios (Users)
*(Requiere Bearer Token)*

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/users` | Listar todos los usuarios | N/A |
| **GET** | `/users/:id` | Ver perfil de un usuario | N/A |
| **PATCH** | `/users/:id` | Actualización parcial | `{"bio": "Mi nueva biografía"}` |
| **PUT** | `/users/:id` | Actualización completa | `{"email": "...", "name": "...", "age": 26, ...}` |
| **DELETE** | `/users/:id` | Eliminar cuenta | N/A |

---

## 📸 Fotos (Photos)

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/photos` | Subir URL de foto | `{"url": "http://imagen.com/1.jpg", "userId": 1, "isPrimary": true}` |
| **GET** | `/photos` | Ver todas las fotos | N/A |
| **GET** | `/photos/:id` | Ver una foto por ID | N/A |
| **GET** | `/photos/user/:userId`| Ver fotos de un usuario | N/A |
| **PATCH** | `/photos/:id` | Editar info de foto | `{"isPrimary": false}` |
| **DELETE** | `/photos/:id` | Eliminar foto | N/A |

---

## ❤️ Interacciones (Interactions)
*Likes, Dislikes y Superlikes.*

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/interactions` | Enviar interacción | `{"type": "LIKE", "fromId": 1, "toId": 2}` |
| **GET** | `/interactions` | Listar interacciones | N/A |
| **GET** | `/interactions/:id` | Ver detalle | N/A |
| **GET** | `/interactions/user/:userId`| Ver historial del usuario | N/A |
| **PATCH** | `/interactions/:id` | Cambiar tipo | `{"type": "SUPERLIKE"}` |
| **DELETE** | `/interactions/:id` | Deshacer interacción | N/A |

---

## 🤝 Matches (Matches)
*(La mayoría se generan automáticamente tras un Like mutuo)*

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/matches` | Crear match manual | `{"user1Id": 1, "user2Id": 2}` |
| **GET** | `/matches` | Listar todos los matches | N/A |
| **GET** | `/matches/:id` | Ver detalle de match | N/A |
| **GET** | `/matches/user/:userId` | Ver matches de un usuario | N/A |
| **DELETE** | `/matches/:id` | Eliminar match | N/A |

---

## 💬 Chats
*(Se crean automáticamente al ocurrir un Match)*

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/chats` | Ver todos los chats | N/A |
| **GET** | `/chats/:id` | Ver un chat con mensajes | N/A |
| **POST** | `/chats` | Crear chat manual | `{"matchId": 1}` |
| **DELETE** | `/chats/:id` | Eliminar chat | N/A |

---

## 📩 Mensajes (Messages)

| Método | Endpoint | Descripción | Body (JSON) |
| :--- | :--- | :--- | :--- |
| **POST** | `/messages` | Enviar mensaje | `{"content": "Hola!", "fromId": 1, "chatId": 1}` |
| **GET** | `/messages` | Ver todos los mensajes | N/A |
| **GET** | `/messages/:id` | Ver mensaje específico | N/A |
| **GET** | `/messages/chat/:chatId`| Ver historial del chat | N/A |
| **PATCH** | `/messages/:id` | Editar mensaje | `{"content": "Mensaje editado"}` |
| **DELETE** | `/messages/:id` | Eliminar mensaje | N/A |

---

### 💡 Tips para Postman:
1. Asegúrate de copiar el `access_token` recibido en el login.
2. En las rutas protegidas, ve a la pestaña **Auth**, elige **Bearer Token** y pega el token allí.
3. Para operaciones PATCH/PUT, usa la pestaña **Body** -> **raw** -> **JSON**.
