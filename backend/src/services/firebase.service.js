// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// /* ES module equivalent of __dirname */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /* Read Firebase service account JSON safely */
// const serviceAccountPath = path.join(
//     __dirname,
//     "../config/firebase-admin.json"
// );

// const serviceAccount = JSON.parse(
//     fs.readFileSync(serviceAccountPath, "utf8")
// );

// if (!admin.apps.length) {
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//     });
// }

// export const firebaseAuth = admin.auth();


import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
    });
}

export const firebaseAuth = admin.auth();
export default admin;
