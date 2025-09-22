# Dyxersoft Estates Backend

Un backend moderno y escalable para el sistema de gestión inmobiliaria Dyxersoft Estates, construido con Node.js, TypeScript, y arquitectura limpia.

## 🚀 Características

- **Arquitectura Limpia**: Separación clara de responsabilidades con controladores, servicios, repositorios y entidades
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad
- **Prisma ORM**: ORM moderno con generación automática de tipos
- **JWT Authentication**: Autenticación segura con tokens de acceso y refresh
- **GraphQL + REST**: APIs flexibles con GraphQL y endpoints REST
- **PostgreSQL**: Base de datos robusta y escalable
- **Redis**: Cache y gestión de sesiones
- **Docker**: Containerización completa con docker-compose
- **Testing**: Tests unitarios y de integración con Jest
- **Logging**: Sistema de logs estructurado con Winston
- **Swagger**: Documentación automática de la API
- **Rate Limiting**: Protección contra abuso de la API
- **Validation**: Validación robusta con Zod
- **Security**: Headers de seguridad con Helmet

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── controllers/     # Controladores de la API
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos
│   ├── entities/        # Entidades del dominio
│   ├── middleware/      # Middleware personalizado
│   ├── routes/          # Definición de rutas
│   ├── utils/           # Utilidades y helpers
│   ├── config/          # Configuración de la aplicación
│   ├── types/           # Tipos TypeScript
│   └── graphql/         # Esquemas y resolvers GraphQL
├── tests/               # Tests unitarios e integración
├── prisma/              # Esquemas y migraciones de Prisma
├── logs/                # Archivos de log
├── uploads/             # Archivos subidos
└── docker-compose.yml   # Configuración de contenedores
```

## 🛠️ Tecnologías

### Core
- **Node.js** 18+ - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express.js** - Framework web

### Base de Datos
- **PostgreSQL** - Base de datos principal
- **Prisma** - ORM y generador de cliente
- **Redis** - Cache y sesiones

### Autenticación & Seguridad
- **JWT** - JSON Web Tokens
- **bcryptjs** - Hash de contraseñas
- **Helmet** - Headers de seguridad
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Limitación de velocidad

### API & Documentación
- **GraphQL** - API flexible
- **Swagger** - Documentación automática
- **Zod** - Validación de esquemas

### DevOps & Testing
- **Docker** - Containerización
- **Jest** - Framework de testing
- **Winston** - Logging
- **ESLint** - Linting
- **Prettier** - Formateo de código

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+
- npm o yarn
- Docker y Docker Compose (opcional)
- PostgreSQL (si no usas Docker)

### Instalación Local

1. **Clonar y navegar al directorio**
   ```bash
   cd backend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   # Editar .env con tus configuraciones
   ```

4. **Configurar base de datos**
   ```bash
   # Generar cliente Prisma
   npm run db:generate
   
   # Ejecutar migraciones
   npm run db:migrate
   
   # Poblar base de datos con datos de ejemplo
   npm run db:seed
   ```

5. **Iniciar en modo desarrollo**
   ```bash
   npm run dev
   ```

### Instalación con Docker

1. **Iniciar servicios**
   ```bash
   docker-compose up -d
   ```

2. **Verificar que los servicios estén corriendo**
   ```bash
   docker-compose ps
   ```

La aplicación estará disponible en:
- **API**: http://localhost:3001
- **Documentación**: http://localhost:3001/api-docs
- **pgAdmin**: http://localhost:5050
- **RedisInsight**: http://localhost:8001

## 📚 Documentación de la API

### Endpoints Principales

#### Autenticación
- `POST /api/v1/auth/register` - Registrar usuario
- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/refresh` - Renovar token
- `POST /api/v1/auth/logout` - Cerrar sesión
- `GET /api/v1/auth/me` - Perfil del usuario actual

#### Propiedades
- `GET /api/v1/properties` - Listar propiedades
- `POST /api/v1/properties` - Crear propiedad
- `GET /api/v1/properties/:id` - Obtener propiedad
- `PUT /api/v1/properties/:id` - Actualizar propiedad
- `DELETE /api/v1/properties/:id` - Eliminar propiedad

#### GraphQL
- `POST /graphql` - Endpoint GraphQL

### Documentación Interactiva

Visita http://localhost:3001/api-docs para explorar la documentación completa de la API con Swagger UI.

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar en modo desarrollo
npm run build        # Compilar TypeScript
npm start           # Iniciar aplicación compilada

# Base de datos
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Push schema a DB
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Poblar DB con datos ejemplo
npm run db:studio    # Abrir Prisma Studio

# Docker
npm run docker:up    # Levantar contenedores
npm run docker:down  # Bajar contenedores
npm run docker:build # Construir imagen

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de ESLint
npm run format       # Formatear con Prettier
npm run type-check   # Verificar tipos TypeScript
```

## 🔐 Autenticación

El sistema utiliza JWT (JSON Web Tokens) para autenticación:

1. **Access Token**: Válido por 1 hora, se incluye en el header `Authorization: Bearer <token>`
2. **Refresh Token**: Válido por 7 días, se usa para renovar el access token

### Ejemplo de uso:

```javascript
// Login
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { data } = await response.json();
const { accessToken, refreshToken } = data;

// Usar token en requests posteriores
const protectedResponse = await fetch('/api/v1/auth/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});
```

## 🌍 Variables de Entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `PORT` | Puerto del servidor | `3001` |
| `DATABASE_URL` | URL de PostgreSQL | - |
| `JWT_SECRET` | Secreto para JWT | - |
| `JWT_REFRESH_SECRET` | Secreto para refresh tokens | - |
| `REDIS_URL` | URL de Redis | `redis://localhost:6379` |
| `CORS_ORIGIN` | Origen permitido para CORS | `http://localhost:3000` |

## 🏗️ Arquitectura

### Patrón de Capas

1. **Controllers**: Manejan las requests HTTP y validación
2. **Services**: Contienen la lógica de negocio
3. **Repositories**: Abstraen el acceso a datos
4. **Entities**: Definen las entidades del dominio

### Flujo de Datos

```
Request → Middleware → Controller → Service → Repository → Database
Response ← Controller ← Service ← Repository ← Database
```

## 🔄 Contribución

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Soporte

Para soporte y preguntas:
- Email: info@dyxersoft.com
- Documentación: http://localhost:3001/api-docs
- Issues: GitHub Issues

---

**Desarrollado con ❤️ por Dyxersoft**