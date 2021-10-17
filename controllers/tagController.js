const slugify  = require("slugify");
const Tag = require('../models/tagModel');

exports.create = function(req,res) {
    const {name} = req.body;
    const slug = slugify(name).toLowerCase()
    const tag = new Tag({name,slug});
    Tag.save((err,tag) => {
        if(err){
            return res.status(400).json({
                err
            })
        }

        res.json(tag)
    })
}

exports.list = function(req,res) {
    Tag.find().exec((err,data) => {
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
    Tag.find({slug}).exec((err,data) => {
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
    Tag.findByIdAndRemove({slug}).exec((err,data) => {
      if(err){
          return res.status(400).json({
              error:err
          })
      }
      return res.json('ok');
    })
     
}