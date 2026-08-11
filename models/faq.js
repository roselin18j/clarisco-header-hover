const mongoose = require('mongoose');

const faqschema = mongoose.Schema({
    Qus:
    { 
         type: String
        },
      Ans: 
        { 
         type: String
        },
        created_date:{
        type: String,
        format: Date("dd-mm-YYYY")
    }
});

module.exports = mongoose.model('faq',faqschema);