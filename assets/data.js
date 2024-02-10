const docs = {
  sails: "Sails Documentation",
  boring: "The Boring Stack Docs",
};

module.exports = {
  create: `**create - ${docs["sails"]}**

  Create a record in the database.

  _Example:_

  await Something.create(initialValues);

  or 

  var createdRecord = await Something.create(initialValues).fetch();

  [Read More](https://sailsjs.com/documentation/reference/waterline-orm/models/create)
    `,
  inputs: `**inputs - ${docs["sails"]}**

    inputs contain the values your action is expecting.

    You can configure them quite similar to model attributes.
    `,
  render: `**render - ${docs["boring"]}**

  Render a page by returning an inertia response from a controller or route.

  _Example:_

  const articles = await Article.find({});

  return sails.inertia.render('pageDir', { articles })
  
  [Read More](https://docs.sailscasts.com/boring-stack/routing)
  `,
};
