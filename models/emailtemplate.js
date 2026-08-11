const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let emailtemplate = new Schema({
	identifier:{
		type:String
	},
	subject:{
       type:String
	},
	content:{
		type:String
	},
	status:{
        type:String
	},
	created_date:{
		type:Date,default: Date.now
	},
});

module.exports = mongoose.model('emailtemplate',emailtemplate,'emailtemplate');
