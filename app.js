const express = require('express');
const data = require('./data.json');
const projects = data.projects;
const app = express();

// Setting template language
app.set('view engine', 'pug');

// Setting directory where ststic files are kept
app.use('/static', express.static('public'));

// Setting routes
// Main page
app.get('/', (request, response) => {
  response.render('index.pug', {projects: projects});
});

// Page "About Me"
app.get('/about', (request, response) => {
  response.render('about.pug');
});

// Dynamically generated pages for each project
app.get('/project/:id', (request, response) => {
  const {id} = request.params
  response.render('project.pug', {
    title: projects[id].project_name,
    description: projects[id].description,
    technologies: projects[id].technologies,
    live_link: projects[id].live_link,
    github_link: projects[id].github_link,
    image_urls: data.projects[request.params.id].image_urls
  });
});

// Handling errors
// Handling 404 error
app.use((request, response, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
})

// Error handler
app.use((error, request, response, next) => {
  response.locals.error = error;
  response.status(error.status);
  console.log(`${error}. Status code of the error: ${error.status}`);
  response.render('error.pug', {
    error: error,
    errorStatus: error.status
  })
})

// Listening to server
app.listen(3000, () => {
  console.log('The app is listening to port 3000!');
});
