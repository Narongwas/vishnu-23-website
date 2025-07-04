import admin, { ServiceAccount } from "firebase-admin";

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
};

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin;
}

export const verifyIdToken = async (token: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Failed to verify token", error);
    return null;
  }
};

const firebaseAdmin = getFirebaseAdmin();
const remoteConfig = firebaseAdmin.remoteConfig();
const db = firebaseAdmin.firestore();

export { firebaseAdmin, db, remoteConfig };
