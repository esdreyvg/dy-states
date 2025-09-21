// Admin Layout Component - Main CMS Layout for Inmobiliaria Dyxersoft
// Layout principal para el sistema de administración

'use client';

import React, { useState } from 'react';
import { AdminUser } from '../../../../shared/src/types/rental';
import AdminDashboard from './AdminDashboard';
import PropertyManagement from './PropertyManagement';

interface AdminLayoutProps {
  currentUser: AdminUser;
}

type AdminSection = 'dashboard' | 'properties' | 'users' | 'roles' | 'reports' | 'settings';

const AdminLayout: React.FC<AdminLayoutProps> = ({ currentUser }) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  const navigationItems = [
    {
      id: 'dashboard' as AdminSection,
      name: 'Dashboard',
      icon: '📊',
      description: 'Vista general y métricas'
    },
    {
      id: 'properties' as AdminSection,
      name: 'Propiedades',
      icon: '🏠',
      description: 'Gestión de propiedades'
    },
    {
      id: 'users' as AdminSection,
      name: 'Usuarios',
      icon: '👥',
      description: 'Gestión de usuarios'
    },
    {
      id: 'roles' as AdminSection,
      name: 'Roles y Permisos',
      icon: '🔐',
      description: 'Control de acceso'
    },
    {
      id: 'reports' as AdminSection,
      name: 'Reportes',
      icon: '📈',
      description: 'Informes del sistema'
    },
    {
      id: 'settings' as AdminSection,
      name: 'Configuración',
      icon: '⚙️',
      description: 'Ajustes del sistema'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard currentUser={currentUser} />;
      case 'properties':
        return <PropertyManagement currentUser={currentUser} />;
      case 'users':
        return <div className="p-8 text-center text-gray-500">Módulo de usuarios en desarrollo</div>;
      case 'roles':
        return <div className="p-8 text-center text-gray-500">Módulo de roles en desarrollo</div>;
      case 'reports':
        return <div className="p-8 text-center text-gray-500">Módulo de reportes en desarrollo</div>;
      case 'settings':
        return <div className="p-8 text-center text-gray-500">Módulo de configuración en desarrollo</div>;
      default:
        return <AdminDashboard currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Logo y header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">DE</span>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">Inmobiliaria Dyxersoft</h1>
              <p className="text-sm text-gray-600">Sistema de Administración</p>
            </div>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {currentUser.firstName[0]}{currentUser.lastName[0]}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-xs text-gray-600">
                {currentUser.roles.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <button className="w-full flex items-center px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-lg mr-3">🚪</span>
            <div>
              <div className="font-medium">Cerrar Sesión</div>
              <div className="text-xs text-gray-500">Salir del sistema</div>
            </div>
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-hidden">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default AdminLayout;