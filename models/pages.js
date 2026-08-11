const mongoose = require('mongoose');

const pageschema = mongoose.Schema({
              page_meta_title:
              { 
              type: String
              },
              page_meta_description:
              { 
              type: String
              },
              page_meta_keywords:
              { 
              type: String
              },
              page_schema:
              { 
              type: String
              },
              page_title:
              { 
              type: String
              },
              page_link:
              {
              type: String,
              index: true
              },
              pageimg: { 
              type: String
              },
              page_key:{
              type: String
              },
              date:{
              type: String,
              },
              created_date:{
              type: String,
              },
});

module.exports = mongoose.model('pages',pageschema);