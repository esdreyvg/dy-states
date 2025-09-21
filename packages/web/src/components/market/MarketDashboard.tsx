'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Home,
  Users,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { marketAnalysisService } from '../../services/rental';
import {
  LocationPriceStats,
  PropertyTypePriceStats,
  MarketChartData,
  PropertyType
} from '../../../../shared/src/types/rental';

interface MarketDashboardProps {
  className?: string;
}

interface DashboardFilters {
  location?: string;
  propertyType?: PropertyType;
  dateRange: {
    start: Date;
    end: Date;
  };
  metrics: ('price' | 'occupancy' | 'revenue' | 'demand')[];
}

const MarketDashboard: React.FC<MarketDashboardProps> = ({ className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados de datos
  const [marketData, setMarketData] = useState<MarketChartData[]>([]);
  const [locationStats, setLocationStats] = useState<LocationPriceStats[]>([]);
  const [propertyTypeStats, setPropertyTypeStats] = useState<PropertyTypePriceStats[]>([]);
  
  // Estados de filtros
  const [filters, setFilters] = useState<DashboardFilters>({
    dateRange: {
      start: new Date(new Date().getFullYear(), new Date().getMonth() - 12, 1),
      end: new Date()
    },
    metrics: ['price', 'occupancy', 'revenue']
  });

  // Estados de UI
  const [selectedChart, setSelectedChart] = useState<'trends' | 'locations' | 'types'>('trends');
  const [showFilters, setShowFilters] = useState(false);

  // Cargar datos del dashboard
  const loadDashboardData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Cargar datos de tendencias de mercado
      const marketResponse = await marketAnalysisService.getMarketChartData({
        location: filters.location,
        propertyType: filters.propertyType,
        dateRange: filters.dateRange,
        groupBy: 'month',
        metrics: filters.metrics
      });

      if (marketResponse.success) {
        setMarketData(marketResponse.data);
      }

      // Cargar estadísticas por ubicación
      const locationResponse = await marketAnalysisService.getLocationStats({
        country: 'República Dominicana'
      });

      if (locationResponse.success) {
        setLocationStats(locationResponse.data.slice(0, 10)); // Top 10 ubicaciones
      }

      // Cargar estadísticas por tipo de propiedad
      const typeResponse = await marketAnalysisService.getPropertyTypeStats({
        location: filters.location,
        dateRange: filters.dateRange
      });

      if (typeResponse.success) {
        setPropertyTypeStats(typeResponse.data);
      }

    } catch (err) {
      setError('Error al cargar datos del dashboard');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Calcular métricas generales
  const calculateOverviewMetrics = () => {
    if (!marketData.length) return null;

    const latest = marketData[marketData.length - 1];
    const previous = marketData[marketData.length - 2];

    return {
      totalListings: latest?.listings || 0,
      averagePrice: latest?.averagePrice || 0,
      occupancyRate: latest?.occupancyRate || 0,
      totalRevenue: latest?.revenue || 0,
      priceChange: previous ? ((latest?.averagePrice - previous?.averagePrice) / previous?.averagePrice) * 100 : 0,
      occupancyChange: previous ? ((latest?.occupancyRate - previous?.occupancyRate) / previous?.occupancyRate) * 100 : 0
    };
  };

  const overviewMetrics = calculateOverviewMetrics();

  // Colores para gráficas
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#F59E0B',
    danger: '#EF4444',
    purple: '#8B5CF6',
    pink: '#EC4899'
  };

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Formatear porcentaje
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Exportar dashboard
  const exportDashboard = async () => {
    try {
      // Aquí implementarías la exportación del dashboard
      console.log('Exportando dashboard...');
    } catch (err) {
      console.error('Error al exportar:', err);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-96 ${className}`}>
        <div className="flex items-center space-x-3">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500" />
          <span className="text-gray-600">Cargando estadísticas de mercado...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={loadDashboardData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header del Dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Mercado</h1>
          <p className="text-gray-600 mt-1">
            Análisis y estadísticas del mercado de alquileres vacacionales
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </button>
          
          <button
            onClick={exportDashboard}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
          
          <button
            onClick={loadDashboardData}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Filtros (colapsables) */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Filtros de Análisis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={filters.location || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Ciudad o región"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Propiedad
              </label>
              <select
                value={filters.propertyType || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  propertyType: e.target.value as PropertyType || undefined 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos los tipos</option>
                <option value={PropertyType.APARTMENT}>Apartamento</option>
                <option value={PropertyType.HOUSE}>Casa</option>
                <option value={PropertyType.VILLA}>Villa</option>
                <option value={PropertyType.STUDIO}>Estudio</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                onChange={(e) => {
                  const months = parseInt(e.target.value);
                  setFilters(prev => ({
                    ...prev,
                    dateRange: {
                      start: new Date(new Date().getFullYear(), new Date().getMonth() - months, 1),
                      end: new Date()
                    }
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="3">Últimos 3 meses</option>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Último año</option>
                <option value="24">Últimos 2 años</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Métricas Generales */}
      {overviewMetrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Propiedades Activas</p>
                <p className="text-2xl font-bold text-gray-900">{overviewMetrics.totalListings}</p>
              </div>
              <Home className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Precio Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(overviewMetrics.averagePrice)}
                </p>
                <div className="flex items-center mt-1">
                  {overviewMetrics.priceChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ml-1 ${
                    overviewMetrics.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(Math.abs(overviewMetrics.priceChange))}
                  </span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tasa de Ocupación</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPercentage(overviewMetrics.occupancyRate)}
                </p>
                <div className="flex items-center mt-1">
                  {overviewMetrics.occupancyChange >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm ml-1 ${
                    overviewMetrics.occupancyChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(Math.abs(overviewMetrics.occupancyChange))}
                  </span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(overviewMetrics.totalRevenue)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      )}

      {/* Selector de Gráficas */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setSelectedChart('trends')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                selectedChart === 'trends'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tendencias de Mercado
            </button>
            <button
              onClick={() => setSelectedChart('locations')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                selectedChart === 'locations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Por Ubicación
            </button>
            <button
              onClick={() => setSelectedChart('types')}
              className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                selectedChart === 'types'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tipos de Propiedad
            </button>
          </nav>
        </div>

        <div className="p-6">
          {selectedChart === 'trends' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Tendencias de Precios y Ocupación</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'averagePrice' ? formatCurrency(value as number) : formatPercentage(value as number),
                        name === 'averagePrice' ? 'Precio Promedio' : 'Tasa de Ocupación'
                      ]}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="averagePrice"
                      stroke={colors.primary}
                      strokeWidth={3}
                      name="Precio Promedio"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="occupancyRate"
                      stroke={colors.secondary}
                      strokeWidth={3}
                      name="Tasa de Ocupación"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedChart === 'locations' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Estadísticas por Ubicación</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="averagePrice" fill={colors.primary} name="Precio Promedio" />
                    <Bar dataKey="totalListings" fill={colors.secondary} name="Total Propiedades" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedChart === 'types' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Distribución por Tipo de Propiedad</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypeStats.map(stat => ({
                        name: stat.propertyType,
                        value: stat.totalListings,
                        propertyType: stat.propertyType
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {propertyTypeStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={Object.values(colors)[index % Object.values(colors).length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;