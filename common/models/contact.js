'use strict';

module.exports = function(Contact) {
  Contact.beforeRemote('create', function(ctx, _modelInstance_, next) {
    console.log(ctx.args.data);
    ctx.args.data['creation-date'] = new Date();
    if (!ctx.args.data['last-contacted']) {
      ctx.args.data['last-contacted'] = new Date();
    }
    next();
  });
};
