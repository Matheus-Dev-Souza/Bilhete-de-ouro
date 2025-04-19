import jwt from 'jsonwebtoken';

export const generatePartnerToken = (partnerId) => {
  return jwt.sign({ partnerId }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};
