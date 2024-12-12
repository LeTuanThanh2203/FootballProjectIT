// ./src/api/post/content-types/post/lifecycles.ts

import  slugify  from 'slugify';

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    data.Slug = slugify(data.Title, { lower: true });
  },

  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.Title) {
      data.Slug = slugify(data.Title, { lower: true });
    }
  }
};
