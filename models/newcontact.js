const mongoose = require('mongoose');

const newcontactschema = new mongoose.Schema({
        name: 
        { 
         type: String
        },
        phone:{
            type:String
        },
        socialMediaRequirement:{
            type:String
        },
        requirement:{
            type:String
        },
        country:{
            type:String
        },
        email: 
        { 
         type: String
        },
        message: 
        { 
         type: String
        },
        created_date:{
        type: String
    }
        
});

module.exports= mongoose.model('newcontact',newcontactschema);