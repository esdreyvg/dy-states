'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Send, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Info,
  Archive,
  Users,
  Calendar,
  MapPin
} from 'lucide-react';
import { 
  RentalMessage, 
  Conversation, 
  Booking,
  MessageAttachment,
  MessageType
} from '../../../../shared/src/types/rental';
import { messagingService } from '../../services/rental';

interface ChatInterfaceProps {
  conversationId: string;
  currentUserId: string;
  booking?: Booking;
  onClose?: () => void;
  className?: string;
}

interface MessageInput {
  text: string;
  attachments: File[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  currentUserId,
  booking,
  onClose,
  className = ''
}) => {
  // Estados principales
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<RentalMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de entrada de mensaje
  const [messageInput, setMessageInput] = useState<MessageInput>({
    text: '',
    attachments: []
  });
  const [sending, setSending] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);

  // Estados de UI
  const [showInfo, setShowInfo] = useState(false);

  // Referencias
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar conversación y mensajes
  useEffect(() => {
    const loadConversation = async () => {
      setLoading(true);
      setError(null);

      try {
        const [conversationResponse, messagesResponse] = await Promise.all([
          messagingService.getConversationById(conversationId),
          messagingService.getConversationMessages(conversationId, { limit: 50 })
        ]);

        if (conversationResponse.success) {
          setConversation(conversationResponse.data);
        } else {
          setError(conversationResponse.error || 'Error al cargar la conversación');
          return;
        }

        if (messagesResponse.success) {
          setMessages(messagesResponse.data.messages);
          // Marcar mensajes como leídos
          if (messagesResponse.data.messages.length > 0) {
            await messagingService.markMessagesAsRead(conversationId, messagesResponse.data.messages.map(m => m.id));
          }
        } else {
          setError(messagesResponse.error || 'Error al cargar los mensajes');
        }

      } catch (err) {
        console.error('Error loading conversation:', err);
        setError('Error de conexión al cargar la conversación');
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) {
      loadConversation();
    }
  }, [conversationId]);

  // Scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Formatear fecha del mensaje
  const formatMessageTime = (date: Date): string => {
    const messageDate = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - messageDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return messageDate.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  };

  // Formatear fecha completa
  const formatFullDate = (date: Date): string => {
    return new Date(date).toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Enviar mensaje
  const sendMessage = async () => {
    if (!messageInput.text.trim() && messageInput.attachments.length === 0) return;
    if (sending) return;

    setSending(true);
    setError(null);

    try {
      const response = await messagingService.sendMessage({
        conversationId,
        receiverId: conversation?.participants.find(p => p.userId !== currentUserId)?.userId || '',
        content: messageInput.text.trim(),
        type: messageInput.attachments.length > 0 ? MessageType.DOCUMENT : MessageType.TEXT,
        attachments: messageInput.attachments.map(file => ({
          name: file.name,
          size: file.size,
          mimeType: file.type,
          url: URL.createObjectURL(file) // En producción sería una URL del servidor
        }))
      });

      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        setMessageInput({ text: '', attachments: [] });
        setShowAttachments(false);
      } else {
        setError(response.error || 'Error al enviar mensaje');
      }

    } catch (err) {
      console.error('Error sending message:', err);
      setError('Error de conexión al enviar mensaje');
    } finally {
      setSending(false);
    }
  };

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Manejar archivos adjuntos
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['image/', 'application/pdf', 'text/', 'application/msword', 'application/vnd.openxmlformats'];
      
      return file.size <= maxSize && allowedTypes.some(type => file.type.startsWith(type));
    });

    setMessageInput(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles]
    }));
    setShowAttachments(true);
  };

  // Remover archivo adjunto
  const removeAttachment = (index: number) => {
    setMessageInput(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Obtener información del otro participante
  const getOtherParticipant = () => {
    if (!conversation) return null;
    return conversation.participants.find(p => p.userId !== currentUserId);
  };

  // Renderizar archivo adjunto
  const renderAttachment = (attachment: MessageAttachment, index: number) => {
    const isImage = attachment.mimeType?.startsWith('image/');
    
    return (
      <div key={index} className="relative inline-block mr-2 mb-2">
        {isImage ? (
          <Image
            src={attachment.url}
            alt={attachment.name}
            width={80}
            height={80}
            className="object-cover rounded border"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-100 rounded border flex items-center justify-center">
            <Paperclip className="h-6 w-6 text-gray-500" />
          </div>
        )}
        <button
          onClick={() => removeAttachment(index)}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
        >
          ×
        </button>
        <div className="text-xs text-gray-500 mt-1 max-w-20 truncate">
          {attachment.name}
        </div>
      </div>
    );
  };

  // Renderizar mensaje
  const renderMessage = (message: RentalMessage, index: number) => {
    const isOwn = message.senderId === currentUserId;
    const previousMessage = index > 0 ? messages[index - 1] : null;
    const showDate = !previousMessage || 
      new Date(message.createdAt).toDateString() !== new Date(previousMessage.createdAt).toDateString();
    const showAvatar = !previousMessage || previousMessage.senderId !== message.senderId;

    return (
      <div key={message.id} className="mb-4">
        {/* Separador de fecha */}
        {showDate && (
          <div className="flex items-center justify-center my-4">
            <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
              {formatFullDate(message.createdAt)}
            </div>
          </div>
        )}

        {/* Mensaje */}
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} ${showAvatar ? 'mb-2' : 'mb-1'}`}>
          {/* Avatar del otro usuario */}
          {!isOwn && showAvatar && (
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-2 flex-shrink-0">
              {getOtherParticipant()?.userId.charAt(0).toUpperCase()}
            </div>
          )}

          <div className={`max-w-xs lg:max-w-md ${isOwn ? 'ml-auto' : ''}`}>
            {/* Contenido del mensaje */}
            <div className={`
              px-4 py-2 rounded-lg
              ${isOwn 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-900'
              }
              ${message.type === 'system' ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' : ''}
            `}>
              {/* Texto del mensaje */}
              {message.content && (
                <div className="whitespace-pre-wrap text-sm">
                  {message.content}
                </div>
              )}

              {/* Archivos adjuntos */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2">
                  {message.attachments.map((attachment, idx) => (
                    <div key={idx} className="mb-1">
                      {attachment.mimeType?.startsWith('image/') ? (
                        <Image
                          src={attachment.url}
                          alt={attachment.name}
                          width={300}
                          height={200}
                          className="max-w-full h-auto rounded border cursor-pointer"
                          onClick={() => window.open(attachment.url, '_blank')}
                        />
                      ) : (
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-2 bg-white bg-opacity-10 rounded border text-sm hover:bg-opacity-20 transition-colors"
                        >
                          <Paperclip className="h-4 w-4 mr-2" />
                          <span className="truncate">{attachment.name}</span>
                          <span className="ml-2 text-xs opacity-75">
                            ({(attachment.size / 1024).toFixed(1)}KB)
                          </span>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Estado y hora del mensaje */}
            <div className={`flex items-center mt-1 text-xs text-gray-500 ${isOwn ? 'justify-end' : ''}`}>
              <span>{formatMessageTime(message.createdAt)}</span>
              {isOwn && (
                <span className={`ml-1 ${message.isRead ? 'text-blue-500' : 'text-gray-400'}`}>
                  {message.isRead ? '✓✓' : '✓'}
                </span>
              )}
            </div>
          </div>

          {/* Espaciador para mensajes propios */}
          {!isOwn && !showAvatar && <div className="w-10" />}
        </div>
      </div>
    );
  };

  // Renderizar panel de información
  const renderInfoPanel = () => {
    const otherParticipant = getOtherParticipant();
    
    return (
      <div className="bg-white border-l border-gray-200 w-80 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Información</h3>
          <button
            onClick={() => setShowInfo(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Información del participante */}
        {otherParticipant && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-medium">
                {otherParticipant.userId.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <div className="font-medium">Usuario #{otherParticipant.userId.slice(-6)}</div>
                <div className="text-sm text-gray-500">
                  {conversation?.bookingId ? 'En esta reserva' : 'Conversación'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Información de la reserva */}
        {booking && (
          <div className="mb-6">
            <h4 className="font-medium mb-3">Detalles de la reserva</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">Check-in</div>
                  <div className="text-gray-600">
                    {new Date(booking.checkInDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">Check-out</div>
                  <div className="text-gray-600">
                    {new Date(booking.checkOutDate).toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">Huéspedes</div>
                  <div className="text-gray-600">
                    {booking.guests.adults + booking.guests.children} huésped{booking.guests.adults + booking.guests.children !== 1 ? 'es' : ''}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="font-medium">Estado</div>
                  <div className="text-gray-600 capitalize">
                    {booking.status.replace('_', ' ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Acciones rápidas */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Acciones</h4>
          <div className="space-y-2">
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              Llamar
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <Video className="h-4 w-4 mr-2" />
              Videollamada
            </button>
            <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              <Archive className="h-4 w-4 mr-2" />
              Archivar chat
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Cargando conversación...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-600 mb-2">Error al cargar la conversación</div>
          <div className="text-sm text-gray-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-interface bg-gray-50 ${className}`}>
      <div className="flex h-full">
        {/* Panel principal del chat */}
        <div className="flex-1 flex flex-col">
          {/* Header del chat */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                  {getOtherParticipant()?.userId.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="font-semibold">
                    {conversation?.bookingId ? `Reserva ${conversation.bookingId}` : 'Conversación'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking ? `Reserva #${booking.id.slice(-8)}` : 'Chat directo'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Info className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">💬</div>
                  <div>No hay mensajes aún</div>
                  <div className="text-sm">¡Envía el primer mensaje!</div>
                </div>
              </div>
            ) : (
              <div>
                {messages.map((message, index) => renderMessage(message, index))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Área de archivos adjuntos */}
          {showAttachments && messageInput.attachments.length > 0 && (
            <div className="bg-gray-100 p-3 border-t border-gray-200">
              <div className="flex flex-wrap">
                {messageInput.attachments.map((file, index) => 
                  renderAttachment({
                    id: `temp-${index}`,
                    name: file.name,
                    size: file.size,
                    mimeType: file.type,
                    url: URL.createObjectURL(file)
                  }, index)
                )}
              </div>
            </div>
          )}

          {/* Input de mensaje */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <textarea
                  value={messageInput.text}
                  onChange={(e) => setMessageInput(prev => ({ ...prev, text: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe un mensaje..."
                  rows={1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
              </div>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              
              <button
                onClick={sendMessage}
                disabled={(!messageInput.text.trim() && messageInput.attachments.length === 0) || sending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Panel de información */}
        {showInfo && renderInfoPanel()}
      </div>
    </div>
  );
};

export default ChatInterface;