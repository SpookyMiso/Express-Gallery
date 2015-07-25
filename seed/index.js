var models = require('../models');
var faker = require('faker');

var Photo = models.Photo;

models.sequelize
  .sync({force: true})
  .then(function () {
    //seed our data
    Photo.create({
      author: faker.name.firstName(),
      description: faker.lorem.paragraph(),
      url: faker.image.abstract()
    });
  });

