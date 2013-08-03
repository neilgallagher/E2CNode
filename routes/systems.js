var SystemStatus = require('../models/system_status').SystemStatus;

/*
 * Systems Routes
 */
exports.index = function(req, res) {
    SystemStatus.find({}, function(err, docs) {
        if(!err) {
            res.json(200, { system: docs });
        } else {
            res.json(500, { message: err });
        }
    });
}

exports.show = function(req, res) {

    var id = req.params.id; // The id of the workout the user wants to look up. 
    SystemStatus.findById(id, function(err, doc) {
        if(!err && doc) {
            res.json(200, doc);
        } else if(err) {
            res.json(500, { message: "Error loading workout." + err});
        } else {
            res.json(404, { message: "SystemStatus not found."});
        }
    });
}

exports.create = function(req, res) {

    var report = req.body.report ;

    //Systems.findOne({ name: workout_name }, function(err, doc) {  // This line is case sensitive.
    SystemStatus.findOne({'report.system.name':report.system.name},
        function(err, doc) {  // Using RegEx - search is case insensitive
        if(!err && !doc) {

            var newSystem = new SystemStatus();
            newSystem.report = report ;

            newSystem.save(function(err) {

                if(!err) {
                    res.json(201, {message: "SystemStatus created with name: " + report.system.name });
                } else {

                    res.json(500, {message: "Could not create workout. Error: " + err});
                }

            });

        } else if(!err) {
            doc.report = report ;
            doc.save(function(err) {
                if(!err) {
                    res.json(200, {message: "SystemStatus updated: " + report.system.name});
                } else {
                    res.json(500, {message: "Could not update workout. " + err});
                }
            });

           // res.json(403, {message: "Systems with that name already exists, please update instead of create or create a new system with a different name."});

        } else {
            res.json(500, { message: err});
        }
    });

}

exports.update = function(req, res) {

    var id = req.body.id;
    var workout_name = req.body.workout_name;
    var workout_description = req.body.workout_description;

    SystemStatus.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.name = workout_name;
            doc.description = workout_description;
            doc.save(function(err) {
                if(!err) {
                    res.json(200, {message: "SystemStatus updated: " + workout_name});
                } else {
                    res.json(500, {message: "Could not update workout. " + err});
                }
            });
        } else if(!err) {
            res.json(404, { message: "Could not find workout."});
        } else {
            res.json(500, { message: "Could not update workout." + err});
        }
    });
}

exports.delete = function(req, res) {

    var id = req.body.id;
    SystemStatus.findById(id, function(err, doc) {
        if(!err && doc) {
            doc.remove();
            res.json(200, { message: "SystemStatus removed."});
        } else if(!err) {
            res.json(404, { message: "Could not find workout."});
        } else {
            res.json(403, {message: "Could not delete workout. " + err });
        }
    });
}