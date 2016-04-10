export const isClient = (typeof document !== 'undefined');
export const isServer = (typeof document === 'undefined');

export const isDevelopment = process.env.NODE_ENV !== 'production';
export const isProduction = process.env.NODE_ENV === 'production';
