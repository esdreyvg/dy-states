'use client';

import { useAuth } from '@/context/auth-provider';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ShieldXIcon, ArrowLeftIcon, HomeIcon } from 'lucide-react';

export default function UnauthorizedPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <ShieldXIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Acceso No Autorizado
          </h1>
          <p className="text-gray-600">
            No tienes permisos suficientes para acceder a esta página.
          </p>
        </div>

        {user && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Usuario:</span> {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Rol:</span> {user.role}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Volver Atrás
          </Button>
          
          <Button
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            <HomeIcon className="h-4 w-4 mr-2" />
            Ir al Dashboard
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Si crees que esto es un error, contacta al administrador del sistema.
          </p>
        </div>
      </div>
    </div>
  );
}