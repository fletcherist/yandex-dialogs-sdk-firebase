import { FirebaseSessionStorage } from './firebaseSessionStorage';
import { sessionMiddleware } from 'yandex-dialogs-sdk';

export function middleware(path: string) {
  const storage = new FirebaseSessionStorage(path);
  return sessionMiddleware(storage);
}
