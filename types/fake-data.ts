import { UserRole } from 'C:\\Users\\Administrateur\\Documents\\mentorat\\mentora_server\\node_modules\\@prisma\\client';
import { faker } from '@faker-js/faker';

export function fakeUser() {
  return {
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    location: faker.lorem.words(5),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    name: faker.person.fullName(),
    role: UserRole.INVITE,
    avatar: faker.image.avatar(),
    location: faker.lorem.words(5),
    createdAt: new Date(),
  };
}
export function fakeStatus() {
  return {
    connect_at: faker.date.anytime(),
    disconnect_at: faker.date.anytime(),
  };
}
export function fakeStatusComplete() {
  return {
    id: faker.number.int(),
    connect_at: faker.date.anytime(),
    disconnect_at: faker.date.anytime(),
    user_id: faker.number.int(),
    isOnline: false,
  };
}
export function fakeChats() {
  return {
    name: faker.person.fullName(),
  };
}
export function fakeChatsComplete() {
  return {
    id: faker.number.int(),
    name: faker.person.fullName(),
    created_at: new Date(),
  };
}
export function fakeMessages() {
  return {
    content: faker.lorem.words(5),
    seen_at: undefined,
    delivered_at: undefined,
  };
}
export function fakeMessagesComplete() {
  return {
    id: faker.number.int(),
    content: faker.lorem.words(5),
    seen_at: undefined,
    delivered_at: undefined,
    created_at: new Date(),
    updated_at: new Date(),
    user_id: faker.number.int(),
    chat_id: faker.number.int(),
  };
}
export function fakeChatUserComplete() {
  return {
    id: faker.number.int(),
    userId: faker.number.int(),
    chatId: faker.number.int(),
  };
}
