import { UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function fakeUser() {
  return {
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    location: faker.location.city(),
  };
}
export function fakeUserComplete() {
  return {
    // id: faker.number.int(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
    name: faker.person.fullName(),
    role: UserRole.STUDENT,
    avatar: faker.image.avatar(),
    location: faker.location.city(),
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
    // id: faker.number.int(),
    connect_at: faker.date.anytime(),
    disconnect_at: faker.date.anytime(),
    // user_id: faker.number.int(),
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
    // id: faker.number.int(),
    name: faker.person.fullName(),
    created_at: new Date(),
  };
}
export function fakeMessages() {
  return {
    content: faker.lorem.words(5),
    seen_at: new Date(),
    delivered_at: new Date(),
  };
}
export function fakeMessagesComplete() {
  return {
    // id: faker.number.int(),
    content: faker.lorem.words(5),
    seen_at: undefined,
    delivered_at: undefined,
    created_at: new Date(),
    updated_at: new Date(),
    user_id: faker.number.int(),
    chat_id: faker.number.int(),
  };
}
