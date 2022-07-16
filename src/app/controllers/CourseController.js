const Course=require('../models/Course')
const { mongooseToOject } = require('../../util/mongoose')
class CourseController {
     
    //GET /courses/:slug
    show(req, res, next) {
        Course.findOne({slug:req.params.slug })
            .then(course =>
                res.render('courses/show',{ course: mongooseToOject(course) })
            )
            .catch(next)
    }
    //GET /courses/create
     create(req, res) {
        res.render('courses/create')
    } 
    //POST /courses/store
    store(req, res) {
        const fromData= req.body
        fromData.img= `https://i.ytimg.com/vi/${fromData.videoId}/maxresdefault.jpg`
        const course = new Course(fromData)
        course.save()
            .then(()=> res.redirect('/me/store/courses'))
            .catch( error =>{})
    }
    //GET /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                course: mongooseToOject(course)
            }))
            .catch(next)
        
    }
    //PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id}, req.body )
            .then(()=> res.redirect('/me/store/courses'))
            .catch(next)
    }
    
    //DELETE  /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id} )
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //PATCH /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id} )
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //DELETE  /courses/:id/force
    froceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id} )
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //POST  /courses/handle-form-action
    handleFormActions(req, res, next) {
        switch(req.body.action){
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds} } )
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break
            case 'deleteOne':
                Course.deleteOne({ _id: { $in: req.body.courseIds} } )
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds} } )
                    .then(()=> res.redirect('back'))
                    .catch(next)
                break    
            default: 
                res.json({message:'Action is invalid: '}) 
        } 
    }
}
module.exports= new CourseController