const { create } = require('express-handlebars');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = new Schema({
    _id : { type: Number},
    name: {type: String, required: true,},
    description: {type: String, maxLenght: 1000},
    videoId: {type: String, required: true,},
    level: {type: String, maxLenght: 255},
    img: {type: String, maxLenght:255},
    slug: { type: String, slug: 'name', unique: true }
  
  },{
    _id: false,
    timestamps: true
  });

//custom query helpers
CourseSchema.query.sortable= function(req){
  if(req.query.hasOwnProperty('_sort')){
    const isValidtype=['asc','desc'].includes(req.query.type);
    return this.sort({
        [req.query.column]: isValidtype ? req.query.type : 'desc',
    })          
  }
  return this
}

  //add plugin
  mongoose.plugin(slug)

  CourseSchema.plugin(AutoIncrement)

  CourseSchema.plugin(mongooseDelete, { 
      deletedAt: true, 
      overrideMethods: 'all' 
  })


  module.exports= mongoose.model('Course', CourseSchema);