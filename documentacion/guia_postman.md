# Guía de Postman para el Proyecto Tindel

Esta guía te ayudará a probar los endpoints principales de tu API, incluyendo el flujo de autenticación mediante JWT (JSON Web Token). Esta documentación está lista para que la uses de apoyo en tu presentación.

## 1. Configuración de Autenticación (JWT)

Antes de poder interactuar con los endpoints protegidos (como crear interacciones), necesitas un token JWT. Esto demuestra que un usuario ha iniciado sesión.

### Paso 1.1: Iniciar Sesión (Login) para obtener el Token
- **Método HTTP:** `POST`
- **URL:** `http://localhost:3000/auth/login`
- **Headers:** `Content-Type: application/json`
- **Body (raw -> JSON):**
```json
{
  "email": "tu-email@ejemplo.com",
  "password": "tu-password-secreto"
}
```
**Instrucción para Postman:** Al enviar esta solicitud, el servidor te devolverá un JSON con la propiedad `access_token`. Copia ese token (es una cadena de texto larga).

### Paso 1.2: Configurar el Token en Postman
Para las siguientes solicitudes que requieran seguridad:
1. Ve a la pestaña **Authorization** de tu nueva solicitud en Postman.
2. En el menú desplegable **Type**, selecciona **Bearer Token**.
3. Pega el token que copiaste en el paso anterior en el campo **Token**.

---

## 2. Endpoints del Módulo de Interacciones (CRUD)

> **Importante:** Asegúrate de tener configurado el Bearer Token (Paso 1.2) antes de ejecutar estas solicitudes si están protegidas por el `JwtAuthGuard` en tu código.

### 2.1 Crear una Interacción (POST)
Crea una nueva interacción entre dos usuarios (Like, Dislike, Superlike o Report).

- **Método HTTP:** `POST`
- **URL:** `http://localhost:3000/interactions`
- **Headers:** `Content-Type: application/json`, `Authorization: Bearer <tu-token>`
- **Body (raw -> JSON):**
```json
{
  "type": "LIKE",
  "fromId": 1,
  "toId": 2
}
```

### 2.2 Obtener todas las Interacciones (GET)
Obtiene el historial completo de interacciones.

- **Método HTTP:** `GET`
- **URL:** `http://localhost:3000/interactions`
- **Headers:** `Authorization: Bearer <tu-token>`
- **Body:** *(Vacío)*

### 2.3 Obtener una Interacción por ID (GET)
Busca el detalle de una interacción específica.

- **Método HTTP:** `GET`
- **URL:** `http://localhost:3000/interactions/1` *(El `1` es el ID de la interacción)*
- **Headers:** `Authorization: Bearer <tu-token>`
- **Body:** *(Vacío)*

### 2.4 Actualizar una Interacción (PATCH)
Modifica parcialmente una interacción existente (ej. cambiar un LIKE por un SUPERLIKE).

- **Método HTTP:** `PATCH`
- **URL:** `http://localhost:3000/interactions/1` *(El `1` es el ID de la interacción a modificar)*
- **Headers:** `Content-Type: application/json`, `Authorization: Bearer <tu-token>`
- **Body (raw -> JSON):**
```json
{
  "type": "SUPERLIKE"
}
```

### 2.5 Reemplazar una Interacción (PUT)
Reemplaza los datos completos de una interacción existente.

- **Método HTTP:** `PUT`
- **URL:** `http://localhost:3000/interactions/1`
- **Headers:** `Content-Type: application/json`, `Authorization: Bearer <tu-token>`
- **Body (raw -> JSON):**
```json
{
  "type": "DISLIKE",
  "fromId": 1,
  "toId": 2
}
```

### 2.6 Eliminar una Interacción (DELETE)
Borra una interacción de la base de datos.

- **Método HTTP:** `DELETE`
- **URL:** `http://localhost:3000/interactions/1`
- **Headers:** `Authorization: Bearer <tu-token>`
- **Body:** *(Vacío)*

---

## 3. Posibles Preguntas del Docente sobre JWT

**1. ¿Cómo proteges tus endpoints para que no cualquiera pueda crear interacciones?**
> *"Utilizo Guards de NestJS (específicamente `JwtAuthGuard`). Cuando un usuario hace login, el sistema (auth module) valida sus credenciales y genera un JSON Web Token (JWT) firmado. El cliente debe enviar ese token en el header `Authorization` como un `Bearer Token`. Si el token no está, está expirado, o no es válido, NestJS bloquea la petición retornando un error 401 Unauthorized."*

**2. ¿Qué contiene el payload de tu JWT?**
> *"Generalmente, el payload del token contiene la información mínima necesaria para identificar al usuario, como su `sub` (que es el ID del usuario) y su `email`. No incluyo información sensible como la contraseña. Esto me permite saber quién hace la petición sin tener que consultar la base de datos para validar su identidad en cada request."*
