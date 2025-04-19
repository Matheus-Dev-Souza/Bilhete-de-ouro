import jwt from 'jsonwebtoken';

export const partnerAuth = (req, res, next) => {
  const token = req.header('x-partner-token');

  if (!token) {
    throw new Error('AuthError: Missing partner token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.partner = decoded;
    next();
  } catch (err) {
    throw new Error('AuthError: Invalid partner token');
  }
};
