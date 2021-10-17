const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String,
        trim:true,
        max: 160,
        min:3
    },
    slug:{
        index:true,
        type:String,
        unique:true,
    },
    body:{
        type:{},
        max: 2000000,
        min:3,
        required:true
    },
    excerpt:{
        type:String,
        max: 1000
    },
    mtitle:{
        type:String
    },
    mdesc:{
        type:String
    },
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }],
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
        required:true
    }],
 
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})


module.exports = mongoose.model('Blog',blogSchema);