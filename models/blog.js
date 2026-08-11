const { type } = require('jquery');
const mongoose = require('mongoose');

const blogschema = mongoose.Schema({
              blog_meta_title:
              { 
              type: String
              },
              blog_meta_description:
              { 
              type: String
              },
              blog_meta_keywords:
              { 
              type: String
              },
              blog_schema:
              { 
              type: String
              },
              blog_title:
              { 
              type: String
              },
              blog_table_of_contents:{
                type: [String]
              },
              blog_link:
              {
              type: String,
              index: true
              },
              blog:
              {
              type: String
              },
              blogimg: {
              type: String
              },
              blog_category: {
              type: String
              },
              blog_key:{
              type: String
              },
              date:{
              type: String,
              },
              created_date:{
              type: String,
              },
});

// Matches the { blog_category: X } filter + { _id: -1 } sort used to pull
// the latest N posts per category across the site's landing pages.
blogschema.index({ blog_category: 1, _id: -1 });

module.exports = mongoose.model('blogs',blogschema);