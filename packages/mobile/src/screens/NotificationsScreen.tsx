// Pantalla de notificaciones para React Native
// Notifications screen for React Native DY States

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
  Switch,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useNotifications from '../hooks/useNotifications';
import { NotificationData, NotificationType, NotificationPriority } from '../services/PushNotificationService';

interface NotificationsScreenProps {
  navigation: any;
  route: any;
}

// Datos mock de notificaciones para desarrollo
const mockNotifications: NotificationData[] = [
  {
    id: '1',
    title: 'Nueva reserva confirmada',
    body: 'Tu reserva para Casa Vista Mar ha sido confirmada para el 15 de enero.',
    type: NotificationType.BOOKING_CONFIRMED,
    priority: NotificationPriority.HIGH,
    data: { bookingId: 'booking_123', propertyId: 'prop_456' },
  },
  {
    id: '2',
    title: 'Pago recibido',
    body: 'Hemos recibido tu pago de $1,250.00 USD. Gracias por tu confianza.',
    type: NotificationType.PAYMENT_RECEIVED,
    priority: NotificationPriority.NORMAL,
    data: { paymentId: 'pay_789', amount: 1250 },
  },
  {
    id: '3',
    title: 'Nuevo mensaje',
    body: 'María José te ha enviado un mensaje sobre tu reserva.',
    type: NotificationType.NEW_MESSAGE,
    priority: NotificationPriority.HIGH,
    data: { messageId: 'msg_101', senderId: 'user_202' },
  },
  {
    id: '4',
    title: 'Ofertas especiales',
    body: 'Descubre nuestras ofertas de temporada con hasta 30% de descuento.',
    type: NotificationType.GENERAL_ANNOUNCEMENT,
    priority: NotificationPriority.LOW,
    data: { campaignId: 'camp_303' },
  },
];

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState<NotificationData[]>(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');

  const {
    isInitialized,
    isPermissionGranted,
    token,
    config,
    isLoading,
    error,
    unreadCount,
    lastNotification,
    stats,
    actions,
  } = useNotifications({
    userId: 'user_123', // En una app real, esto vendría del contexto de usuario
    enableAutoInit: true,
    enableAutoRegister: true,
    onNotificationReceived: (notification) => {
      console.log('Nueva notificación recibida:', notification);
      setNotifications(prev => [notification, ...prev]);
    },
    onNotificationOpened: (notification) => {
      console.log('Notificación abierta:', notification);
      handleNotificationPress(notification);
    },
  });

  // Refrescar notificaciones
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // En una app real, aquí se cargarían las notificaciones del servidor
      await new Promise<void>(resolve => setTimeout(resolve, 1000)); // Simular carga
      await actions.refreshStats();
      console.log('Notificaciones refrescadas');
    } catch (error) {
      console.error('Error refrescando notificaciones:', error);
    } finally {
      setRefreshing(false);
    }
  }, [actions]);

  // Manejar clic en notificación
  const handleNotificationPress = useCallback((notification: NotificationData) => {
    console.log('Notificación presionada:', notification);
    actions.clearUnreadCount();

    // Navegar según el tipo de notificación
    switch (notification.type) {
      case NotificationType.BOOKING_CONFIRMED:
        if (notification.data?.bookingId) {
          navigation.navigate('BookingDetails', { bookingId: notification.data.bookingId });
        }
        break;
      case NotificationType.NEW_MESSAGE:
        if (notification.data?.messageId) {
          navigation.navigate('Chat', { messageId: notification.data.messageId });
        }
        break;
      case NotificationType.PAYMENT_RECEIVED:
        navigation.navigate('PaymentHistory');
        break;
      default:
        navigation.navigate('NotificationDetails', { notification });
    }
  }, [navigation, actions]);

  // Obtener icono según tipo de notificación
  const getNotificationIcon = (type: NotificationType): string => {
    switch (type) {
      case NotificationType.BOOKING_CONFIRMED:
        return 'event-available';
      case NotificationType.NEW_MESSAGE:
        return 'message';
      case NotificationType.PAYMENT_RECEIVED:
        return 'payment';
      case NotificationType.GENERAL_ANNOUNCEMENT:
        return 'announcement';
      default:
        return 'notifications';
    }
  };

  // Obtener color según prioridad
  const getPriorityColor = (priority: NotificationPriority): string => {
    switch (priority) {
      case NotificationPriority.CRITICAL:
        return '#ef4444';
      case NotificationPriority.URGENT:
        return '#f97316';
      case NotificationPriority.HIGH:
        return '#eab308';
      case NotificationPriority.NORMAL:
        return '#3b82f6';
      case NotificationPriority.LOW:
        return '#6b7280';
      default:
        return '#3b82f6';
    }
  };

  // Filtrar notificaciones
  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return true; // En una app real, habría un campo 'read'
      case 'important':
        return notification.priority === NotificationPriority.HIGH || 
               notification.priority === NotificationPriority.URGENT ||
               notification.priority === NotificationPriority.CRITICAL;
      default:
        return true;
    }
  });

  // Renderizar item de notificación
  const renderNotificationItem = ({ item }: { item: NotificationData }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Icon
            name={getNotificationIcon(item.type)}
            size={24}
            color={getPriorityColor(item.priority)}
            style={styles.notificationIcon}
          />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <Text style={styles.notificationBody} numberOfLines={2}>
              {item.body}
            </Text>
          </View>
          <View style={styles.notificationMeta}>
            <Text style={styles.notificationTime}>
              {/* En una app real, se mostraría la fecha formateada */}
              Hace 2h
            </Text>
            {item.priority !== NotificationPriority.NORMAL && (
              <View 
                style={[
                  styles.priorityBadge, 
                  { backgroundColor: getPriorityColor(item.priority) }
                ]}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Renderizar encabezado
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowSettings(true)}
          >
            <Icon name="settings" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        {[
          { key: 'all', label: 'Todas' },
          { key: 'unread', label: 'No leídas' },
          { key: 'important', label: 'Importantes' },
        ].map((filterOption) => (
          <TouchableOpacity
            key={filterOption.key}
            style={[
              styles.filterButton,
              filter === filterOption.key && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(filterOption.key as any)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === filterOption.key && styles.filterButtonTextActive,
              ]}
            >
              {filterOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Estado del servicio */}
      {!isInitialized && (
        <View style={styles.statusCard}>
          <Icon name="warning" size={20} color="#f59e0b" />
          <Text style={styles.statusText}>
            Servicio de notificaciones no inicializado
          </Text>
        </View>
      )}

      {!isPermissionGranted && (
        <TouchableOpacity
          style={styles.statusCard}
          onPress={actions.requestPermissions}
        >
          <Icon name="notifications-off" size={20} color="#ef4444" />
          <Text style={styles.statusText}>
            Permisos de notificación no concedidos - Toca para habilitar
          </Text>
        </TouchableOpacity>
      )}

      {error && (
        <View style={[styles.statusCard, styles.errorCard]}>
          <Icon name="error" size={20} color="#ef4444" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );

  // Renderizar estado vacío
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="notifications-none" size={64} color="#9ca3af" />
      <Text style={styles.emptyStateTitle}>No hay notificaciones</Text>
      <Text style={styles.emptyStateText}>
        Te notificaremos cuando haya algo nuevo
      </Text>
      <TouchableOpacity
        style={styles.testButton}
        onPress={actions.sendTestNotification}
      >
        <Text style={styles.testButtonText}>Enviar notificación de prueba</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={
          filteredNotifications.length === 0 ? styles.emptyContainer : undefined
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Modal de configuración */}
      <Modal
        visible={showSettings}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowSettings(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Configuración de Notificaciones</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSettings(false)}
            >
              <Icon name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Configuración de notificaciones */}
            <View style={styles.settingSection}>
              <Text style={styles.settingSectionTitle}>Configuración General</Text>
              
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Notificaciones en primer plano</Text>
                <Switch
                  value={config.enableForeground}
                  onValueChange={(value) => 
                    actions.updateConfig({ enableForeground: value })
                  }
                />
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Sonido</Text>
                <Switch
                  value={config.enableSound}
                  onValueChange={(value) => 
                    actions.updateConfig({ enableSound: value })
                  }
                />
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Vibración</Text>
                <Switch
                  value={config.enableVibration}
                  onValueChange={(value) => 
                    actions.updateConfig({ enableVibration: value })
                  }
                />
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Badge de app</Text>
                <Switch
                  value={config.enableBadge}
                  onValueChange={(value) => 
                    actions.updateConfig({ enableBadge: value })
                  }
                />
              </View>
            </View>

            {/* Estadísticas */}
            <View style={styles.settingSection}>
              <Text style={styles.settingSectionTitle}>Estadísticas</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.totalReceived}</Text>
                  <Text style={styles.statLabel}>Recibidas</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{stats.totalOpened}</Text>
                  <Text style={styles.statLabel}>Abiertas</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{unreadCount}</Text>
                  <Text style={styles.statLabel}>No leídas</Text>
                </View>
              </View>
            </View>

            {/* Información de debug */}
            {__DEV__ && (
              <View style={styles.settingSection}>
                <Text style={styles.settingSectionTitle}>Debug (Desarrollo)</Text>
                <TouchableOpacity
                  style={styles.debugButton}
                  onPress={() => {
                    const debugInfo = actions.getDebugInfo();
                    Alert.alert('Debug Info', JSON.stringify(debugInfo, null, 2));
                  }}
                >
                  <Text style={styles.debugButtonText}>Ver información de debug</Text>
                </TouchableOpacity>
                
                {token && (
                  <View style={styles.tokenContainer}>
                    <Text style={styles.tokenLabel}>Token FCM:</Text>
                    <Text style={styles.tokenText} numberOfLines={3}>
                      {token}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  emptyContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 12,
  },
  unreadBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headerButton: {
    padding: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  filterButtonActive: {
    backgroundColor: '#3b82f6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  errorCard: {
    backgroundColor: '#fef2f2',
  },
  statusText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#92400e',
    flex: 1,
  },
  errorText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#dc2626',
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  notificationContent: {
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationTextContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  notificationMeta: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  priorityBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  testButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  testButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  settingSection: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  settingSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingLabel: {
    fontSize: 14,
    color: '#374151',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  debugButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  debugButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  tokenContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  tokenLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  tokenText: {
    fontSize: 10,
    color: '#374151',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});

// Exportar para uso en navegación
export { NotificationsScreen };