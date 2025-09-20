# Inmobiliaria Dyxersoft

Una plataforma inmobiliaria moderna y escalable desarrollada con tecnologías de vanguardia.

## 🏗️ Arquitectura del Proyecto

Este proyecto utiliza un enfoque de monorepo con workspaces para organizar diferentes partes de la aplicación:

```
dy-estates/
├── packages/
│   ├── web/          # Frontend Web (Next.js + TypeScript)
│   ├── mobile/       # Frontend Mobile (React Native + TypeScript)
│   └── shared/       # Código compartido (types, utils, constants)
├── docs/            # Documentación
└── tools/           # Scripts y herramientas de desarrollo
```

## 🚀 Tecnologías

### Frontend Web
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **React Hook Form** - Manejo de formularios
- **Zustand** - Gestión de estado global
- **React Query** - Manejo de datos del servidor
- **Next-intl** - Internacionalización

### Frontend Mobile
- **React Native** - Framework para desarrollo móvil
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación
- **React Native Paper** - Componentes UI
- **Zustand** - Gestión de estado global
- **React Query** - Manejo de datos del servidor

### Compartido
- **TypeScript** - Interfaces y tipos compartidos
- **Zod** - Validación de esquemas
- **Date-fns** - Manipulación de fechas

## 🛠️ Configuración del Desarrollo

### Requisitos Previos
- Node.js >= 18.0.0
- npm >= 9.0.0
- Para mobile: React Native CLI, Android Studio, Xcode (para iOS)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd dy-estates

# Instalar dependencias
npm run install:all
```

### Desarrollo

```bash
# Ejecutar aplicación web
npm run dev:web

# Ejecutar aplicación móvil
npm run dev:mobile

# Ejecutar ambas aplicaciones
npm run dev
```

### Build

```bash
# Build aplicación web
npm run build:web

# Build aplicación móvil
npm run build:mobile
```

## 📁 Estructura de Carpetas

### Web (`packages/web`)
```
web/
├── src/
│   ├── app/                 # App Router (Next.js 14)
│   │   ├── (auth)/         # Rutas de autenticación
│   │   ├── (dashboard)/    # Dashboard principal
│   │   ├── globals.css     # Estilos globales
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página de inicio
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/            # Componentes base UI
│   │   ├── forms/         # Componentes de formularios
│   │   └── layout/        # Componentes de layout
│   ├── context/           # Context providers
│   ├── hooks/             # Custom hooks
│   ├── services/          # Servicios API
│   ├── store/             # Estado global (Zustand)
│   ├── utils/             # Funciones utilitarias
│   └── types/             # Tipos TypeScript locales
├── public/                # Archivos estáticos
├── messages/              # Archivos de traducción
└── next.config.js         # Configuración Next.js
```

### Mobile (`packages/mobile`)
```
mobile/
├── src/
│   ├── screens/           # Pantallas de la aplicación
│   ├── components/        # Componentes reutilizables
│   ├── navigation/        # Configuración de navegación
│   ├── context/          # Context providers
│   ├── hooks/            # Custom hooks
│   ├── services/         # Servicios API
│   ├── store/            # Estado global (Zustand)
│   ├── utils/            # Funciones utilitarias
│   └── types/            # Tipos TypeScript locales
├── assets/               # Imágenes, fuentes, etc.
└── App.tsx               # Componente principal
```

### Shared (`packages/shared`)
```
shared/
├── src/
│   ├── types/            # Interfaces y tipos compartidos
│   ├── utils/            # Utilidades compartidas
│   ├── constants/        # Constantes de la aplicación
│   ├── schemas/          # Esquemas de validación (Zod)
│   └── api/              # Tipos y configuraciones de API
└── index.ts              # Punto de entrada
```

## 🔐 Autenticación

El sistema de autenticación está preparado para:
- **JWT Tokens** - Autenticación basada en tokens
- **Refresh Tokens** - Renovación automática de tokens
- **Role-based Access** - Control de acceso basado en roles
- **Persistent Login** - Mantener sesión activa

## 🌐 Internacionalización

Soporte para múltiples idiomas:
- **Español (ES)** - Idioma por defecto
- **Inglés (EN)** - Idioma secundario
- Extensible para más idiomas

## 📱 Features Principales

- ✅ **Dashboard inmobiliario** - Vista general de propiedades
- ✅ **Gestión de propiedades** - CRUD completo
- ✅ **Sistema de búsqueda** - Filtros avanzados
- ✅ **Mapa interactivo** - Visualización geográfica
- ✅ **Sistema de usuarios** - Roles y permisos
- ✅ **Notificaciones** - Push notifications
- ✅ **Reportes** - Analytics y métricas

## 🚀 Próximos Pasos

1. **Configurar Backend API** - Node.js/TypeScript o .NET Core
2. **Implementar autenticación** - JWT + Refresh tokens
3. **Configurar base de datos** - PostgreSQL/MySQL
4. **Integrar mapas** - Google Maps o Mapbox
5. **Configurar notificaciones** - Firebase Cloud Messaging
6. **Implementar tests** - Jest + Testing Library

## 📄 Licencia

[MIT License](LICENSE)
