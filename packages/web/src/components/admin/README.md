# Módulo de Administración (CMS) - Inmobiliaria Dyxersoft

## Descripción General

El módulo de administración es un sistema completo de gestión de contenido (CMS) para la plataforma Inmobiliaria Dyxersoft. Proporciona herramientas administrativas para gestionar propiedades, usuarios, roles, permisos y generar reportes del sistema.

## Características Principales

### 📊 Dashboard Administrativo
- **Métricas en Tiempo Real**: Visualización de estadísticas clave de la plataforma
- **Gráficos Interactivos**: Distribución de usuarios, propiedades por tipo, ingresos
- **Alertas del Sistema**: Notificaciones importantes y elementos que requieren atención
- **Actividad Reciente**: Registro en tiempo real de las acciones del sistema

### 🏠 Gestión de Propiedades
- **Moderación de Contenido**: Aprobar, rechazar o suspender publicaciones
- **Filtros Avanzados**: Por estado, tipo, región, propietario, fecha
- **Acciones Masivas**: Procesar múltiples propiedades simultáneamente
- **Vista Detallada**: Información completa de cada propiedad
- **Historial de Cambios**: Seguimiento de modificaciones y decisiones

### 👥 Gestión de Usuarios (En Desarrollo)
- Control de acceso y permisos
- Activación/desactivación de cuentas
- Asignación de roles
- Historial de actividad

### 🔐 Roles y Permisos (En Desarrollo)
- Sistema granular de permisos
- Roles predefinidos y personalizados
- Control de acceso por módulos

### 📈 Reportes del Sistema (En Desarrollo)
- Generación de informes automatizados
- Exportación de datos
- Programación de reportes

## Arquitectura Técnica

### Componentes Principales

```typescript
// Layout principal del sistema
AdminLayout: React.FC<AdminLayoutProps>

// Dashboard con métricas
AdminDashboard: React.FC<DashboardProps>

// Gestión de propiedades
PropertyManagement: React.FC<PropertyManagementProps>
```

### Tipos y Interfaces

```typescript
// Usuario administrador
interface AdminUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  status: AdminUserStatus;
  // ... más campos
}

// Gestión de propiedades
interface PropertyManagement {
  id: string;
  propertyId: string;
  title: string;
  status: PropertyPublicationStatus;
  // ... más campos
}
```

### Servicios API

```typescript
// APIs de administración
- AdminDashboardAPI: Métricas y resúmenes
- PropertyManagementAPI: Gestión de propiedades
- AdminUserManagementAPI: Gestión de usuarios
- RolePermissionAPI: Control de acceso
- ActivityLogAPI: Registro de actividades
- PlatformMetricsAPI: Métricas del sistema
- SystemConfigAPI: Configuración
- AdminNotificationAPI: Notificaciones
- SystemReportAPI: Generación de reportes
```

## Instalación y Configuración

### Requisitos Previos
- Node.js 18+
- TypeScript 5+
- React 18+
- Next.js 14+

### Dependencias
```bash
npm install recharts  # Para gráficos y visualización
```

### Configuración de Rutas
```typescript
// En tu aplicación Next.js
// app/admin/page.tsx
import { AdminLayout } from '../../components/admin';

export default function AdminPage() {
  return <AdminLayout currentUser={currentUser} />;
}
```

## Uso del Sistema

### Acceso al Dashboard
1. Navegar a `/admin`
2. Autenticarse con credenciales de administrador
3. El dashboard se carga automáticamente con métricas actuales

### Gestión de Propiedades
1. Seleccionar "Propiedades" en el menú lateral
2. Usar filtros para encontrar propiedades específicas
3. Realizar acciones individuales o masivas:
   - ✅ Aprobar publicación
   - ❌ Rechazar con razón
   - ⏸️ Suspender temporalmente

### Filtros Disponibles
- **Estado**: Pendiente, Publicada, Rechazada, Suspendida
- **Tipo**: Apartamento, Casa, Villa, Estudio
- **Región**: Ciudades principales de República Dominicana
- **Búsqueda**: Por título, propietario, ID

## Características de Seguridad

### Control de Acceso
- Autenticación requerida para todas las rutas admin
- Verificación de permisos por acción
- Registro completo de actividades (audit log)

### Validación de Datos
- Esquemas Zod para validación en tiempo real
- Mensajes de error en español
- Sanitización de inputs

### Registro de Actividades
```typescript
// Ejemplo de log de actividad
await activityLogService.createActivityLog({
  activityType: ActivityType.PROPERTY_UPDATED,
  description: 'Estado de propiedad cambiado a PUBLISHED',
  resourceType: 'property',
  resourceId: propertyId,
  level: LogLevel.INFO,
  success: true
});
```

## Personalización y Extensión

### Agregar Nuevas Secciones
```typescript
// En AdminLayout.tsx
const navigationItems = [
  // ... items existentes
  {
    id: 'new-section' as AdminSection,
    name: 'Nueva Sección',
    icon: '🔧',
    description: 'Descripción de la nueva sección'
  }
];
```

### Crear Nuevos Servicios
```typescript
class NewModuleAPI extends BaseApiService {
  constructor() {
    super('admin/new-module');
  }
  
  async getModuleData(): Promise<ApiResponse<ModuleData>> {
    return this.get<ModuleData>('/');
  }
}
```

## Configuración Regional

### Soporte Multi-idioma
- Interfaz en español (es-DO)
- Formatos de fecha localizados
- Moneda en pesos dominicanos (DOP)

### Zonas Horarias
- Configurado para America/Santo_Domingo
- Timestamps automáticos en hora local

## Mejores Prácticas

### Performance
- Paginación en todas las listas
- Carga lazy de componentes pesados
- Debounce en búsquedas
- Cache de datos frecuentes

### UX/UI
- Feedback visual para todas las acciones
- Estados de carga informativos
- Confirmaciones para acciones críticas
- Navegación intuitiva

### Desarrollo
```typescript
// Usar useCallback para funciones pesadas
const loadData = useCallback(async () => {
  // ... lógica de carga
}, [dependencies]);

// Validar props con TypeScript
interface ComponentProps {
  currentUser: AdminUser;
  onAction?: (action: string) => void;
}
```

## Roadmap

### Próximas Funcionalidades
- [ ] Gestión completa de usuarios
- [ ] Sistema de roles granular
- [ ] Generador de reportes avanzado
- [ ] Panel de configuración del sistema
- [ ] Notificaciones push en tiempo real
- [ ] Dashboard personalizable
- [ ] Exportación de datos a Excel/PDF
- [ ] Backup automático del sistema

### Mejoras Planificadas
- [ ] Modo oscuro
- [ ] Soporte multi-idioma completo
- [ ] API webhooks
- [ ] Integración con servicios externos
- [ ] Dashboard móvil responsivo

## Soporte y Documentación

### API Reference
Todos los servicios están documentados con TypeScript interfaces y JSDoc comments.

### Troubleshooting
- Verificar permisos de usuario
- Revisar logs de actividad
- Comprobar configuración de API endpoints

### Contacto
Para soporte técnico y consultas, contactar al equipo de desarrollo de Inmobiliaria Dyxersoft.

---

*Documento actualizado: Diciembre 2024*
*Versión del sistema: 1.0.0*