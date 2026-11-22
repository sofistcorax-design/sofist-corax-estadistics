
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const {
  getFirestore,
  FieldValue,
  Timestamp
} = require("firebase-admin/firestore");

initializeApp();

const db = getFirestore();

const ADMIN_EMAIL = "sofistcorax@gmail.com";

const VIP_PLANS = {
  semanal: { days: 7, price: 1000 },
  mensual: { days: 30, price: 1500 },
  trimestral: { days: 90, price: 3000 }
};

function requireAdmin(request) {
  if (!request.auth || request.auth.token.admin !== true) {
    throw new HttpsError(
      "permission-denied",
      "No tienes permisos de administrador."
    );
  }
}

// Verifica al administrador y asigna su permiso seguro.
exports.ensureAdminClaim = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Debes iniciar sesión.");
  }

  const email = request.auth.token.email;

  if (
    email !== ADMIN_EMAIL ||
    request.auth.token.email_verified !== true
  ) {
    throw new HttpsError(
      "permission-denied",
      "Esta cuenta no está autorizada."
    );
  }

  const user = await getAuth().getUser(request.auth.uid);

  await getAuth().setCustomUserClaims(user.uid, {
    ...user.customClaims,
    admin: true
  });

  return { success: true, message: "Administrador verificado." };
});

// Devuelve las solicitudes pendientes al administrador.
exports.adminListVipRequests = onCall(async (request) => {
  requireAdmin(request);

  const snapshot = await db
    .collection("vipPaymentRequests")
    .where("status", "==", "pending")
    .orderBy("createdAt", "asc")
    .limit(100)
    .get();

  return {
    requests: snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  };
});

// Aprueba o rechaza una solicitud VIP.
exports.adminReviewVipRequest = onCall(async (request) => {
  requireAdmin(request);

  const { requestId, decision } = request.data || {};

  if (
    typeof requestId !== "string" ||
    !requestId.trim() ||
    !["approve", "reject"].includes(decision)
  ) {
    throw new HttpsError("invalid-argument", "Datos no válidos.");
  }

  const requestRef = db.collection("vipPaymentRequests").doc(requestId);

  return await db.runTransaction(async (transaction) => {
    const requestDoc = await transaction.get(requestRef);

    if (!requestDoc.exists) {
      throw new HttpsError("not-found", "Solicitud no encontrada.");
    }

    const payment = requestDoc.data();

    if (payment.status !== "pending") {
      throw new HttpsError(
        "failed-precondition",
        "Esta solicitud ya fue revisada."
      );
    }

    const reviewer = request.auth.uid;

    if (decision === "reject") {
      transaction.update(requestRef, {
        status: "rejected",
        reviewedBy: reviewer,
        reviewedAt: FieldValue.serverTimestamp()
      });

      return { success: true, status: "rejected" };
    }

    const plan = VIP_PLANS[payment.plan];

    if (!plan || !payment.uid) {
      throw new HttpsError(
        "failed-precondition",
        "El plan o usuario de la solicitud no es válido."
      );
    }

    const startedAt = Timestamp.now();
    const expiresAt = Timestamp.fromMillis(
      startedAt.toMillis() + plan.days * 24 * 60 * 60 * 1000
    );

    const userRef = db.collection("users").doc(payment.uid);

    transaction.set(userRef, {
      vip: {
        status: "active",
        plan: payment.plan,
        startedAt,
        expiresAt,
        lastPaymentRequestId: requestId
      },
      updatedAt: FieldValue.serverTimestamp()
    }, { merge: true });

    transaction.update(requestRef, {
      status: "approved",
      reviewedBy: reviewer,
      reviewedAt: FieldValue.serverTimestamp(),
      activatedUntil: expiresAt
    });

    return {
      success: true,
      status: "approved",
      expiresAt
    };
  });
});
