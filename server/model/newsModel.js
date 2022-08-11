const mongoose = require('mongoose');

var schema = new mongoose.Schema({
 
    img :{
        type:String,
        required:true,

    },
    title:{
        type:String,
        required:true,
        maxLength: 150,

    },
    subTitle:{
        type:String,
        required:true,
        maxLength: 250,

    },
    text:{
        type:String,
        maxLength: 5000,
/*         required:true
 */    },
    date:{
        type:String,
        required:true,
        maxLength: 25


    }
})

const NewsDb = mongoose.model('newsdb', schema);

module.exports = NewsDb;