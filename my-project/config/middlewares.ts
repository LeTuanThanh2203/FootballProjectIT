export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://football-project-it.vercel.app', 'http://localhost:5500'], // Các domain bạn cho phép truy cập
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP cho phép
      headers: ['Content-Type', 'Authorization'], // Các headers cho phép
      credentials: true, // Nếu cần thiết để gửi cookies
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
