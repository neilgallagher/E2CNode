var SystemStatus = require('../models/system_status').SystemStatus;
/*
 * Systems Routes
 */
exports.index = function(req, res)
{
    var option = req.query.option ;

    SystemStatus.find({}, function(err, systems) {
        if(!err)
        {
            var systemStatus = systems[0] ;
            var data = [] ;
            if ( systemStatus != null )
            {
                var applications = systemStatus._doc.report.application ;
                var devices = systemStatus._doc.report.devices.device ;
                var logs = systemStatus._doc.report.log ;

                if ( option == 0 )
                {
                    for ( var i = 0; i < applications.length; ++i )
                    {
                        var app = applications[i] ;
                        data.push( [
                            app.name,
                            app.version
                        ]) ;
                    }
                }
                else if ( option == 1 )
                {
                    for ( var i = 0; i < devices.length; ++i )
                    {
                        var device = devices[i] ;
                        data.push( [
                            device.name,
                            device.deviceType.name,
                            device.deviceType.id,
                            device.status.level,
                            device.status.text
                        ]) ;
                    }
                }
                else if ( option == 2 )
                {
                    for ( var i = 0; i < logs.length; ++i )
                    {
                        var log = logs[i] ;
                        data.push( [
                            log.event,
                            log.message
                        ]) ;
                    }
                }
            }
           /* var data = [
                [
                    "Trident",
                    "Internet Explorer 4.0",
                    "Win 95+",
                    "4" + Math.random(),
                    "X"
                ],
                [
                    "Trident",
                    "Chrome",
                    "Win 95+",
                    "3" + Math.random(),
                    "X"
                ],
                [
                "Trident",
                    "Safari",
                    "Win 95+",
                    "2" + Math.random(),
                    "X"
                ]
            ]*/

            res.json(200, { aaData: data });
        } else {
            res.json(500, { message: err });
        }
    });
}