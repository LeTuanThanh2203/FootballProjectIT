import { factories } from '@strapi/strapi';

export default {
  routes: [
    // Route cho phương thức find (lấy tất cả bài viết)
    {
      method: 'GET',
      path: '/posts',  // Đường dẫn cho việc lấy tất cả bài viết
      handler: 'post.find',  // Sử dụng phương thức 'find' trong controller
      config: {
        auth: false,  // Tùy chọn xác thực
      },
    },
    // Route cho phương thức findBySlug (lấy bài viết theo slug)
    {
      method: 'GET',
      path: '/posts/:slug',  // Đường dẫn cho việc tìm bài viết theo slug
      handler: 'post.findBySlug',  // Sử dụng phương thức 'findBySlug' trong controller
      config: {
        auth: false,  // Tùy chọn xác thực
      },
    },
  ],
};
