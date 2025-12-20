import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* ES module equivalent of __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Read Firebase service account JSON safely */
const serviceAccountPath = path.join(
    __dirname,
    "../config/firebase-admin.json"
);

const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const firebaseAuth = admin.auth();
