# Guía Completa de Postman - Todas las Entidades

Este documento contiene las peticiones JSON para probar absolutamente **todas las entidades** de tu proyecto Tindel según tu esquema de base de datos. Está listo para copiar y pegar en el Body (raw -> JSON) de Postman.

> **⚠️ Recordatorio JWT:** Para todos los endpoints (excepto `/auth/register` y `/auth/login`), asegúrate de haber ido a la pestaña **Authorization** -> **Bearer Token** en Postman y pegar tu token actual.

---

## 1. 🔐 AUTH & USERS (Usuarios)

### 1.1 Registro (POST `/auth/register`)
Crea un usuario nuevo en la base de datos.
```json
{
  "email": "juan@example.com",
  "password": "password123",
  "name": "Juan Perez",
  "age": 25,
  "gender": "MALE",
  "city": "Quito",
  "country": "Ecuador"
}
```

### 1.2 Login (POST `/auth/login`)
Devuelve el JWT (`access_token`) para usar en las demás peticiones.
```json
{
  "email": "juan@example.com",
  "password": "password123"
}
```

### 1.3 Obtener todos los usuarios (GET `/users`)
*No requiere body.*

### 1.4 Actualizar Perfil de Usuario (PATCH `/users/1`)
*Reemplaza el `1` por el ID del usuario.*
```json
{
  "bio": "Me encanta la programación y el café.",
  "hobbies": ["Fútbol", "Videojuegos", "Cine"],
  "zodiacSign": "Aries",
  "seeking": "Relación seria",
  "subscription": "GOLD"
}
```

---

## 2. 💳 SUBSCRIPTION PLANS (Planes de Suscripción)

### 2.1 Crear un Plan (POST `/subscriptions`)
Crea la metadata de un plan en la BD.
```json
{
  "tier": "GOLD",
  "name": "Tindel Gold",
  "description": "Acceso a likes ilimitados y ver a quién le gustas.",
  "price": 14.99,
  "features": ["Likes Ilimitados", "Ver a quién le gustas", "5 Superlikes al día"]
}
```

### 2.2 Ver todos los Planes (GET `/subscriptions`)
*No requiere body.*

### 2.3 Actualizar un Plan (PATCH `/subscriptions/GOLD`)
```json
{
  "price": 12.99
}
```

---

## 3. 📸 PHOTOS (Fotos)

### 3.1 Subir o registrar una Foto (POST `/photos`)
```json
{
  "url": "https://miservidor.com/images/foto_juan.jpg",
  "isPrimary": true,
  "userId": 1
}
```

### 3.2 Ver todas las Fotos (GET `/photos`)
*No requiere body.*

### 3.3 Eliminar una Foto (DELETE `/photos/1`)
*No requiere body.*

---

## 4. ❤️ INTERACTIONS (Interacciones: Likes, Dislikes)

### 4.1 Crear Interacción (POST `/interactions`)
```json
{
  "type": "LIKE", 
  "fromId": 1,
  "toId": 2
}
```
*(Tipos válidos: `LIKE`, `DISLIKE`, `SUPERLIKE`, `REPORT`)*

### 4.2 Ver Interacciones (GET `/interactions`)
*No requiere body.*

---

## 5. 🔥 MATCHES (Emparejamientos)

### 5.1 Crear Match Manualmente (POST `/matches`)
*(Nota: Usualmente esto se crea solo si hay LIKE mutuo, pero si tienes endpoint CRUD, usa este).*
```json
{
  "user1Id": 1,
  "user2Id": 2
}
```

### 5.2 Ver todos los Matches (GET `/matches`)
*No requiere body.*

### 5.3 Eliminar/Deshacer Match (DELETE `/matches/1`)
*No requiere body.*

---

## 6. 💬 CHATS (Conversaciones)

### 6.1 Crear Chat para un Match (POST `/chats`)
```json
{
  "matchId": 1
}
```

### 6.2 Obtener todos los Chats (GET `/chats`)
*No requiere body.*

### 6.3 Obtener detalles del Chat (GET `/chats/1`)
*No requiere body.*

---

## 7. ✉️ MESSAGES (Mensajes)

### 7.1 Enviar Mensaje en un Chat (POST `/messages`)
```json
{
  "content": "¡Hola! Vi que también te gustan los videojuegos. ¿Qué juegas?",
  "fromId": 1,
  "chatId": 1
}
```

### 7.2 Ver todos los Mensajes (GET `/messages`)
*No requiere body.*

### 7.3 Ver Mensajes de un Chat Específico (GET `/messages/chat/1`)
*No requiere body.*
