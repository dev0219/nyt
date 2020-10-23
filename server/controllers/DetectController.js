let DetectedData = require('../models/detectedData');

exports.store = async function(req, res, next) {
    let newdetect = new DetectedData({
        jobId: req.body.detect.jobId,
        machineId: req.body.detect.machineId,
        machinetype: req.body.detect.machinetype,
    });

    newdetect = await newdetect.save(function(err) {
        if (err) {
            console.log(err);
            res.send({ status: 1, message: "Fail" });
        } else {
            res.send({ status: 0, message: "OK" });
        }
    });
};
exports.info = async function(req, res, next) {
    let data = await DetectedData.find({});
    res.send(data);
};
exports.check = async function(req, res, next) {
    var machine_id = req.body.check_id;
    console.log("------------", machine_id);
    let data = await DetectedData.find({ machineId: machine_id });
    console.log(data.length);
    if (data.length > 0) {
        res.send({ status: 1, message: "Fail" });
    } else {
        res.send({ status: 0, message: "ok" });
    }

};

exports.delete = async function(req, res, next) {
    let delete_id = req.body.params._id;
    let data = await DetectedData.deleteOne({ _id: delete_id });
    res.send(data);
};