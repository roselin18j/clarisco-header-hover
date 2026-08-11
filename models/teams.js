const mongoose = require('mongoose');

const teamsschema = mongoose.Schema({
    T_name:
    { 
         type: String
        },
      T_role: 
        { 
         type: String
        },
        T_img: 
        { 
         type: String
        },
        T_twitter: { 
         type: String
        },
        T_facebook: { 
         type: String
        },
        T_instagram: { 
         type: String
        },
        T_linkedin: { 
         type: String
        },
        created_date:{
        type: String,
        format: Date("dd-mm-YYYY")
    }
});

module.exports = mongoose.model('teams',teamsschema);