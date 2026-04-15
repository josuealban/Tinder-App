# Cumplimiento de Principios ACID en Tindel

Este documento explica cómo la arquitectura del proyecto **Tindel** garantiza la integridad de los datos mediante los principios **ACID** (Atomicity, Consistency, Isolation, Durability).

## 1. Atomicidad (Atomicity)
La atomicidad garantiza que una operación compleja se realice por completo o no se realice en absoluto ("todo o nada").

*   **En Tindel:** Cuando ocurre un **Match**, Prisma utiliza una operación atómica para crear el registro en la tabla `Match` y, simultáneamente, crear su `Chat` relacionado.
*   **Ejemplo en Código (`InteractionService.ts`):**
    ```typescript
    await this.prisma.match.create({
      data: {
        user1Id: ...,
        user2Id: ...,
        chat: { create: {} }, // Operación atómica: si falla el chat, no se crea el match.
      },
    });
    ```

## 2. Consistencia (Consistency)
La consistencia asegura que la base de datos pase de un estado válido a otro, respetando todas las reglas y restricciones.

*   **En Tindel:** El esquema de Prisma (`schema.prisma`) define restricciones estrictas que PostgreSQL impone:
    *   **Unique Constraints:** `email` y `phone` en la entidad `User` no pueden duplicarse.
    *   **Foreign Keys:** No se puede crear un `Message` para un `Chat` que no existe.
    *   **Enums:** Los campos como `Gender` o `InteractionType` solo aceptan valores predefinidos, evitando datos basura.

## 3. Aislamiento (Isolation)
El aislamiento asegura que las transacciones simultáneas no interfieran entre sí.

*   **En Tindel:** PostgreSQL utiliza por defecto el nivel de aislamiento **Read Committed**. 
    *   Si dos usuarios dan "Like" al mismo tiempo, PostgreSQL y Prisma gestionan los bloqueos necesarios para que las búsquedas de "reciprocidad" (para crear un match) se ejecuten de forma segura sin generar duplicados incoherentes (gracias también al índice `@unique([fromId, toId])` en `Interaction`).

## 4. Durabilidad (Durability)
La durabilidad garantiza que, una vez confirmada una transacción, los cambios persistan incluso en caso de fallo del sistema.

*   **En Tindel:** Al utilizar **PostgreSQL**, todos los cambios confirmados se escriben en el **Write-Ahead Log (WAL)** antes de ser aplicados físicamente al almacenamiento. Esto asegura que, tras un reinicio inesperado o un corte de energía, la base de datos pueda recuperar el estado exacto del último "commit".

---

### Conclusión
El uso de **Prisma** como ORM facilita la implementación de estos principios a nivel de aplicación, mientras que **PostgreSQL** actúa como el motor robusto que garantiza que estas propiedades se cumplan a nivel físico y lógico en el almacenamiento.
