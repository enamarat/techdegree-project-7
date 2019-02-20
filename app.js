const express = require('express');
const data = require('./data.json');
const projects = data.projects;
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// Setting routes
app.get('/', (request, response) => {
  // response.locals = data.projects;
  response.render('index.pug', {projects: projects});
});

app.get('/about', (request, response) => {
  response.render('about.pug');
});

app.get('/projects/:id', (request, response) => {
  response.render('project.pug', {
    id: request.param.id,
    title: projects[id].project_name,
    description: projects[id].description,
    technologies: projects[id].technologies,
    live_link: projects[id].live_link,
    github_link: projects[id].github_link,
    image_urls: data.projects[req.param.id].image_urls
  });
});

// Listening to server
app.listen(3000, () => {
  console.log('The app is listening to port 3000!');

});
