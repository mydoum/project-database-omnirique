'use strict';

module.exports = function(Contact) {
  Contact.beforeRemote('create', function(ctx, _modelInstance_, next) {
    console.log(ctx.args.data);
    Contact.app.models.Contact.findOne({where: {email: ctx.args.data.email}},
      function(err, user) {
        if (user)
          next(new Error('409_already_exist'));
        else {
          ctx.args.data['creation-date'] = new Date();
          if (!ctx.args.data['last-contacted']) {
            ctx.args.data['last-contacted'] = new Date();
          }
          next();
        }
      });
  });

  Contact.afterRemoteError('create', function(context, next) {
    console.log('context: ', context.args);
    switch (context.error.message) {
      case '409_already_exist':
        context.error.message = 'This contact already exist';
        context.error.statusCode = 409;
        break;
    }

    context.error.message = 'The `Contact` instance is not valid. Details: ' +
      context.error.message;
    delete context.error.stack;
    next();
  });
};
