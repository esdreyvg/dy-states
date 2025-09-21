// Admin Page Example - Inmobiliaria Dyxersoft CMS
// Página de ejemplo para demostrar el uso del sistema de administración

'use client';

import React from 'react';
import { AdminLayout } from '../../components/admin';
import { AdminUser, AdminUserStatus } from '../../../../shared/src/types/rental';

// Usuario administrador de ejemplo
const exampleAdminUser: AdminUser = {
  id: 'admin-001',
  username: 'carlos.admin',
  email: 'admin@dominican-estates.com',
  firstName: 'Carlos',
  lastName: 'Rodríguez',
  avatar: '',
  roles: [], // Se llenarían con roles reales del sistema
  status: AdminUserStatus.ACTIVE,
  lastLogin: new Date(),
  loginCount: 42,
  preferences: {
    language: 'es',
    timezone: 'America/Santo_Domingo',
    theme: 'light',
    notificationsEnabled: true,
    emailNotifications: true
  },
  department: 'Administración',
  position: 'Administrador del Sistema',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
  createdBy: 'system'
};

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AdminLayout currentUser={exampleAdminUser} />
    </div>
  );
};

export default AdminPage;