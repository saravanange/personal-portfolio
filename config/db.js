const mongoose = require('mongoose');

// Replace 'mongodb://localhost/your-database' with your actual MongoDB connection string
const dbURI = 'mongodb+srv:/your detaails?retryWrites=true&w=majority';


mongoose.connect(dbURI, {dbName: 'myprofile', // Specify your database name here
 useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = mongoose;
