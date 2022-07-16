const Course=require('../models/Course')
const { mongooseToOject, mutipleMongooseToOject } = require('../../util/mongoose')
class MeController {
     
    //GET /me/store/courses
     storedCourses(req, res, next) {
        
        Promise.all([
            Course.find({}).sortable(req)
            ,Course.countDocumentsDeleted()
        ])
            .then(([courses, deletedCount] )=> res.render('me/stored_courses', {
                deletedCount,
                courses: mutipleMongooseToOject(courses)
            }))
            .catch(next)
       
    } 
    //GET /me/trash/courses
    trashCourses(req, res, next) {
        Promise.all([
            Course.findDeleted({}).sortable(req)
            ,Course.countDocumentsDeleted()
        ])
            .then(([courses, deletedCount] )=> res.render('me/trash_courses', {
                deletedCount,
                courses: mutipleMongooseToOject(courses)
            }))
            .catch(next)
    } 
    
}
module.exports= new MeController