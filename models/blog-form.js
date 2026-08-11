const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let blogform = new Schema({

    name:{
        type: String
    },
    email: {
        type: String
    },
    country:{
        type: String
    },
    phone:{
        type: String
    },
    message:{
        type: String
    },
    created_date:{
        type:Date,default: Date.now
    }
}); 

module.exports = mongoose.model('blogcreateform', blogform )