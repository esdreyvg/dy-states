// Admin Components Index
// Exportaciones centralizadas de componentes de administración

export { default as AdminLayout } from './AdminLayout';
export { default as AdminDashboard } from './AdminDashboard';
export { default as PropertyManagement } from './PropertyManagement';

// Tipos y interfaces para componentes admin
export interface AdminComponentProps {
  currentUser: import('../../../../shared/src/types/rental').AdminUser;
}

// Configuraciones comunes
export const ADMIN_CONFIG = {
  PAGINATION_DEFAULT_LIMIT: 20,
  REFRESH_INTERVAL: 300, // 5 minutos
  SUPPORTED_LOCALES: ['es-DO', 'en-US'],
  DEFAULT_CURRENCY: 'DOP',
  AVAILABLE_REGIONS: [
    'Santo Domingo',
    'Santiago',
    'Punta Cana',
    'Puerto Plata',
    'La Romana',
    'Bávaro',
    'Cap Cana',
    'Juan Dolio',
    'Sosúa',
    'Cabarete'
  ]
} as const;