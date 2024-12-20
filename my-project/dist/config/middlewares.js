"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
        name: 'strapi::cors',
        config: {
            enabled: true,
            origin: ['https://football-project-it.vercel.app'], // Thay bằng URL frontend của bạn
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức HTTP cho phép
            headers: ['Content-Type', 'Authorization'], // Header được phép
        },
    },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
