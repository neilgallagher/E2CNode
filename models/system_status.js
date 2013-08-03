var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var systemStatusSchema = new Schema({
    report: {
        system: {
            name: {type: String, required: true, index: {unique: true}},
            status: { level: Number, text: String}
        },
        application: [
            {name: String, version: String}
        ],
        log: [
            {event: {type: Date, default: Date.now()}, message: String}
        ],
        devices: {
            device: [
                {name: String, deviceType: {id: String, name: String}, status: {level: Number, text: String}}
            ]
        }
    }
});


var systemStatus = mongoose.model('systemStatus', systemStatusSchema);

module.exports = {
    SystemStatus: systemStatus
};
