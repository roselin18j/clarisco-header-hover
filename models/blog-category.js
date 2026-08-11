const mongoose = require('mongoose');

const blogcategoryschema = mongoose.Schema({
        blog_category: { 
          type: String
         },
        blog_category_link: { 
            type: String
           },
        blog_category_page_meta_title:
           { 
           type: String
           },
        blog_category_page_meta_description:
           { 
           type: String
           },
        blog_category_page_meta_keywords:
           { 
           type: String
           },
        blog_category_pageimg: { 
            type: String
            },
        blog_category_pageimg_key:{
            type: String
            },
        blog_category_page_schema:
            { 
            type: String
            },
        date:{
        type: String,
    },
    created_date:{
        type: String,
    },
});

module.exports = mongoose.model('blogs-category-list',blogcategoryschema);