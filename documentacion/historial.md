# Historial de Cambios del Proyecto Tindel

## [08/06/2026] - Limpieza de Código y Refuerzo de Seguridad (RBAC)

**1. Implementación Estricta de RBAC (Role-Based Access Control)**
* Se fortaleció la seguridad añadiendo la protección de roles (`RolesGuard` y el decorador `@Roles()`) a múltiples controladores que anteriormente solo verificaban el JWT (`JwtAuthGuard`). 
* Los controladores protegidos fueron: `MatchController`, `InteractionController`, `ChatController`, `PhotoController`, `MessageController` y `SubscriptionController`.
* Se restringieron de forma estricta los endpoints sensibles (como `findAll`, `create`, `update`, `remove`) requiriendo específicamente el rol `@Roles(Role.ADMIN)`.
* Se actualizó `current-user.decorator.ts` para asegurar que el `role` del usuario retornado tenga un tipado estricto con el enum `Role` (anteriormente era un simple `string`).
* Se solucionó un desajuste de tipos en `jwt.strategy.ts` al mapear adecuadamente el rol que venía desde los enums generados por Prisma (`$Enums.Role`) hacia el enum de la aplicación (`Role`).

**2. Corrección de Módulos ECMAScript (ESM)**
* Se agregaron sistemáticamente las extensiones `.js` a todas las importaciones locales en los controladores y servicios (`main.ts`, `interaction.service.ts`, `photo.controller.ts`, etc.). Este cambio es vital para ejecutar la aplicación correctamente en un entorno con `"type": "module"`.

**3. Limpieza de Comentarios y Refactorización Menor**
* Se limpiaron los comentarios explicativos redundantes e innecesarios a lo largo de todos los servicios (ej. `// Verifica que existe`, `// Consulta derivada`), dejando el código más limpio.
* Se preservaron explícitamente los comentarios que sirven como separadores organizacionales dentro de las entidades (ej. `// Interests & Details` en `user.entity.ts`).
* Se eliminó el registro redundante de `PrismaService` en el array de `providers` del `UserModule`, ya que venía directamente exportado por el `PrismaModule`.

**4. Estandarización y Formateo del Código**
* Se corrió de manera exitosa `eslint --fix` para detectar y resolver inconsistencias sintácticas.
* Se formatearon todos los archivos mediante `prettier --write`, asegurando un estándar unificado de espacios e indentaciones en todo el repositorio.
* Se verificó la compilación del código (`npm run build`) logrando un resultado limpio de errores tras los ajustes aplicados.
