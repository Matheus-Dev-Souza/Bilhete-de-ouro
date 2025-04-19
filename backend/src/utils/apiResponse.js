exports.apiResponse = {
  success: (res, data) => 
    res.status(200).json({ success: true, data }),
  
  error: (res, message, code = 400) => 
    res.status(code).json({ success: false, error: message })
};