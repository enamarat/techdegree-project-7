const express = require('express');
const jsonData = require('/data.json');
const app = express();

app.set('view engine', 'pug');
app.use('./static', express.static('public'));

// Setting routes
app.get('/', (request, response) => {
  response.locals = data.projects;
  response.render('index.pug');
});

app.get('/about', (request, response) => {
  response.render('about.pug');
});

app.get('/projects', (request, response) => {
  response.render('project.pug');
});

app.listen(3000, () => {
  console.log('The app is listening to port 3000!')
});
