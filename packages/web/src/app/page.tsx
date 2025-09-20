import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Building2, MapPin, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            {t('title', { default: 'Inmobiliaria Dyxersoft' })}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('subtitle', { 
              default: 'La plataforma inmobiliaria más moderna de Bolivia. Encuentra tu hogar ideal o invierte en las mejores propiedades.' 
            })}
          </p>
          <div className="space-x-4">
            <Button asChild size="lg">
              <Link href="/dashboard">
                {t('exploreProperties', { default: 'Explorar Propiedades' })}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/login">
                {t('login', { default: 'Iniciar Sesión' })}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('features.title', { default: '¿Por qué elegir Inmobiliaria Dyxersoft?' })}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>
                  {t('features.properties.title', { default: 'Propiedades Verificadas' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('features.properties.description', { 
                    default: 'Todas nuestras propiedades son verificadas y cuentan con documentación legal completa.' 
                  })}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>
                  {t('features.location.title', { default: 'Ubicaciones Premium' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('features.location.description', { 
                    default: 'Propiedades en las mejores zonas de Bolivia con mapas interactivos.' 
                  })}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>
                  {t('features.agents.title', { default: 'Agentes Expertos' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('features.agents.description', { 
                    default: 'Nuestro equipo de agentes inmobiliarios te acompañará en todo el proceso.' 
                  })}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle>
                  {t('features.investment.title', { default: 'Inversión Segura' })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t('features.investment.description', { 
                    default: 'Análisis de mercado y proyecciones de rentabilidad para inversores.' 
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('cta.title', { default: '¿Listo para encontrar tu próxima propiedad?' })}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('cta.description', { 
              default: 'Únete a miles de usuarios que ya encontraron su hogar ideal con Inmobiliaria Dyxersoft.' 
            })}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">
              {t('cta.button', { default: 'Comenzar Ahora' })}
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}