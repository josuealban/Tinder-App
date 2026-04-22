# 🚀 Lista de Endpoints Disponibles (API Tindel)

Aquí tienes la lista completa de rutas para que las pruebes en **Postman** durante tu presentación. 
*(Asumimos que tu API corre en `http://localhost:3000`)*

> ⚠️ **Importante:** Muchos de estos endpoints están protegidos por el decorador `@UseGuards(JwtAuthGuard)`. Primero debes hacer Login en `/auth/login` y enviar el `access_token` en los **Headers** de Postman como `Authorization: Bearer <TU_TOKEN>`.

---

## 🔐 1. Autenticación (Auth)
*No requiere Token.*

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/auth/register` | Crea un nuevo usuario y devuelve sus datos. |
| `POST` | `/auth/login` | Recibe `email` y `password` y devuelve el JWT (`access_token`). |

**Ejemplo JSON (`POST /auth/login`):**
```json
{
  "email": "juan@example.com",
  "password": "admin123"
}
```

---

## 👤 2. Usuarios (Users)
*Requieren Autenticación (Token JWT)*

| Método | Endpoint | Descripción |
|---|---|---|
| `POST`   | `/users`      | Crea un usuario (similar al register pero requiere token). |
| `GET`    | `/users`      | Trae todos los usuarios registrados e incluye sus fotos. |
| `GET`    | `/users/:id`  | Busca un usuario específico por su ID. |
| `PATCH`  | `/users/:id`  | Actualiza parcialmente los datos del usuario (ej: su "bio"). |
| `DELETE` | `/users/:id`  | Elimina la cuenta de un usuario. |

**Ejemplo JSON (`PATCH /users/1`):**
```json
{
  "bio": "Amante de los perros y el café ☕"
}
```

---

## ❤️ 3. Interacciones (Likes, Superlikes, Dislikes)

| Método | Endpoint | Descripción |
|---|---|---|
| `POST`   | `/interactions`      | Registra el like de un usuario a otro (y si es recíproco crea un MATCH). |
| `GET`    | `/interactions/user/:userId` | Trae todas las interacciones dadas o recibidas por un usuario. |

**Ejemplo JSON (`POST /interactions`):**
```json
{
  "type": "LIKE", 
  "fromId": 1,
  "toId": 2
}
```
*(Tipos válidos: `LIKE`, `DISLIKE`, `SUPERLIKE`, `REPORT`)*

---

## 🤝 4. Matches

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/matches` | Muestra el histórico de todos los matches globales (solo para admin). |
| `GET` | `/matches/user/:userId` | Trae la lista de personas con las que un usuario hizo Match. |
| `DELETE` | `/matches/:id` | Elimina o deshace un Match. |

---

## 💬 5. Chats y Mensajes

**Chats**
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/chats` | Lista todos los chats (incluye el último mensaje de cada chat para previsualización). |
| `GET` | `/chats/:id` | Abre el histórico de un Chat en particular (con todos los usuarios y mensajes). |

**Mensajes (Messages)**
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/messages` | Envía un mensaje nuevo dentro de un Chat. |
| `GET`  | `/messages/chat/:chatId` | Lista cronológicamente todos los mensajes enviados en un Chat. |

**Ejemplo JSON (`POST /messages`):**
```json
{
  "content": "¡Hola! Vi que te gusta la música electrónica, a mí también 😁",
  "fromId": 1,
  "chatId": 1
}
```

---

## 📸 6. Fotos (Photos)

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/photos` | Sube la URL de una foto y la asocia a tu usuario. |
| `GET`  | `/photos/user/:userId`  | Ve todas las fotos de un usuario. |

**Ejemplo JSON (`POST /photos`):**
```json
{
  "url": "https://midominio.com/mifoto.jpg",
  "isPrimary": true,
  "userId": 1
}
```

---

## 💎 7. Suscripciones (Subscriptions)

| Método | Endpoint | Descripción |
|---|---|---|
| `GET`    | `/subscriptions` | Lista los distintos planes (FREE, GOLD, PLATINUM, etc.) de Tinder. |
| `POST`   | `/subscriptions` | (Admin) Crea un nuevo plan en la base de datos. |
| `PATCH`  | `/subscriptions/:tier` | Edita el precio o las "features" de un plan. |

**Ejemplo JSON (`POST /subscriptions`):**
```json
{
  "tier": "PLATINUM",
  "name": "Platino 2026",
  "description": "Máxima prioridad en la red",
  "price": 39.99,
  "features": ["100 superlikes", "Mensajes prioritarios"]
}
```
