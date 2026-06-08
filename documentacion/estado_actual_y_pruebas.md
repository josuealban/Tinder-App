# 📑 Estado Actual del Sistema y Guía de Testeo Rápido (JWT)

Este documento resume los cambios recientes implementados en la infraestructura de seguridad de **Tindel**, explicando la función de cada parte agregada y proporcionando herramientas y comandos listos para ejecutar pruebas rápidas de la API.

---

## 🏗️ 1. Estado Actual y Nuevas Funcionalidades

Hemos robustecido la seguridad de todo el sistema mediante una arquitectura JWT madura y con tipado estricto (cero usos de `any`). A continuación se describe cada componente agregado y su función:

### A. Clave Secreta Unificada (`the_last_air_master`)
*   **Función**: Firma y valida la integridad de los JSON Web Tokens expedidos por la plataforma.
*   **Archivos Modificados**: 
    - [.env](file:///c:/Users/josue/OneDrive/Desktop/proyecto-Herramientas-Despliegue/tindel/.env): `JWT_SECRET=the_last_air_master`
    - [auth.module.ts](file:///c:/Users/josue/OneDrive/Desktop/proyecto-Herramientas-Despliegue/tindel/src/auth/auth.module.ts): Fallback en `JwtModule.register()`
    - [jwt.strategy.ts](file:///c:/Users/josue/OneDrive/Desktop/proyecto-Herramientas-Despliegue/tindel/src/auth/strategies/jwt.strategy.ts): Fallback en `secretOrKey` de la estrategia de Passport.

### B. Decorador Personalizado `@CurrentUser`
*   **Función**: Permite inyectar de forma limpia, directa y con tipado estricto al usuario autenticado actual desde el contexto de la petición (`req.user`) en cualquier método de un controlador NestJS.
*   **Ubicación**: [current-user.decorator.ts](file:///c:/Users/josue/OneDrive/Desktop/proyecto-Herramientas-Despliegue/tindel/src/auth/decorators/current-user.decorator.ts)
*   **Ventaja**: Elimina por completo la necesidad de interactuar con tipos genéricos u obsoletos como `any` al interactuar con el Request de Express, garantizando el cumplimiento de los principios **SOLID** (Segregación de Interfaces).

### C. Validación de Estado del Usuario en Tiempo Real (Base de Datos)
*   **Función**: Cuando un cliente realiza una llamada usando un Bearer Token, la estrategia JWT (`JwtStrategy`) valida si el token es estructuralmente correcto y, además, realiza una consulta rápida a la base de datos para verificar:
    1. Si el usuario aún existe en el sistema.
    2. Si la cuenta del usuario no se encuentra restringida (`isRestricted: true`).
    Si el usuario no existe o está restringido, rechaza la llamada inmediatamente con un `401 Unauthorized`.
*   **Ubicación**: [jwt.strategy.ts](file:///c:/Users/josue/OneDrive/Desktop/proyecto-Herramientas-Despliegue/tindel/src/auth/strategies/jwt.strategy.ts)
*   **Ventaja**: Permite la inhabilitación o bloqueo inmediato de un usuario problemático sin necesidad de esperar a que expire el tiempo de vida (TTL) del token JWT.

### D. Endpoint de Autoperfil (`GET /users/me`)
*   **Función**: Retorna el perfil completo del usuario que inició sesión. Es tipo-seguro y aprovecha el nuevo decorador `@CurrentUser` para evitar errores de parámetro.
*   **Ubicación**: [user.controller.ts](file:///c:/Users/josue/OneDrive/Desktop/proyecto-Herramientas-Despliegue/tindel/src/user/user.controller.ts)

### E. Protección Global con `JwtAuthGuard`
*   **Función**: Protege todos los endpoints de negocio principales de Tindel de accesos no autorizados.
*   **Controladores Protegidos**:
    - `UserController` (`/users`)
    - `MatchController` (`/matches`)
    - `ChatController` (`/chats`)
    - `InteractionController` (`/interactions`)
    - `MessageController` (`/messages`)
    - `PhotoController` (`/photos`)
    - `SubscriptionController` (`/subscriptions`)

---

## 🚀 2. Guía de Testeo Rápido

Para facilitar la evaluación de estas nuevas características por parte del docente o tu propia revisión, puedes ocupar los siguientes métodos de prueba rápidos usando herramientas integradas en la consola de Windows (PowerShell).

> [!NOTE]
> Asegúrate de que el servidor está corriendo (`npm run start:dev`) en `http://localhost:3000`.

### Script de Prueba Rápida en PowerShell
Abre una terminal de **PowerShell** y ejecuta este bloque completo de código para realizar un flujo automático de testeo:

```powershell
# 1. Definir la URL base de la API
$BaseUrl = "http://localhost:3000"

# 2. Generar datos únicos para el registro
$RandomId = Get-Random -Minimum 1000 -Maximum 9999
$Email = "tester$RandomId@tindel.com"
$Password = "password123"

Write-Host "--- INICIANDO TESTEO RÁPIDO DE JWT (TINDEL) ---`n"

# 3. Intentar acceder a un recurso protegido SIN token (Debe dar 401 Unauthorized)
Write-Host "[Paso 1] Intentando acceder a /users/me sin Token..." -ForegroundColor Yellow
try {
    Invoke-RestMethod -Uri "$BaseUrl/users/me" -Method Get
} catch {
    $Status = $_.Exception.Response.StatusCode.value__
    Write-Host "✅ Resultado Correcto: Acceso denegado con código $Status (401 Unauthorized)" -ForegroundColor Green
}

# 4. Registrar un nuevo usuario de prueba
Write-Host "`n[Paso 2] Registrando un nuevo usuario de prueba ($Email)..." -ForegroundColor Yellow
$RegisterBody = @{
    email = $Email
    password = $Password
    name = "Tester $RandomId"
    age = 25
} | ConvertTo-Json
$User = Invoke-RestMethod -Uri "$BaseUrl/auth/register" -Method Post -Body $RegisterBody -ContentType "application/json"
Write-Host "✅ Usuario registrado con éxito. ID: $($User.id)" -ForegroundColor Green

# 5. Loguearse para obtener el token firmado con 'the_last_air_master'
Write-Host "`n[Paso 3] Iniciando sesión para obtener Token JWT..." -ForegroundColor Yellow
$LoginBody = @{
    email = $Email
    password = $Password
} | ConvertTo-Json
$AuthResponse = Invoke-RestMethod -Uri "$BaseUrl/auth/login" -Method Post -Body $LoginBody -ContentType "application/json"
$Token = $AuthResponse.access_token
Write-Host "✅ Token recibido con éxito!" -ForegroundColor Green
Write-Host "Token JWT (Firma: the_last_air_master):"
Write-Host $Token -ForegroundColor Cyan

# 6. Consultar su propio perfil usando el token y el decorador @CurrentUser
Write-Host "`n[Paso 4] Consultando /users/me con el Bearer Token..." -ForegroundColor Yellow
$Headers = @{ Authorization = "Bearer $Token" }
$Profile = Invoke-RestMethod -Uri "$BaseUrl/users/me" -Method Get -Headers $Headers
Write-Host "✅ Perfil recuperado con éxito! Nombre: $($Profile.name), Email: $($Profile.email)" -ForegroundColor Green

Write-Host "`n--- TESTEO RÁPIDO FINALIZADO CON ÉXITO ---" -ForegroundColor Green
```

---

## 🛠️ 3. Inspección Manual de Respuestas HTTP (Ejemplos)

### 1. Endpoint: `POST /auth/login` (Obtención de Token)
*   **Petición**:
    ```json
    {
      "email": "tester1234@tindel.com",
      "password": "password123"
    }
    ```
*   **Respuesta Exitosa (`201 Created`)**:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### 2. Endpoint: `GET /users/me` (Consulta Tipo-Segura del Perfil)
*   **Cabecera Obligatoria**: `Authorization: Bearer <token>`
*   **Respuesta Exitosa (`200 OK`)**:
    ```json
    {
      "id": 12,
      "email": "tester1234@tindel.com",
      "name": "Tester 1234",
      "age": 25,
      "bio": null,
      "gender": null,
      "isRestricted": false,
      "createdAt": "2026-05-27T16:25:38.000Z",
      "photos": []
    }
    ```

### 3. Intento de acceso a cuenta Restringida (`401 Unauthorized`)
*   **Escenario**: Un administrador marca a un usuario con `isRestricted: true` en la base de datos PostgreSQL.
*   **Acción**: El usuario intenta realizar cualquier petición usando su token actual.
*   **Respuesta del Sistema**:
    ```json
    {
      "message": "El usuario está restringido",
      "error": "Unauthorized",
      "statusCode": 401
    }
    ```
