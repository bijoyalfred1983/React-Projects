//  const globalApiDomain = 'https://www.autozone.com';
module.exports = {
  host: process.env.NODE_HOST || 'localhost.autozone.com', // Define your host from 'package.json'
  port: process.env.PORT,
  xBackend: process.env.BACKEND_URL,
  global: {
    apiDomainUrl_esUS: 'https://www.autozone.com',
    apiDomainUrl_esMX:  'https://www.autozone.com.mx'
  },
 
};
