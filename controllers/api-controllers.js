var db = require("../models");
var model = db.Example;


var exampleController = {
    all: function(cb) {
        console.log("You have reached the controller");
        model.findAll({}).then(function(dbExamples) {
            cb(dbExamples);
             });
    },
    one: function(id, cb) {
        model.findOne({
            where: {
                id: id
            }
        }).then(function(results){
            cb(results);
        })
    },
    new: function(thing1, cb){
        model.create({
            text: thing1,
            description: thing1,
        })
        .then(function(results){
            cb(results);
        })
    },
    change: function(id, thing1, cb){
        model.update(
            thing1,
            {where: {id: id}}
        ).then(function(results){
            cb(results);
        })
    },
    delete: function(id, cb){
        model.destroy(
            {where: {id: id}}
        ).then(function(results){
            cb(results);
        });
    }
}
// Export routes for server.js to use.
module.exports = exampleController;