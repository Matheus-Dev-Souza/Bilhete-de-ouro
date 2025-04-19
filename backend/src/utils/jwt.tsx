// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

export const generatePartnerToken = (partnerId: string) => {
  return jwt.sign({ partnerId }, process.env.JWT_SECRET!, {
    expiresIn: '24h'
  });
};