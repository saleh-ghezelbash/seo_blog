const mongoose = require('mongoose');

const tagschema = new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true,
        max: 32,
        unique:true
    },
    slug:{
        unique:true,
        type:String,
        index:true
    }
},{timestamps:true})




module.exports = mongoose.model('Tag',tagschema);