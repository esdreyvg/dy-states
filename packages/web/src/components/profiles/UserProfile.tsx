// User Profile Component for DY States
// Componente de perfil de usuario con gestión completa

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  UserProfile,
  UserType,
  VerificationStatus,
  ContactInfo,
  Address,
  UserPreferences,
} from '../../../../shared/src/types/rental';
import { profilesService } from '../../services/rental';

// Tipos auxiliares para el componente
interface UserProfileProps {
  userId?: string;
  userType: UserType;
  onProfileUpdate?: (profile: UserProfile) => void;
  isEditable?: boolean;
  showPrivateInfo?: boolean;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  displayName: string;
  bio: string;
  contactInfo: ContactInfo;
  address?: Address;
  preferences: UserPreferences;
}

// Componente principal
const UserProfileComponent: React.FC<UserProfileProps> = ({
  userId,
  userType,
  onProfileUpdate,
  isEditable = false,
  showPrivateInfo = true,
}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    displayName: '',
    bio: '',
    contactInfo: {
      email: '',
      phone: '',
      whatsapp: '',
      telegram: '',
      website: '',
      socialMedia: {
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
      },
    },
    preferences: {
      language: 'es',
      currency: 'DOP',
      timezone: 'America/Santo_Domingo',
      notifications: {
        email: true,
        sms: true,
        push: true,
        marketing: false,
      },
      privacy: {
        showContactInfo: true,
        showProperties: true,
        showReviews: true,
        allowMessages: true,
      },
    },
  });

  // Cargar perfil del usuario
  const loadUserProfile = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await profilesService.getProfile(userId);
      
      if (response.success && response.data) {
        setProfile(response.data);
        updateFormDataFromProfile(response.data);
      } else {
        setError(response.error || 'Error al cargar el perfil');
      }
    } catch (err) {
      setError('Error de conexión al cargar el perfil');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, [userId, loadUserProfile]);

  const updateFormDataFromProfile = (profileData: UserProfile) => {
    setFormData({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      displayName: profileData.displayName || '',
      bio: profileData.bio || '',
      contactInfo: { ...profileData.contactInfo },
      address: profileData.address ? { ...profileData.address } : undefined,
      preferences: { ...profileData.preferences },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field, subfield] = name.split('.');
      
      if (section === 'contactInfo') {
        if (subfield && field === 'socialMedia') {
          // Para redes sociales
          setFormData(prev => ({
            ...prev,
            contactInfo: {
              ...prev.contactInfo,
              socialMedia: {
                ...prev.contactInfo.socialMedia,
                [subfield]: value,
              },
            },
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            contactInfo: {
              ...prev.contactInfo,
              [field]: value,
            },
          }));
        }
      } else if (section === 'preferences') {
        if (subfield && (field === 'notifications' || field === 'privacy')) {
          setFormData(prev => {
            const currentFieldValue = prev.preferences[field as keyof UserPreferences];
            return {
              ...prev,
              preferences: {
                ...prev.preferences,
                [field]: {
                  ...(typeof currentFieldValue === 'object' ? currentFieldValue : {}),
                  [subfield]: value === 'true',
                },
              },
            };
          });
        } else {
          setFormData(prev => ({
            ...prev,
            preferences: {
              ...prev.preferences,
              [field]: value,
            },
          }));
        }
      } else if (section === 'address' && field) {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            [field]: value,
          } as Address,
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      setError(null);
      
      const profileData = {
        userType,
        ...formData,
        isActive: true,
      };

      let response;
      if (profile) {
        // Actualizar perfil existente
        response = await profilesService.updateProfile(profile.id, profileData);
      } else {
        // Crear nuevo perfil
        response = await profilesService.createProfile(profileData);
      }

      if (response.success && response.data) {
        setProfile(response.data);
        setIsEditing(false);
        
        if (onProfileUpdate) {
          onProfileUpdate(response.data);
        }
      } else {
        setError(response.error || 'Error al guardar el perfil');
      }
    } catch (err) {
      setError('Error de conexión al guardar el perfil');
      console.error('Error saving profile:', err);
    }
  };

  const getVerificationStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return 'text-green-600 bg-green-100';
      case VerificationStatus.PENDING:
        return 'text-yellow-600 bg-yellow-100';
      case VerificationStatus.REJECTED:
        return 'text-red-600 bg-red-100';
      case VerificationStatus.SUSPENDED:
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getVerificationStatusText = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return 'Verificado';
      case VerificationStatus.PENDING:
        return 'Pendiente';
      case VerificationStatus.REJECTED:
        return 'Rechazado';
      case VerificationStatus.SUSPENDED:
        return 'Suspendido';
      default:
        return 'Sin verificar';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando perfil...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.displayName || `${profile.firstName} ${profile.lastName}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-gray-600">
                  {(profile?.firstName?.[0] || 'U')}
                  {(profile?.lastName?.[0] || 'U')}
                </span>
              )}
            </div>
            
            {/* Estado de verificación */}
            {profile && (
              <div className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(profile.verificationStatus)}`}>
                {getVerificationStatusText(profile.verificationStatus)}
              </div>
            )}
          </div>

          {/* Información básica */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {profile ? 
                (profile.displayName || `${profile.firstName} ${profile.lastName}`) : 
                'Nuevo Usuario'
              }
            </h1>
            <p className="text-sm text-gray-600 capitalize">
              {userType === UserType.AGENT && 'Agente Inmobiliario'}
              {userType === UserType.OWNER && 'Propietario'}
              {userType === UserType.CLIENT && 'Cliente'}
              {userType === UserType.GUEST && 'Huésped'}
            </p>
            
            {profile && showPrivateInfo && (
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">
                  📧 {profile.contactInfo.email}
                </p>
                <p className="text-sm text-gray-600">
                  📱 {profile.contactInfo.phone}
                </p>
                {profile.stats && (
                  <div className="flex space-x-4 text-sm text-gray-600 mt-2">
                    <span>⭐ {profile.stats.averageRating.toFixed(1)}</span>
                    <span>📊 {profile.stats.totalReviews} reseñas</span>
                    <span>🏠 {profile.stats.totalProperties} propiedades</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        {isEditable && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    if (profile) updateFormDataFromProfile(profile);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Editar Perfil
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error mensaje */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Contenido del perfil */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Información personal */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Información Personal</h2>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre para mostrar
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biografía
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {profile?.bio && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Biografía</h3>
                  <p className="text-gray-700">{profile.bio}</p>
                </div>
              )}
              
              {profile?.address && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Ubicación</h3>
                  <p className="text-gray-700">
                    {profile.address.city}, {profile.address.state}, {profile.address.country}
                  </p>
                </div>
              )}
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Miembro desde</h3>
                <p className="text-gray-700">
                  {profile?.stats.joinedDate ? 
                    new Date(profile.stats.joinedDate).toLocaleDateString('es-DO') : 
                    'No disponible'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Información de contacto */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contacto</h2>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="contactInfo.whatsapp"
                  value={formData.contactInfo.whatsapp || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sitio Web
                </label>
                <input
                  type="url"
                  name="contactInfo.website"
                  value={formData.contactInfo.website || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {showPrivateInfo && profile && (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">📧</span>
                    <span>{profile.contactInfo.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">📱</span>
                    <span>{profile.contactInfo.phone}</span>
                  </div>
                  
                  {profile.contactInfo.whatsapp && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">💬</span>
                      <span>{profile.contactInfo.whatsapp}</span>
                    </div>
                  )}
                  
                  {profile.contactInfo.website && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">🌐</span>
                      <a 
                        href={profile.contactInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {profile.contactInfo.website}
                      </a>
                    </div>
                  )}
                </>
              )}
              
              {!showPrivateInfo && (
                <p className="text-gray-500 italic">
                  Información de contacto privada
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Estadísticas del perfil */}
      {profile?.stats && !isEditing && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Estadísticas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {profile.stats.totalProperties}
              </div>
              <div className="text-sm text-gray-600">Propiedades</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {profile.stats.totalBookings}
              </div>
              <div className="text-sm text-gray-600">Reservas</div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {profile.stats.averageRating.toFixed(1)} ⭐
              </div>
              <div className="text-sm text-gray-600">Calificación</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {profile.stats.totalReviews}
              </div>
              <div className="text-sm text-gray-600">Reseñas</div>
            </div>
          </div>
        </div>
      )}

      {/* Documentos de verificación */}
      {profile?.verificationDocuments && profile.verificationDocuments.length > 0 && !isEditing && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Documentos de Verificación</h2>
          
          <div className="space-y-3">
            {profile.verificationDocuments.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">
                    {doc.type.replace('_', ' ').toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {doc.documentNumber}
                  </div>
                </div>
                
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(doc.status)}`}>
                  {getVerificationStatusText(doc.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileComponent;