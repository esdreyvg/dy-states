// Admin Dashboard Component for Inmobiliaria Dyxersoft CMS
// Dashboard principal de administración con métricas y widgets

'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  AdminUser,
  PlatformMetrics,
  ActivityLog,
  UserType,
  ActivityType,
} from '../../../../shared/src/types/rental';
import { 
  adminDashboardService, 
  platformMetricsService
} from '../../services/rental';

// Tipos para el dashboard
interface DashboardSummary {
  metrics: {
    totalUsers: number;
    totalProperties: number;
    totalBookings: number;
    totalRevenue: number;
    activeUsers: number;
    newUsers: number;
    pendingProperties: number;
    pendingReviews: number;
  };
  alerts: Array<{
    type: 'warning' | 'error' | 'info';
    message: string;
    count: number;
  }>;
  recentActivity: ActivityLog[];
}

interface DashboardProps {
  currentUser: AdminUser;
}

// Colores para gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const AdminDashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [refreshInterval] = useState<number>(300); // 5 minutos

  // Cargar datos del dashboard
  useEffect(() => {
    loadDashboardData();
    
    // Configurar auto-refresh
    const interval = setInterval(loadDashboardData, refreshInterval * 1000);
    
    return () => clearInterval(interval);
  }, [selectedPeriod, refreshInterval]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar resumen del dashboard
      const summaryResponse = await adminDashboardService.getDashboardSummary();
      if (summaryResponse.success && summaryResponse.data) {
        setSummary(summaryResponse.data);
      }

      // Cargar métricas actuales
      const metricsResponse = await platformMetricsService.getCurrentMetrics();
      if (metricsResponse.success && metricsResponse.data) {
        setMetrics(metricsResponse.data);
      }

    } catch (err) {
      setError('Error al cargar los datos del dashboard');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getActivityIcon = (type: ActivityType): string => {
    switch (type) {
      case ActivityType.USER_LOGIN:
        return '🔐';
      case ActivityType.PROPERTY_CREATED:
        return '🏠';
      case ActivityType.BOOKING_CREATED:
        return '📅';
      case ActivityType.REVIEW_CREATED:
        return '⭐';
      case ActivityType.USER_CREATED:
        return '👤';
      default:
        return '📋';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">❌</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button
                  onClick={loadDashboardData}
                  className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Bienvenido, {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Selector de período */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as '7d' | '30d' | '90d')}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
              </select>
              
              {/* Botón de actualización */}
              <button
                onClick={loadDashboardData}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alertas */}
        {summary?.alerts && summary.alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Alertas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summary.alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    alert.type === 'error' ? 'bg-red-50 border-red-200' :
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">
                      {alert.type === 'error' ? '❌' : 
                       alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                    </span>
                    <div>
                      <p className={`font-medium ${
                        alert.type === 'error' ? 'text-red-800' :
                        alert.type === 'warning' ? 'text-yellow-800' :
                        'text-blue-800'
                      }`}>
                        {alert.message}
                      </p>
                      <p className={`text-sm ${
                        alert.type === 'error' ? 'text-red-600' :
                        alert.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {alert.count} elementos afectados
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Métricas principales */}
        {summary?.metrics && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Métricas Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total de usuarios */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">👥</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {formatNumber(summary.metrics.totalUsers)}
                    </p>
                    <p className="text-sm text-green-600">
                      +{summary.metrics.newUsers} nuevos
                    </p>
                  </div>
                </div>
              </div>

              {/* Total de propiedades */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">🏠</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">Propiedades</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {formatNumber(summary.metrics.totalProperties)}
                    </p>
                    <p className="text-sm text-yellow-600">
                      {summary.metrics.pendingProperties} pendientes
                    </p>
                  </div>
                </div>
              </div>

              {/* Total de reservas */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600">📅</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">Reservas</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {formatNumber(summary.metrics.totalBookings)}
                    </p>
                    <p className="text-sm text-blue-600">Este mes</p>
                  </div>
                </div>
              </div>

              {/* Ingresos totales */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-600">💰</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">Ingresos</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(summary.metrics.totalRevenue)}
                    </p>
                    <p className="text-sm text-green-600">Este mes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gráficos y estadísticas */}
        {metrics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Gráfico de usuarios por tipo */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Distribución de Usuarios
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(metrics.users.byType).map(([type, count]) => ({
                      name: type === UserType.AGENT ? 'Agentes' :
                            type === UserType.OWNER ? 'Propietarios' :
                            type === UserType.CLIENT ? 'Clientes' : 'Huéspedes',
                      value: count,
                      type
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(metrics.users.byType).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Gráfico de propiedades por tipo */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Propiedades por Tipo
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={Object.entries(metrics.properties.byType).map(([type, count]) => ({
                    type: type.replace('_', ' ').toUpperCase(),
                    count
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="type" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Actividad reciente */}
        {summary?.recentActivity && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Actividad Reciente
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {summary.recentActivity.slice(0, 10).map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {getActivityIcon(activity.activityType)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span>{activity.userName}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(activity.timestamp).toLocaleString('es-DO')}</span>
                        {activity.resourceName && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="font-medium">{activity.resourceName}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.success ? 'Éxito' : 'Error'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                Ver toda la actividad →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;