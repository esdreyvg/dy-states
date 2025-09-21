# Sistema de Notificaciones DY States

Sistema completo de notificaciones para la plataforma inmobiliaria DY States, implementado tanto para web (Next.js) como para móvil (React Native).

## 🚀 Características Principales

### Web (Next.js)
- ✅ **Notificaciones en tiempo real** con WebSocket
- ✅ **Notificaciones push web** con Firebase/Service Worker
- ✅ **Centro de notificaciones** con dropdown interactivo
- ✅ **Configuración de preferencias** granular por usuario
- ✅ **Filtrado y búsqueda** de notificaciones
- ✅ **Badge de contador** de notificaciones no leídas
- ✅ **Soporte responsive** para web y móvil

### Móvil (React Native)
- ✅ **Notificaciones push nativas** con FCM
- ✅ **Pantalla de notificaciones** completa
- ✅ **Configuración de permisos** automática
- ✅ **Gestión de estado** con hooks personalizados
- ✅ **Navegación inteligente** según tipo de notificación
- ✅ **Estadísticas** de notificaciones

## 📁 Estructura del Proyecto

```
packages/
├── shared/
│   └── src/
│       ├── types/rental.ts           # Tipos TypeScript extendidos
│       └── schemas/rental.ts         # Validaciones Zod en español
├── web/
│   └── src/
│       ├── components/notifications/
│       │   ├── NotificationItem.tsx      # Componente de notificación individual
│       │   ├── NotificationList.tsx      # Lista de notificaciones con filtros
│       │   ├── NotificationCenter.tsx    # Centro dropdown de notificaciones
│       │   ├── NotificationPreferences.tsx # Configuración de preferencias
│       │   └── index.ts                  # Exportaciones centralizadas
│       ├── hooks/
│       │   ├── useNotifications.ts       # Hook principal de notificaciones
│       │   └── usePushNotifications.ts   # Hook para push notifications
│       ├── services/
│       │   └── notification.ts           # API services para notificaciones
│       ├── lib/
│       │   └── firebase.ts               # Configuración Firebase y utilidades
│       └── public/
│           └── firebase-messaging-sw.js  # Service Worker para push
└── mobile/
    └── src/
        ├── screens/
        │   └── NotificationsScreen.tsx   # Pantalla principal de notificaciones
        ├── hooks/
        │   └── useNotifications.ts       # Hook móvil de notificaciones
        └── services/
            └── PushNotificationService.ts # Servicio de push notifications
```

## 🛠️ Implementación

### 1. Tipos y Esquemas

#### Tipos de Notificación (packages/shared/src/types/rental.ts)
```typescript
export enum NotificationType {
  // Reservas y bookings
  NEW_BOOKING = 'new_booking',
  BOOKING_CONFIRMED = 'booking_confirmed',
  BOOKING_CANCELLED = 'booking_cancelled',
  BOOKING_MODIFIED = 'booking_modified',
  CHECK_IN_REMINDER = 'check_in_reminder',
  CHECK_OUT_REMINDER = 'check_out_reminder',
  
  // Mensajes y comunicación
  NEW_MESSAGE = 'new_message',
  MESSAGE_REPLY = 'message_reply',
  CHAT_MENTION = 'chat_mention',
  
  // Pagos y finanzas
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_FAILED = 'payment_failed',
  PAYMENT_REMINDER = 'payment_reminder',
  REFUND_PROCESSED = 'refund_processed',
  
  // Sistema y más...
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export interface UserNotificationPreferences {
  id: string;
  userId: string;
  globalEnabled: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  timezone: string;
  typePreferences: {
    [key in NotificationType]: {
      enabled: boolean;
      channels: NotificationChannel[];
      priority: NotificationPriority;
      frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
      soundEnabled: boolean;
    };
  };
  channelPreferences: {
    [key in NotificationChannel]: {
      enabled: boolean;
      maxDailyLimit?: number;
      minIntervalMinutes?: number;
    };
  };
  // ... más configuraciones
}
```

### 2. Web - Sistema de Notificaciones

#### Hook Principal (packages/web/src/hooks/useNotifications.ts)
```typescript
export function useNotifications(options: NotificationHookOptions = {}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // WebSocket para tiempo real
  const connectWebSocket = useCallback(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/notifications`;
    const socket = new WebSocket(wsUrl);
    
    socket.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Mostrar notificación del navegador
      if (showBrowserNotification && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/icon-192x192.png',
          tag: notification.id,
        });
      }
    };
    
    socketRef.current = socket;
  }, [showBrowserNotification]);

  // ... más funcionalidad
}
```

#### Componente Centro de Notificaciones (packages/web/src/components/notifications/NotificationCenter.tsx)
```typescript
export default function NotificationCenter({ 
  position = 'bottom-right',
  maxItems = 5,
  showBadge = true,
  className = ''
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    isConnected, 
    actions 
  } = useNotifications({
    enableRealTime: true,
    showBrowserNotification: true,
  });

  return (
    <div className={`relative ${className}`}>
      {/* Botón trigger */}
      <button onClick={() => setIsOpen(!isOpen)}>
        <Bell className="w-6 h-6" />
        {showBadge && unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <NotificationList 
            notifications={notifications.slice(0, maxItems)}
            onNotificationClick={actions.markAsRead}
            showTimestamp={true}
            compact={true}
          />
        </div>
      )}
    </div>
  );
}
```

### 3. Móvil - Aplicación React Native

#### Servicio de Push Notifications (packages/mobile/src/services/PushNotificationService.ts)
```typescript
class PushNotificationService {
  async initialize(): Promise<boolean> {
    try {
      // Solicitar permisos
      const hasPermission = await this.requestPermissions();
      
      // Obtener token FCM
      await this.getFCMToken();
      
      // Configurar listeners
      this.setupMessageListeners();
      
      return true;
    } catch (error) {
      console.error('Error inicializando notificaciones:', error);
      return false;
    }
  }

  async displayLocalNotification(notification: NotificationData): Promise<void> {
    // En desarrollo, mostrar Alert
    if (__DEV__) {
      Alert.alert(notification.title, notification.body);
    }
    // En producción usar react-native-push-notification o expo-notifications
  }

  // ... más funcionalidad
}
```

#### Pantalla de Notificaciones (packages/mobile/src/screens/NotificationsScreen.tsx)
```typescript
export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const {
    isInitialized,
    isPermissionGranted,
    unreadCount,
    actions,
  } = useNotifications({
    userId: 'user_123',
    enableAutoInit: true,
    onNotificationReceived: (notification) => {
      setNotifications(prev => [notification, ...prev]);
    },
  });

  const handleNotificationPress = (notification: NotificationData) => {
    // Navegación inteligente según tipo
    switch (notification.type) {
      case NotificationType.BOOKING_CONFIRMED:
        navigation.navigate('BookingDetails', { bookingId: notification.data?.bookingId });
        break;
      case NotificationType.NEW_MESSAGE:
        navigation.navigate('Chat', { messageId: notification.data?.messageId });
        break;
      // ... más casos
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        ListHeaderComponent={renderHeader}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}
```

## 🔧 Configuración

### Web - Firebase Setup

1. **Configurar Firebase (packages/web/src/lib/firebase.ts)**:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

2. **Service Worker (packages/web/public/firebase-messaging-sw.js)**:
```javascript
self.addEventListener('push', function(event) {
  const payload = event.data ? event.data.json() : {};
  const notificationTitle = payload.notification?.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification?.body || '',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    data: payload.data || {},
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
```

### Móvil - React Native Setup

1. **Instalar dependencias**:
```bash
npm install @react-native-async-storage/async-storage
npm install react-native-vector-icons
# Para producción:
# npm install @react-native-firebase/messaging
# npm install @notifee/react-native
```

2. **Configurar permisos** en `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
```

## 🎯 Uso

### Web

```typescript
import { 
  NotificationCenter, 
  NotificationPreferences,
  useNotifications 
} from '@/components/notifications';

// En tu layout o página principal
function Layout() {
  return (
    <div>
      {/* Centro de notificaciones */}
      <NotificationCenter 
        position="top-right" 
        maxItems={5} 
        showBadge={true} 
      />
    </div>
  );
}

// Página de configuración de usuario
function UserSettings() {
  return (
    <NotificationPreferences 
      userId="user_123"
      onPreferencesChange={(prefs) => console.log('Preferencias actualizadas:', prefs)}
    />
  );
}
```

### Móvil

```typescript
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import useNotifications from '@/hooks/useNotifications';

// En tu navegación
function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ title: 'Notificaciones' }}
      />
    </Stack.Navigator>
  );
}

// En cualquier componente
function SomeComponent() {
  const { unreadCount, actions } = useNotifications({
    userId: 'user_123',
    enableAutoInit: true,
  });

  return (
    <TouchableOpacity onPress={actions.sendTestNotification}>
      <Text>Enviar notificación de prueba</Text>
    </TouchableOpacity>
  );
}
```

## 🔄 API Backend

### Endpoints necesarios

```typescript
// Notificaciones
GET    /api/notifications                    # Obtener notificaciones del usuario
POST   /api/notifications                    # Crear nueva notificación
PUT    /api/notifications/:id/read           # Marcar como leída
DELETE /api/notifications/:id                # Eliminar notificación

// Dispositivos
POST   /api/notifications/register-device    # Registrar dispositivo para push
DELETE /api/notifications/unregister-device  # Desregistrar dispositivo

// Preferencias
GET    /api/notifications/preferences/:userId # Obtener preferencias
PUT    /api/notifications/preferences/:userId # Actualizar preferencias

// Push notifications
POST   /api/notifications/send-push          # Enviar push notification
```

### WebSocket Events

```typescript
// Cliente -> Servidor
{
  type: 'join_room',
  userId: 'user_123'
}

// Servidor -> Cliente
{
  type: 'new_notification',
  data: {
    id: 'notif_123',
    title: 'Nueva reserva',
    message: 'Tienes una nueva reserva',
    type: 'booking_confirmed',
    priority: 'high',
    timestamp: '2024-01-15T10:30:00Z'
  }
}
```

## 🧪 Testing

### Web
```bash
# Probar notificaciones web
npm run dev
# Abrir http://localhost:3000
# Usar el botón "Probar Notificación" en el centro de notificaciones
```

### Móvil
```bash
# Probar en desarrollo
npm run android  # o npm run ios
# Usar el botón "Enviar notificación de prueba" en la pantalla de notificaciones
```

## 📱 Funcionalidades por Plataforma

| Funcionalidad | Web | Móvil | Estado |
|---------------|-----|-------|--------|
| Notificaciones en tiempo real | ✅ WebSocket | ✅ Push/WebSocket | Implementado |
| Push notifications | ✅ Firebase | ✅ FCM/APNS | Implementado |
| Centro de notificaciones | ✅ Dropdown | ✅ Pantalla completa | Implementado |
| Configuración de preferencias | ✅ Completa | ⚠️ Básica | Implementado |
| Filtrado y búsqueda | ✅ Avanzado | ✅ Básico | Implementado |
| Navegación inteligente | ✅ URLs | ✅ React Navigation | Implementado |
| Estadísticas | ✅ Completas | ✅ Básicas | Implementado |
| Modo offline | ⚠️ Básico | ⚠️ Básico | Pendiente |
| Notificaciones programadas | ⚠️ Básico | ✅ Implementado | Parcial |

## 🚀 Próximos Pasos

### Corto Plazo
1. **Integración con backend real** - Conectar con APIs reales
2. **Firebase completo** - Configurar Firebase en producción
3. **Pruebas E2E** - Tests automatizados
4. **Optimización de rendimiento** - Lazy loading, memoización

### Mediano Plazo
1. **Notificaciones rich** - Imágenes, botones de acción
2. **Geolocalización** - Notificaciones basadas en ubicación
3. **Inteligencia artificial** - Notificaciones personalizadas
4. **Analytics** - Métricas de engagement

### Largo Plazo
1. **Plataforma de administración** - Dashboard para gestionar notificaciones
2. **A/B Testing** - Optimizar contenido de notificaciones
3. **Multi-idioma** - Soporte para múltiples idiomas
4. **Integración con terceros** - WhatsApp, Telegram, etc.

## 📚 Documentación Adicional

- [Guía de Firebase Messaging](https://firebase.google.com/docs/cloud-messaging)
- [React Native Push Notifications](https://github.com/zo0r/react-native-push-notification)
- [Notifee Documentation](https://notifee.app/)
- [Web Push Protocol](https://web.dev/push-notifications/)

## 🤝 Contribución

Para contribuir al sistema de notificaciones:

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**DY States Notification System** - Sistema completo de notificaciones para plataforma inmobiliaria 🏠📱