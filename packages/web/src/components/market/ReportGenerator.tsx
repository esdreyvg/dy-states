"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Home,
  Filter,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ReportGeneratorProps {
  className?: string;
}

interface ReportConfig {
  title: string;
  type: 'market_analysis' | 'property_valuation' | 'price_trends' | 'comparison';
  location: string;
  dateRange: {
    start: Date;
    end: Date;
  };
  includeCharts: boolean;
  includeDetails: boolean;
  format: 'pdf' | 'csv' | 'excel';
  propertyTypes: string[];
}

interface GeneratedReport {
  id: string;
  title: string;
  type: string;
  generatedAt: Date;
  status: 'generating' | 'completed' | 'error';
  downloadUrl?: string;
  size?: string;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ className }) => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    title: '',
    type: 'market_analysis',
    location: '',
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 días atrás
      end: new Date()
    },
    includeCharts: true,
    includeDetails: true,
    format: 'pdf',
    propertyTypes: []
  });

  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([
    {
      id: '1',
      title: 'Análisis de Mercado Madrid Centro',
      type: 'Análisis de Mercado',
      generatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
      status: 'completed',
      downloadUrl: '#',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Tendencias de Precios Q1 2024',
      type: 'Tendencias de Precios',
      generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 día atrás
      status: 'completed',
      downloadUrl: '#',
      size: '1.8 MB'
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  // Tipos de reporte disponibles
  const reportTypes = [
    {
      value: 'market_analysis',
      label: 'Análisis de Mercado',
      description: 'Estadísticas completas del mercado inmobiliario',
      icon: BarChart3
    },
    {
      value: 'property_valuation',
      label: 'Valoración de Propiedades',
      description: 'Valoraciones detalladas de propiedades específicas',
      icon: Home
    },
    {
      value: 'price_trends',
      label: 'Tendencias de Precios',
      description: 'Evolución histórica de precios por zona',
      icon: TrendingUp
    },
    {
      value: 'comparison',
      label: 'Comparación de Propiedades',
      description: 'Análisis comparativo entre propiedades',
      icon: Filter
    }
  ];

  // Tipos de propiedad
  const propertyTypes = [
    'Apartamento',
    'Casa',
    'Estudio',
    'Loft',
    'Villa',
    'Penthouse',
    'Townhouse',
    'Bungalow'
  ];

  // Generar reporte
  const generateReport = async () => {
    if (!reportConfig.title || !reportConfig.location) return;

    setIsGenerating(true);
    
    try {
      // Simular generación de reporte
      const newReport: GeneratedReport = {
        id: Date.now().toString(),
        title: reportConfig.title,
        type: reportTypes.find(t => t.value === reportConfig.type)?.label || reportConfig.type,
        generatedAt: new Date(),
        status: 'generating'
      };

      setGeneratedReports(prev => [newReport, ...prev]);

      // Simular proceso de generación
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Actualizar estado a completado
      setGeneratedReports(prev => 
        prev.map(report => 
          report.id === newReport.id 
            ? { 
                ...report, 
                status: 'completed' as const, 
                downloadUrl: '#',
                size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
              }
            : report
        )
      );

      // Limpiar formulario
      setReportConfig(prev => ({
        ...prev,
        title: '',
        location: ''
      }));

    } catch (error) {
      console.error('Error generando reporte:', error);
      // Actualizar estado a error
      setGeneratedReports(prev => 
        prev.map(report => 
          report.id === reportConfig.title 
            ? { ...report, status: 'error' as const }
            : report
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Descargar reporte
  const downloadReport = (report: GeneratedReport) => {
    if (report.status === 'completed' && report.downloadUrl) {
      // Simular descarga
      console.log(`Descargando: ${report.title}`);
      // En una aplicación real, esto abriría el enlace de descarga
      alert(`Descargando: ${report.title}`);
    }
  };

  // Formatear fecha
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Configuración del reporte */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Configurar Nuevo Reporte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Información básica */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Título del Reporte *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Análisis Q1 2024 Madrid"
                value={reportConfig.title}
                onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Madrid, Barcelona, Valencia"
                value={reportConfig.location}
                onChange={(e) => setReportConfig(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
          </div>

          {/* Tipo de reporte */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Tipo de Reporte
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              {reportTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <div
                    key={type.value}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      reportConfig.type === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setReportConfig(prev => ({ ...prev, type: type.value as ReportConfig['type'] }))}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-medium">{type.label}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rango de fechas */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reportConfig.dateRange.start.toISOString().split('T')[0]}
                onChange={(e) => setReportConfig(prev => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange,
                    start: new Date(e.target.value)
                  }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Fecha de Fin
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reportConfig.dateRange.end.toISOString().split('T')[0]}
                onChange={(e) => setReportConfig(prev => ({
                  ...prev,
                  dateRange: {
                    ...prev.dateRange,
                    end: new Date(e.target.value)
                  }
                }))}
              />
            </div>
          </div>

          {/* Tipos de propiedad */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Tipos de Propiedad (opcional)
            </label>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              {propertyTypes.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={reportConfig.propertyTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setReportConfig(prev => ({
                          ...prev,
                          propertyTypes: [...prev.propertyTypes, type]
                        }));
                      } else {
                        setReportConfig(prev => ({
                          ...prev,
                          propertyTypes: prev.propertyTypes.filter(t => t !== type)
                        }));
                      }
                    }}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opciones adicionales */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Formato
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reportConfig.format}
                onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value as ReportConfig['format'] }))}
              >
                <option value="pdf">PDF</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
              </select>
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={reportConfig.includeCharts}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                />
                <span className="text-sm">Incluir gráficas</span>
              </label>
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={reportConfig.includeDetails}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, includeDetails: e.target.checked }))}
                />
                <span className="text-sm">Detalles completos</span>
              </label>
            </div>
          </div>

          {/* Botón generar */}
          <div className="pt-4 border-t">
            <Button 
              onClick={generateReport} 
              disabled={isGenerating || !reportConfig.title || !reportConfig.location}
              className="w-full md:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando Reporte...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generar Reporte
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de reportes generados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Reportes Generados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedReports.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No hay reportes generados aún</p>
              <p className="text-sm">Configura y genera tu primer reporte arriba</p>
            </div>
          ) : (
            <div className="space-y-3">
              {generatedReports.map((report) => (
                <div
                  key={report.id}
                  className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {report.status === 'completed' && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {report.status === 'generating' && (
                            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                          )}
                          {report.status === 'error' && (
                            <AlertCircle className="h-5 w-5 text-red-600" />
                          )}
                          <h3 className="font-medium">{report.title}</h3>
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {report.type}
                        </span>
                        {report.status === 'generating' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            Generando...
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(report.generatedAt)}
                        </span>
                        {report.size && (
                          <span>{report.size}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === 'completed' && (
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center gap-2"
                          onClick={() => downloadReport(report)}
                        >
                          <Download className="h-4 w-4" />
                          Descargar
                        </button>
                      )}
                      {report.status === 'error' && (
                        <span className="text-red-600 text-sm">Error al generar</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportGenerator;