const mongoose = require('mongoose');

const democontactschema = new mongoose.Schema({
        name: 
        { 
         type: String
        },
        country:{
         type : String
        },
        phone:{
            type:String
        },
        demo_name:{
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
        created_date:{
        type: String
    }
        
});

module.exports= mongoose.model('democontact',democontactschema);