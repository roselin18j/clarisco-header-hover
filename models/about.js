const mongoose = require('mongoose');

const aboutschema = mongoose.Schema({
    about_title:
    { 
         type: String
        },
      about_content: 
        { 
         type: String
        },
        created_date:{
        type: String,
        format: Date("dd-mm-YYYY")
    }
});

module.exports = mongoose.model('about',aboutschema);