const slugify  = require("slugify");
const Category = require('../models/categoryModel');

exports.create = function(req,res) {
    const {name} = req.body;
    const slug = slugify(name).toLowerCase()
    const category = new Category({name,slug});
    category.save((err,category) => {
        if(err){
            return res.status(400).json({
                err
            })
        }

        res.json(category)
    })
}

exports.list = function(req,res) {
    Category.find().exec((err,data) => {
      if(err){
          return res.status(400).json({
              error:err
          })
      }
      return res.json(data);
    })
    
}

exports.read = function(req,res) {
    const slug = req.param.slug.toLowerCase();
    Category.find({slug}).exec((err,data) => {
      if(err){
          return res.status(400).json({
              error:err
          })
      }
      return res.json(data);
    })
    
}

exports.remove = function(req,res) {
    const slug = req.param.slug.toLowerCase();
    Category.findByIdAndRemove({slug}).exec((err,data) => {
      if(err){
          return res.status(400).json({
              error:err
          })
      }
      return res.json('ok');
    })
     
}