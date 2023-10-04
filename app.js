const express = require('express');
const path = require('path'); 
const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded form data
app.use(express.json()); // Middleware for parsing JSON data



// Define routes
app.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { pageTitle: 'Projects' });
});

app.get('/services', (req, res) => {
  res.render('services', { pageTitle: 'Services' , body: 'This is about my service' } );
});

app.get('/contact', (req, res) => {
  res.render('contact', { pageTitle: 'Contact Me' });
});

// Handle form submission
app.post('/contact', (req, res) => {
  const { firstName, lastName, contactNumber, email, message } = req.body;

  // Here, you can handle the form data, send emails, save to a database, etc.

  // For now, just log the data to the console
  console.log('Form Data Received:');
  console.log(`First Name: ${firstName}`);
  console.log(`Last Name: ${lastName}`);
  console.log(`Contact Number: ${contactNumber}`);
  console.log(`Email: ${email}`);
  console.log(`Message: ${message}`);

  // Redirect the user back to the home page
  res.redirect('/');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
