
import { z } from 'zod';

// Validation schemas
export const leaseInquirySchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s.''-]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .max(20, 'Phone number must be less than 20 characters'),
  
  brandName: z.string()
    .max(100, 'Brand name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s&.''-]*$/, 'Brand name contains invalid characters')
    .optional(),
  
  businessType: z.string()
    .min(1, 'Business type is required')
    .max(100, 'Business type must be less than 100 characters')
    .regex(/^[a-zA-Z\s,&.''-]+$/, 'Business type contains invalid characters'),
  
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .regex(/^[a-zA-Z0-9\s.,!?&''""\n\r-]*$/, 'Message contains invalid characters')
    .optional()
});

export type LeaseInquiryFormData = z.infer<typeof leaseInquirySchema>;

// Skylight booking enquiry schema
export const skylightBookingSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s.''-]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .max(20, 'Phone number must be less than 20 characters'),
  
  checkIn: z.string()
    .min(1, 'Check-in date is required'),
  
  checkOut: z.string()
    .min(1, 'Check-out date is required'),
  
  guests: z.string()
    .min(1, 'Number of guests is required')
    .max(50, 'Guest information must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s,]+$/, 'Guest information contains invalid characters'),
  
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .regex(/^[a-zA-Z0-9\s.,!?&''""\n\r-]*$/, 'Message contains invalid characters')
    .optional()
});

export type SkylightBookingFormData = z.infer<typeof skylightBookingSchema>;

// Input sanitization utilities
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

// Rate limiting utilities (client-side)
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const key = identifier;
    const attempt = attempts.get(key);
    
    if (!attempt || now > attempt.resetTime) {
      attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (attempt.count >= maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  };
};

export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};
