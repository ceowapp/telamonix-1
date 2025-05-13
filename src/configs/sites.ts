export const DOMAIN = process.env.APP_ENV === 'production' 
  ? process.env.SITE_DOMAIN
  : process.env.LOCAL_DOMAIN;

export const allowedOrigins = [
  process.env.APP_ENV === 'production' ? `https://${DOMAIN}` : null,
  process.env.APP_ENV === 'development' ? 'http://localhost:3000' : null,
].filter(Boolean) as string[]; 

if (process.env.APP_ENV === 'development' && process.env.LOCAL_DOMAIN) {
  allowedOrigins.push(process.env.LOCAL_DOMAIN);
}

export const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
};
