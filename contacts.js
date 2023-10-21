// contacts.js
const express = require('express');
const router = express.Router();
const Contact = require('./models/contact'); // Adjust the path as needed

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    console.log("Contact",contacts);
    res.render('contacts', { contacts,  pageTitle: 'Contact List' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a contact (form for editing)
router.get('/contacts/update/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.render('updateContact', { contact ,pageTitle: 'Contact List' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a contact (form submission)
router.post('/contacts/update/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
      },
      { new: true }
    );

    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a contact
router.get('/contacts/delete/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.redirect('/contacts');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
