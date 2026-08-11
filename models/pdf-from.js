const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let pdfform = new Schema({
   
    email: {
        type: String
    },
    created_date:{
        type:Date,default: Date.now
    }
}); 

module.exports = mongoose.model('pitchdeskpdf', pdfform )