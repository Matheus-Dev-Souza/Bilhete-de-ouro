// src/utils/apiResponse.ts
import { Response } from 'express';

export const apiResponse = {
  success: (res: Response, data: any) => 
    res.status(200).json({ success: true, data }),
  
  error: (res: Response, message: string, code: number = 400) => 
    res.status(code).json({ success: false, error: message })
};

