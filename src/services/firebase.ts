import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  User as FirebaseUser
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { User, UserRole } from '../types';
import { logAction, logAdminEvent } from '../utils/logger';

// 1. Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Initialize Firestore with required database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// 3. Initialize Firebase Auth
export const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// 4. Test Firestore Connection according to Skill Directives
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Connection to Firestore verified.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('[Firebase] Firestore client appears offline, checking network/config.');
    }
    return false;
  }
}

// 5. Hardened Firestore Error Handler
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('[Firestore Error Details]', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 6. User Profile Firestore Syncing
export async function fetchUserProfile(uid: string): Promise<User | null> {
  const userDocPath = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        id: uid,
        name: data.name || 'User',
        email: data.email || '',
        role: (data.role as UserRole) || 'customer',
        company: data.company || undefined,
        phone: data.phone || undefined,
        avatarUrl: data.avatarUrl || undefined,
        createdAt: data.createdAt || new Date().toISOString()
      };
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, userDocPath);
    return null;
  }
}

export async function saveUserProfile(user: User): Promise<void> {
  const userDocPath = `users/${user.id}`;
  try {
    const userDocRef = doc(db, 'users', user.id);
    await setDoc(userDocRef, {
      uid: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || '',
      phone: user.phone || '',
      avatarUrl: user.avatarUrl || '',
      createdAt: user.createdAt,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    logAction('User profile synchronized in Firestore', { uid: user.id, role: user.role });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, userDocPath);
  }
}

export {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  googleProvider
};
export type { FirebaseUser };
