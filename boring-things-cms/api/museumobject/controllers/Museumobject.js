'use strict';

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  like: async (ctx) => {

    const museumsObject = await strapi.services.museumobject.findOne(ctx.params);

    const updatedObject = {...museumsObject, likes: museumsObject.likes + 1};
    return await strapi.services.museumobject.update(ctx.params, updatedObject);
  },

  dislike: async (ctx) => {
    const museumsObject = await strapi.services.museumobject.findOne(ctx.params);

    const updatedObject = {...museumsObject, dislikes: museumsObject.dislikes + 1};
    return await strapi.services.museumobject.update(ctx.params, updatedObject);

  }
};
