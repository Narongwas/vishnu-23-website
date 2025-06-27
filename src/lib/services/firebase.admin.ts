import admin, { ServiceAccount } from "firebase-admin";

/*
Initialize connection to db
*/
const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FB_CLIENT_EMAIL,
  privateKey: process.env.FB_PRIVATE_KEY
    ? process.env.FB_PRIVATE_KEY.replace(/\\n/gm, "\n")
    : undefined,
};

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin;
}

const firebaseAdmin = getFirebaseAdmin();
const remoteConfig = firebaseAdmin.remoteConfig();
const db = firebaseAdmin.firestore();

export { firebaseAdmin, db, remoteConfig };
