exports.errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message);
  
  const statusCodeMap = {
    ValidationError: 400,
    AuthError: 401,
    InsufficientFundsError: 402,
    NotFoundError: 404
  };

  const status = statusCodeMap[err.name] || 500;
  res.status(status).json({ 
    success: false,
    error: err.message 
  });
};