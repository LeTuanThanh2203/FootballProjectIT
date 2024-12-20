"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::post.post', ({ strapi }) => ({
    async find(ctx) {
        try {
            const posts = await strapi.entityService.findMany('api::post.post', {
                ...ctx.query, // Thêm các tham số query vào, nếu có
            });
            return this.transformResponse(posts);
        }
        catch (error) {
            return ctx.throw(500, error);
        }
    },
    async findBySlug(ctx) {
        const { slug } = ctx.params;
        // Tìm bài viết theo slug
        const entity = await strapi.db.query('api::post.post').findOne({
            where: { Slug: slug },
        });
        if (!entity) {
            return ctx.notFound('Không tìm thấy bài viết với slug này.');
        }
        return entity;
    },
}));
