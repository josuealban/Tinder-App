# 📚 Funcionamiento del Proyecto Tindel API

Esta guía está diseñada para ayudarte a entender y explicar el funcionamiento del backend durante tu evaluación de la "Tarea en Clase 2".

---

## 🏗️ 1. Estructura y Arquitectura del Código

El proyecto está construido usando **NestJS**, un framework progresivo para Node.js que impone una arquitectura modular y limpia.

### ¿Cómo se divide cada módulo?
Cada funcionalidad (ej. `User`, `Match`, `Interaction`) tiene su propia carpeta y se divide en 3 capas principales:

1. **Module (`*.module.ts`)**: Agrupa los componentes de esa funcionalidad.
2. **Controller (`*.controller.ts`)**: Recibe las peticiones HTTP (GET, POST, etc.) del cliente (Postman/Frontend), valida los datos (a través de los DTOs) y delega el trabajo al servicio.  
3. **Service (`*.service.ts`)**: Contiene la **lógica de negocio**. Este interactúa con la base de datos a través de Prisma.

### Base de Datos y ORM
Utilizamos **PostgreSQL** como base de datos y **Prisma** como ORM.  
* **PrismaModule (`prisma.service.ts`)**: Nos provee el cliente que nos permite hacer consultas (`prisma.user.findMany()`, `prisma.match.create()`, etc.) como si fueran objetos de TypeScript, sin escribir SQL a mano.

---

## 🚦 2. Flujo de una Petición HTTP (Para explicar al docente)

Si el profesor pregunta: *"¿Cómo fluye la información desde el cliente hasta la base de datos?"*

Aquí está el flujo paso a paso tomando como ejemplo **Crear una Interacción (Dar Like):**

1. **Cliente / Postman**: Envía una petición `POST /interactions` con un JSON (`{ "type": "LIKE", "fromId": 1, "toId": 2 }`).
2. **`main.ts` (ValidationPipe)**: Intercepta el JSON y verifica que cumpla con el `CreateInteractionDto` (usando `class-validator`). Si falta algo, devuelve un error `400 Bad Request` antes de que llegue al controlador.
3. **Controller (`interaction.controller.ts`)**: Recibe los datos validados en el método `@Post() create(...)` y los pasa al Service.
4. **Service (`interaction.service.ts`)**: 
   - Ejecuta la lógica del negocio: Verifica que el usuario no se dé like a sí mismo (`fromId !== toId`). Si lo intenta, lanza un `ConflictException`.
   - Llama a `prisma.interaction.create()` para guardar en la BD.
   - **Lógica Clave:** Si el tipo es `LIKE`, busca si el otro usuario ya le había dado `LIKE` antes. Si es así, crea automáticamente un `Match` y un `Chat`.
5. **Base de Datos**: Prisma traduce la instrucción a SQL, realiza los `INSERTs` en PostgreSQL y devuelve el objeto creado.
6. **Respuesta**: El objeto retorna por el Service, luego al Controller, y NestJS lo convierte mágicamente en una respuesta JSON `201 Created` hacia el cliente.

---

## 🛡️ 3. Manejo de Errores y Validaciones

¿Qué pasa si hay errores o datos faltantes?

- **Errores de Formato (Validación):**  
  Gracias a `@nestjs/common` y `class-validator`, si envías un dato incorrecto (ej. texto donde iba un número), el `ValidationPipe` global responde con la lista exacta de errores (ej. "age must be a number").
  
- **Errores NotFound (No Encontrado):**  
  Al intentar consultar, actualizar o eliminar algo que no existe (ej. un `Match` con ID 999), nuestros Services lanzan un `NotFoundException` y el usuario recibe un `404 Not Found` en lugar de un error feo interno o un valor `null`.

- **Controladores Seguros (Autenticación):**  
  Muchos endpoints tienen el decorador `@UseGuards(JwtAuthGuard)`. Esto significa que sin un token de sesión (Bearer Token en Headers) generado tras un login, NestJS rechaza la petición con `401 Unauthorized`.

---

## 💡 4. Puntos Importantes del Código para Destacar

Si el docente pregunta: *"¿Qué parte del código consideras más importante?"*

Puedes mencionar:
> *"La lógica dentro de `interaction.service.ts` en la función `create()`. No es un simple guardado en base de datos. Puse la lógica para que, cuando se guarde un nuevo LIKE, el sistema verifique si existe el LIKE recíproco. Si existe, automáticamente dispara la creación de un `Match` y al mismo tiempo inicializa un registro en `Chat` para ambos usuarios. Esto demuestra que entiendo cómo un endpoint puede desencadenar una serie de reglas de negocio en cadena."*

## 📜 Resumen para tu Evaluación

* **CRUDs Completos:** Auth, Users, Interactions, Matches, Chats, Messages, Photos, Subscriptions.
* **HTTP:** Correcto uso semántico de `GET`, `POST`, `PATCH`, `PUT` y `DELETE`.
* **Seguridad:** JWT (Jason Web Tokens) implementado para login.
* **Código Limpio:** Módulos separados, inyección de dependencias y validaciones explícitas con DTOs.
