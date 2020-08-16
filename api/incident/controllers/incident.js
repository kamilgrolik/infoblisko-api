const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async commentFind(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.comment.search(ctx.query);
    } else {
      entities = await strapi.services.comment.find(ctx.query.status);
    }
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.comment }));
  },
  async comment(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.create(data, { files });
    } else {
      ctx.request.body.incident = ctx.params.id;
      entity = await strapi.services.comment.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });
  }
};
