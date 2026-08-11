const mongoose = require('mongoose');

const serviesschema = mongoose.Schema({
    services_title:
    { 
         type: String
        },
      services_content: 
        { 
         type: String
        },
        created_date:{
        type: String,
        format: Date("dd-mm-YYYY")
    }
});

module.exports = mongoose.model('services',serviesschema);