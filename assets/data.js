const docs = {
  sails: "Sails Documentation",
  boring: "The Boring Stack Docs",
};

// How can i view the read more in the boringdocs and not the browser?

module.exports = {
  create: `**create - ${docs["sails"]}**

  Create a record in the database.

  _Usage:_

  await Something.create(initialValues);

  or 

  var createdRecord = await Something.create(initialValues).fetch();

  [Read More](https://sailsjs.com/documentation/reference/waterline-orm/models/create)
    `,
  fetch: `**fetch - ${docs["sails"]}**

  Fetch the record from the database after it has been created.

  _Usage:_

  const something = await Something.create({ data }).fetch()
  `,
  populate: `**populate - ${docs["sails"]}**

  Populate the record with related records.

  _Usage:_

  const something = await Something.findOne({ query }).populate('relatedRecord')
  `,
  inputs: `**inputs - ${docs["sails"]}**

    inputs contain the values your action is expecting.

    You can configure them quite similar to model attributes.
    `,
  render: `**render - ${docs["boring"]}**

  Render a page by returning an inertia response from a controller or route.

  _Usage:_

  const articles = await Article.find({});

  return sails.inertia.render('pageDir', { articles })
  
  [Read More](https://docs.sailscasts.com/boring-stack/routing)
  `,
  exits: `**exits - ${docs["sails"]}**
  
  In an action, helper, or script, throwing anything will trigger the 'error' exit by default. You can also specify a custom exit, by using the 'exits' object.

  _Usage:_

  throw { hasConflictingCourses: ['CS 301', 'M 402'] };

  or 

  return exits.hasConflictingCourses();

  [Read More](https://sailsjs.com/documentation/concepts/actions-and-controllers#?actions-2)
  `,
  location: `**location - ${docs["boring"]}**

  Returns a 303 redirect response with a follow-up request that is explicitly changed to a GET request.

  [Read More](https://docs.sailscasts.com/boring-stack/redirects#_303-response-code-for-spas)
  `,
  share: `**share - ${docs["boring"]}**

  Share data as a prop to your SPAs.

  _Usage:_

  sails.inertia.share('propName', propData)

  [Read More](https://docs.sailscasts.com/boring-stack/sharing-data)
  `,
  flushShared: `**flushShared - ${docs["boring"]}**

  Clear your collections of shared data.
  
  sails.inertia.flushShared()

  `,
  responseType: `**responseType - ${docs["boring"]}**

  responseType is the kind of response that the action will return. It can be custom or the sails default responses.

  _Usage:_

  exits: {
    success: {
      responseType: 'notFound',
    }
  }

  [Read More](https://sailsjs.com/documentation/concepts/extending-sails/custom-responses#?using-responses)
  `,
};
