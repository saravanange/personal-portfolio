// models/contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
},{ collection: 'contact' });

module.exports = mongoose.model('contact', contactSchema);
