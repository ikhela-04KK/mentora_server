import { Chats } from '../entities/chat.entity';

export interface CreateChatResponse {
  data?: Chats; // Le chat lui-même
  statusCode?: string; // Code de statut personnalisé (optionnel)
  message?: string; // Message personnalisé (optionnel)
  chat_id?: number; // ID du chat (ajouté pour le résultat)
}
