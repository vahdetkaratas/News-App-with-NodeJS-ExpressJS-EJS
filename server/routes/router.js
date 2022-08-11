const express = require('express');
const fileUpload = require('express-fileupload');

const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

route.use(fileUpload());


route.get('/', services.homeRoutes);
route.get('/add-news', services.add_news)
route.get('/update-news', services.update_news)


//UI
route.post('/api/news', controller.create);
route.get('/api/news', controller.find);
route.put('/api/news/:id', controller.update);
route.delete('/api/news/:id', controller.delete);

// API
route.get('/api/news-api', controller.newsApi);
route.get('/api/news-api/:id', controller.newsIdApi);

route.get('/api/random-news', controller.randomNews);


module.exports = route

