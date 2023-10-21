const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport'); // Import passport configuration
const mongoose = require('./config/db'); // Import your MongoDB configuration
const User = require('./models/user');

const flash = require('connect-flash');
const contactsRoutes = require('./contacts');

 // Import the contacts.js route file

const app = express();
const port = process.env.PORT || 3000;

// ...other app configurations...

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(flash());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Set the views directory

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded form data
app.use(express.json()); // Middleware for parsing JSON data

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', contactsRoutes); // Use the contacts routes

// Login
app.post('/login', (req, res, next) => {
  console.log('Received username:', req.body.username);
  console.log('Received password:', req.body.password);
  passport.authenticate('local', {
    successRedirect: '/contacts',
  failureRedirect: '/login',
  failureFlash: true, // Enable flash messages
  })(req, res, next);
});

// Logout
app.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      console.error('Error during logout:', err);
      return next(err);
    }
    res.redirect('/');
  });
});


// Secure Route Example
app.get('/dashboard', isLoggedIn, (req, res) => {
  // Your secured dashboard content here
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.render('login', { messages: req.flash() });
});


// Define routes
app.get('/', isLoggedIn,(req, res) => {
  res.render('home', { pageTitle: 'Home' });
});

app.get('/about',isLoggedIn, (req, res) => {
  res.render('about', { pageTitle: 'About' });
});

app.get('/projects', isLoggedIn,(req, res) => {
  res.render('projects', { pageTitle: 'Projects' });
});

app.get('/services', isLoggedIn,(req, res) => {
  res.render('services', { pageTitle: 'Services' , body: 'This is about my service' } );
});

app.get('/contact', isLoggedIn,(req, res) => {
  res.render('contact', { pageTitle: 'Contact Me' });
});

// Handle form submission
app.post('/contact', isLoggedIn,(req, res) => {
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


// List all users route
User.find({})
  .then(users => {
    console.log("All Users:");
    users.forEach((user, index) => {
      console.log(`User ${index + 1}: ${user.username}`);
    });
  })
  .catch(err => {
    console.error("Error while fetching users:", err);
    return res.status(500).send("Internal Server Error");
  });




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
