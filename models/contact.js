const mongoose = require('mongoose');

const contactschema = new mongoose.Schema({
  name:
  {
    type: String
  },
  country: {
    type: String
  },
  phone: {
    type: String
  },
  state:
  {
    type: String
  },
  skype:
  {
    type: String
  },
  email:
  {
    type: String
  },
  requirement: {
    type: String
  },
  socialMediaRequirement: {
    type: String
  },
  socialMedia: {
    type: String
  },
  offer:
  {
    type: String
  },
  message:
  {
    type: String
  },
  created_date: {
    type: String
  }

});

module.exports = mongoose.model('contact', contactschema);