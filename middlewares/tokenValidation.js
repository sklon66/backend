import admin from 'firebase-admin'

export async function tokenValidation(req, res, next) {
  // return next();
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.json({ message: 'Authorization failed', status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = await admin.auth().verifyIdToken(token);
    if (user) {
      req.user = user;
      return next();
    }

    return res.json({ message: 'Authorization failed', status: 401 });
  } catch (error) {
    console.error(error);
    return res.json({ message: 'Authorization error', status: 500 });
  }
}