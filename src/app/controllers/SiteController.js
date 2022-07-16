const Course=require('../models/Course')
const { mutipleMongooseToOject } = require('../../util/mongoose')
class SiteController {
     
    //GET /search
    index(req, res, next) {
        Course.find({})
            .then(courses =>  {
                res.render('home',{courses: mutipleMongooseToOject(courses)})
            
            })
            .catch(next)
                
    }

    //GET /search
    search(req, res) {
        res.render('search');
    }
}
module.exports= new SiteController