// Service Worker para Firebase Cloud Messaging
// Firebase Cloud Messaging Service Worker for DY States

// Importar scripts de Firebase (se pueden cargar dinámicamente)
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Configuración de Firebase (debe coincidir con la del cliente)
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: 'your-app-id'
};

// Inicializar Firebase en el Service Worker (cuando esté disponible)
// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// Manejar notificaciones en segundo plano
self.addEventListener('push', function(event) {
  console.log('[SW] Push recibido:', event);

  let notificationData;
  
  try {
    // Intentar parsear datos del push
    notificationData = event.data ? event.data.json() : {};
  } catch (error) {
    console.error('[SW] Error parseando datos del push:', error);
    notificationData = {
      title: 'Nueva notificación',
      body: 'Tienes una nueva notificación de DY States'
    };
  }

  // Configurar opciones de la notificación
  const notificationTitle = notificationData.title || 'DY States';
  const notificationOptions = {
    body: notificationData.body || 'Nueva notificación disponible',
    icon: notificationData.icon || '/icon-192x192.png',
    badge: '/icon-192x192.png',
    image: notificationData.image,
    tag: notificationData.tag || 'dy-states-notification',
    data: {
      url: notificationData.click_action || notificationData.url || '/',
      notificationId: notificationData.notificationId,
      ...notificationData.data
    },
    actions: [
      {
        action: 'view',
        title: 'Ver',
        icon: '/icons/view.png'
      },
      {
        action: 'dismiss',
        title: 'Descartar',
        icon: '/icons/dismiss.png'
      }
    ],
    requireInteraction: notificationData.priority === 'high' || notificationData.priority === 'critical',
    silent: notificationData.silent || false,
    vibrate: [200, 100, 200],
    timestamp: Date.now()
  };

  // Mostrar la notificación
  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

// Manejar clics en las notificaciones
self.addEventListener('notificationclick', function(event) {
  console.log('[SW] Notificación clickeada:', event);

  event.notification.close();

  const action = event.action;
  const notificationData = event.notification.data || {};
  const url = notificationData.url || '/';

  if (action === 'dismiss') {
    // Solo cerrar la notificación
    return;
  }

  // Abrir o enfocar la aplicación
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Buscar si ya hay una ventana abierta
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          // Enfocar ventana existente y navegar a la URL
          client.focus();
          if (url !== '/') {
            client.navigate(url);
          }
          return;
        }
      }

      // Si no hay ventana abierta, abrir nueva
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );

  // Enviar evento de clic al cliente (si está disponible)
  event.waitUntil(
    clients.matchAll().then(function(clientList) {
      clientList.forEach(function(client) {
        client.postMessage({
          type: 'NOTIFICATION_CLICK',
          data: notificationData,
          action: action
        });
      });
    })
  );
});

// Manejar cierre de notificaciones
self.addEventListener('notificationclose', function(event) {
  console.log('[SW] Notificación cerrada:', event);

  const notificationData = event.notification.data || {};

  // Enviar evento de cierre al cliente
  event.waitUntil(
    clients.matchAll().then(function(clientList) {
      clientList.forEach(function(client) {
        client.postMessage({
          type: 'NOTIFICATION_CLOSE',
          data: notificationData
        });
      });
    })
  );
});

// Manejar mensajes desde el cliente
self.addEventListener('message', function(event) {
  console.log('[SW] Mensaje recibido:', event.data);

  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      
      case 'GET_VERSION':
        event.ports[0].postMessage({
          type: 'VERSION',
          version: '1.0.0'
        });
        break;

      case 'SHOW_NOTIFICATION':
        const { title, options } = event.data;
        self.registration.showNotification(title, options);
        break;

      default:
        console.log('[SW] Tipo de mensaje no reconocido:', event.data.type);
    }
  }
});

// Manejar instalación del Service Worker
self.addEventListener('install', function(event) {
  console.log('[SW] Service Worker instalado');
  
  // Forzar activación inmediata
  self.skipWaiting();
});

// Manejar activación del Service Worker
self.addEventListener('activate', function(event) {
  console.log('[SW] Service Worker activado');
  
  // Tomar control de todos los clientes inmediatamente
  event.waitUntil(self.clients.claim());
});

// Manejar errores
self.addEventListener('error', function(event) {
  console.error('[SW] Error en Service Worker:', event.error);
});

// Manejar errores de promesas no capturadas
self.addEventListener('unhandledrejection', function(event) {
  console.error('[SW] Promesa rechazada no manejada:', event.reason);
});

// Utilidades del Service Worker
const swUtils = {
  // Obtener todos los clientes activos
  getClients: function() {
    return self.clients.matchAll();
  },

  // Enviar mensaje a todos los clientes
  broadcast: function(message) {
    return self.clients.matchAll().then(function(clientList) {
      clientList.forEach(function(client) {
        client.postMessage(message);
      });
    });
  },

  // Mostrar notificación
  showNotification: function(title, options) {
    return self.registration.showNotification(title, options);
  },

  // Obtener notificaciones activas
  getNotifications: function() {
    return self.registration.getNotifications();
  },

  // Cerrar todas las notificaciones
  closeAllNotifications: function() {
    return self.registration.getNotifications().then(function(notifications) {
      notifications.forEach(function(notification) {
        notification.close();
      });
    });
  }
};

// Exponer utilidades globalmente en el Service Worker
self.swUtils = swUtils;

console.log('[SW] Firebase Messaging Service Worker cargado');