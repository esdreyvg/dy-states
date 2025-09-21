// Property Management Component for Inmobiliaria Dyxersoft CMS
// Gestión completa de propiedades para administradores

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  AdminUser,
  PropertyManagement,
  PropertyPublicationStatus,
  PropertyType,
  ActivityType,
  LogLevel,
} from '../../../../shared/src/types/rental';
import { 
  propertyManagementService,
  activityLogService 
} from '../../services/rental';

interface PropertyManagementProps {
  currentUser: AdminUser;
}

interface PropertyFilters {
  status: PropertyPublicationStatus | 'ALL';
  type: PropertyType | 'ALL';
  region: string | 'ALL';
  ownerId: string | 'ALL';
  dateRange: {
    from: string;
    to: string;
  };
  searchQuery: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PropertyManagementComponent: React.FC<PropertyManagementProps> = ({ currentUser }) => {
  const [properties, setProperties] = useState<PropertyManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<PropertyManagement | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState<PropertyFilters>({
    status: 'ALL',
    type: 'ALL',
    region: 'ALL',
    ownerId: 'ALL',
    dateRange: {
      from: '',
      to: ''
    },
    searchQuery: ''
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });

  // Estados para acciones
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [bulkSelected, setBulkSelected] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const loadProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await propertyManagementService.getProperties({
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status !== 'ALL' ? filters.status : undefined,
        search: filters.searchQuery || undefined
      });

      if (response.success && response.data) {
        setProperties(response.data.properties);
        setPagination(prev => ({
          ...prev,
          total: response.data!.total,
          totalPages: Math.ceil(response.data!.total / prev.limit)
        }));
      }
    } catch (err) {
      setError('Error al cargar las propiedades');
      console.error('Property loading error:', err);
    } finally {
      setLoading(false);
    }
  }, [filters.status, filters.searchQuery, pagination.page, pagination.limit]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  const handleStatusChange = async (propertyId: string, newStatus: PropertyPublicationStatus, reason?: string) => {
    try {
      setProcessingAction(propertyId);

      const response = await propertyManagementService.updatePropertyManagement(propertyId, {
        status: newStatus,
        reviewNotes: reason
      });

      if (response.success) {
        // Registrar actividad
        await activityLogService.createActivityLog({
          activityType: ActivityType.PROPERTY_UPDATED,
          description: `Estado de propiedad cambiado a ${newStatus}`,
          resourceType: 'property',
          resourceId: propertyId,
          metadata: { newStatus, reason },
          level: LogLevel.INFO,
          success: true
        });

        // Recargar propiedades
        await loadProperties();
        
        // Cerrar detalles si es la propiedad seleccionada
        if (selectedProperty?.propertyId === propertyId) {
          setSelectedProperty(null);
          setShowDetails(false);
        }
      }
    } catch (err) {
      setError('Error al actualizar el estado de la propiedad');
      console.error('Status update error:', err);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleBulkAction = async (action: 'approve' | 'reject' | 'suspend', reason?: string) => {
    if (bulkSelected.length === 0) return;

    try {
      setProcessingAction('bulk');

      const status = action === 'approve' ? PropertyPublicationStatus.PUBLISHED :
                    action === 'reject' ? PropertyPublicationStatus.REJECTED :
                    PropertyPublicationStatus.SUSPENDED;

      for (const propertyId of bulkSelected) {
        await handleStatusChange(propertyId, status, reason);
      }

      setBulkSelected([]);
      setShowBulkActions(false);
    } catch (err) {
      setError('Error en la acción masiva');
      console.error('Bulk action error:', err);
    } finally {
      setProcessingAction(null);
    }
  };

  const getStatusColor = (status: PropertyPublicationStatus): string => {
    switch (status) {
      case PropertyPublicationStatus.PUBLISHED:
        return 'bg-green-100 text-green-800';
      case PropertyPublicationStatus.PENDING_REVIEW:
        return 'bg-yellow-100 text-yellow-800';
      case PropertyPublicationStatus.DRAFT:
        return 'bg-gray-100 text-gray-800';
      case PropertyPublicationStatus.REJECTED:
        return 'bg-red-100 text-red-800';
      case PropertyPublicationStatus.SUSPENDED:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: PropertyPublicationStatus): string => {
    switch (status) {
      case PropertyPublicationStatus.PUBLISHED:
        return 'Publicada';
      case PropertyPublicationStatus.PENDING_REVIEW:
        return 'Pendiente Revisión';
      case PropertyPublicationStatus.DRAFT:
        return 'Borrador';
      case PropertyPublicationStatus.REJECTED:
        return 'Rechazada';
      case PropertyPublicationStatus.SUSPENDED:
        return 'Suspendida';
      default:
        return 'Desconocido';
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading && properties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando propiedades...</p>
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
                Gestión de Propiedades
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Administra y modera las propiedades de la plataforma
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Selector de acciones masivas */}
              {bulkSelected.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {bulkSelected.length} seleccionadas
                  </span>
                  <button
                    onClick={() => setShowBulkActions(!showBulkActions)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                  >
                    Acciones Masivas
                  </button>
                </div>
              )}

              <button
                onClick={loadProperties}
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors"
                disabled={loading}
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Filtro por estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as PropertyPublicationStatus | 'ALL' })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Todos los estados</option>
                <option value={PropertyPublicationStatus.PENDING_REVIEW}>Pendiente Revisión</option>
                <option value={PropertyPublicationStatus.PUBLISHED}>Publicadas</option>
                <option value={PropertyPublicationStatus.REJECTED}>Rechazadas</option>
                <option value={PropertyPublicationStatus.SUSPENDED}>Suspendidas</option>
                <option value={PropertyPublicationStatus.DRAFT}>Borradores</option>
              </select>
            </div>

            {/* Filtro por tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value as PropertyType | 'ALL' })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Todos los tipos</option>
                <option value={PropertyType.APARTMENT}>Apartamento</option>
                <option value={PropertyType.HOUSE}>Casa</option>
                <option value={PropertyType.VILLA}>Villa</option>
                <option value={PropertyType.STUDIO}>Estudio</option>
              </select>
            </div>

            {/* Filtro por región */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Región
              </label>
              <select
                value={filters.region}
                onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">Todas las regiones</option>
                <option value="Santo Domingo">Santo Domingo</option>
                <option value="Santiago">Santiago</option>
                <option value="Punta Cana">Punta Cana</option>
                <option value="Puerto Plata">Puerto Plata</option>
                <option value="La Romana">La Romana</option>
              </select>
            </div>

            {/* Búsqueda */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar
              </label>
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                placeholder="Buscar por título, propietario, ID..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">❌</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Acciones masivas */}
        {showBulkActions && bulkSelected.length > 0 && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-3">
              Acciones Masivas ({bulkSelected.length} propiedades)
            </h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleBulkAction('approve')}
                disabled={processingAction === 'bulk'}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                ✅ Aprobar
              </button>
              <button
                onClick={() => handleBulkAction('reject', 'Rechazo masivo')}
                disabled={processingAction === 'bulk'}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                ❌ Rechazar
              </button>
              <button
                onClick={() => handleBulkAction('suspend', 'Suspensión masiva')}
                disabled={processingAction === 'bulk'}
                className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition-colors disabled:opacity-50"
              >
                ⏸️ Suspender
              </button>
              <button
                onClick={() => {
                  setBulkSelected([]);
                  setShowBulkActions(false);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de propiedades */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {properties.length === 0 && !loading ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏠</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron propiedades
              </h3>
              <p className="text-gray-600">
                No hay propiedades que coincidan con los filtros seleccionados.
              </p>
            </div>
          ) : (
            <>
              {/* Header de tabla */}
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={bulkSelected.length === properties.length && properties.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setBulkSelected(properties.map(p => p.propertyId));
                      } else {
                        setBulkSelected([]);
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Seleccionar todo
                  </span>
                </div>
              </div>

              {/* Lista de propiedades */}
              <div className="divide-y divide-gray-200">
                {properties.map((propertyMgmt) => (
                  <div key={propertyMgmt.propertyId} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={bulkSelected.includes(propertyMgmt.propertyId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelected([...bulkSelected, propertyMgmt.propertyId]);
                          } else {
                            setBulkSelected(bulkSelected.filter(id => id !== propertyMgmt.propertyId));
                          }
                        }}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />

                      {/* Imagen placeholder */}
                      <div className="flex-shrink-0">
                        <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-500 text-2xl">🏠</span>
                        </div>
                      </div>

                      {/* Información de la propiedad */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {propertyMgmt.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {propertyMgmt.location.city}, {propertyMgmt.location.state}
                            </p>
                            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                              <span>ID: {propertyMgmt.propertyId}</span>
                              <span>Propietario: {propertyMgmt.ownerName}</span>
                              <span className="font-semibold text-blue-600">
                                {formatCurrency(propertyMgmt.pricing.basePrice)}/{propertyMgmt.pricing.priceType === 'per_night' ? 'noche' : 'mes'}
                              </span>
                            </div>
                          </div>

                          {/* Estado y acciones */}
                          <div className="flex items-center space-x-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(propertyMgmt.status)}`}>
                              {getStatusText(propertyMgmt.status)}
                            </span>
                            
                            <button
                              onClick={() => {
                                setSelectedProperty(propertyMgmt);
                                setShowDetails(true);
                              }}
                              className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                            >
                              Ver Detalles
                            </button>
                          </div>
                        </div>

                        {/* Información adicional */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>Creada: {new Date(propertyMgmt.createdAt).toLocaleDateString('es-DO')}</span>
                            {propertyMgmt.reviewedAt && (
                              <span>Revisada: {new Date(propertyMgmt.reviewedAt).toLocaleDateString('es-DO')}</span>
                            )}
                            {propertyMgmt.reviewedBy && (
                              <span>Por: {propertyMgmt.reviewedBy}</span>
                            )}
                          </div>

                          {/* Acciones rápidas */}
                          {propertyMgmt.status === PropertyPublicationStatus.PENDING_REVIEW && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleStatusChange(propertyMgmt.propertyId, PropertyPublicationStatus.PUBLISHED)}
                                disabled={processingAction === propertyMgmt.propertyId}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors disabled:opacity-50"
                              >
                                ✅ Aprobar
                              </button>
                              <button
                                onClick={() => handleStatusChange(propertyMgmt.propertyId, PropertyPublicationStatus.REJECTED, 'Requiere revisión')}
                                disabled={processingAction === propertyMgmt.propertyId}
                                className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors disabled:opacity-50"
                              >
                                ❌ Rechazar
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Razón de rechazo/suspensión */}
                        {propertyMgmt.rejectionReason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-800">
                              <strong>Razón:</strong> {propertyMgmt.rejectionReason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{' '}
                    {Math.min(pagination.page * pagination.limit, pagination.total)} de{' '}
                    {pagination.total} propiedades
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPagination({ ...pagination, page: Math.max(1, pagination.page - 1) })}
                      disabled={pagination.page === 1 || loading}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Anterior
                    </button>
                    <span className="text-sm text-gray-700">
                      Página {pagination.page} de {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setPagination({ ...pagination, page: Math.min(pagination.totalPages, pagination.page + 1) })}
                      disabled={pagination.page === pagination.totalPages || loading}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      {showDetails && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Detalles de Propiedad
              </h2>
              <button
                onClick={() => {
                  setShowDetails(false);
                  setSelectedProperty(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ❌
              </button>
            </div>
            
            <div className="p-6">
              {/* Aquí iría el componente detallado de la propiedad */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{selectedProperty.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Estado:</strong> {getStatusText(selectedProperty.status)}
                    </div>
                    <div>
                      <strong>Precio:</strong> {formatCurrency(selectedProperty.pricing.basePrice)}/{selectedProperty.pricing.priceType === 'per_night' ? 'noche' : 'mes'}
                    </div>
                    <div>
                      <strong>Propietario:</strong> {selectedProperty.ownerName}
                    </div>
                    <div>
                      <strong>Fecha de creación:</strong> {new Date(selectedProperty.createdAt).toLocaleDateString('es-DO')}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Descripción:</h4>
                  <p className="text-gray-700">{selectedProperty.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ubicación:</h4>
                  <p className="text-gray-700">
                    {selectedProperty.location.city}, {selectedProperty.location.state}<br />
                    {selectedProperty.location.country}
                  </p>
                </div>

                {/* Acciones de moderación */}
                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                  {selectedProperty.status === PropertyPublicationStatus.PENDING_REVIEW && (
                    <>
                      <button
                        onClick={() => handleStatusChange(selectedProperty.propertyId, PropertyPublicationStatus.PUBLISHED)}
                        disabled={processingAction === selectedProperty.propertyId}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        ✅ Aprobar Publicación
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedProperty.propertyId, PropertyPublicationStatus.REJECTED, 'Requiere correcciones')}
                        disabled={processingAction === selectedProperty.propertyId}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        ❌ Rechazar
                      </button>
                    </>
                  )}
                  
                  {selectedProperty.status === PropertyPublicationStatus.PUBLISHED && (
                    <button
                      onClick={() => handleStatusChange(selectedProperty.propertyId, PropertyPublicationStatus.SUSPENDED, 'Suspendido por administrador')}
                      disabled={processingAction === selectedProperty.propertyId}
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50"
                    >
                      ⏸️ Suspender
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagementComponent;