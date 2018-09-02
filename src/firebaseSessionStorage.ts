import { ISessionStorage, ISession } from 'yandex-dialogs-sdk';
import { FirebaseSession } from './firebaseSession';

import * as admin from 'firebase-admin';

export class FirebaseSessionStorage implements ISessionStorage {
  private db: object;
  constructor(dbRef: object) {
    this.db = dbRef;
  }
  public async getOrCreate(id: string): Promise<ISession> {
    const sessions = this.db.get('sessions');
    if (!sessions.value()) {
      this.db.defaults({ sessions: [] }).write();
    }
    const sessionData = this.db.get('sessions').find({ id });
    if (!sessionData.value()) {
      sessions.push({ id, session: {} }).write();
    }

    const session = new LowDBSession(sessionData);
    return session;
  }
}
