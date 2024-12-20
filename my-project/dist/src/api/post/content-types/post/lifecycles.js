"use strict";
// ./src/api/post/content-types/post/lifecycles.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
exports.default = {
    async beforeCreate(event) {
        const { data } = event.params;
        data.Slug = (0, slugify_1.default)(data.Title, { lower: true });
    },
    async beforeUpdate(event) {
        const { data } = event.params;
        if (data.Title) {
            data.Slug = (0, slugify_1.default)(data.Title, { lower: true });
        }
    }
};
