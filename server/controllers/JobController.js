let Jobs = require('../models/jobs');

exports.store = async function(req, res, next) {
    let newJob = new Jobs({
        jobNo: req.body.job.jobNo,
        Date: req.body.job.jobDate,
        StartTime: req.body.job.jobStarttime,
        StartDate: req.body.job.jobStartDate,
        EndDate: req.body.job.jobEndDate,
        EndTime: req.body.job.jobEndTime,
        Machine: req.body.job.jobMachine,
        Machinetype: req.body.job.machinetype,
        Status: req.body.job.jobStatus,
        Remark: req.body.job.jobRemark,
        Problem: req.body.job.jobProblem,
        Reason: req.body.job.jobReason,
        Response: req.body.job.jobResponse,
        custom_reason: req.body.job.custom_reason,
        custom_response: req.body.job.custom_response,
        attched: req.body.job.attched,
        branch: req.body.job.branch
    });

    newJob = await newJob.save(function(err) {
        if (err) {
            console.log(err);
            res.send({ status: 1, message: "Fail" });
        } else {
            res.send({ status: 0, message: "OK" });
        }
    });
};
exports.update = function(req, res, next) {
    // console.log(req.body.job)
    let newJob = {
        jobNo: req.body.job.jobNo,
        Date: req.body.job.jobDate,
        StartTime: req.body.job.jobStarttime,
        StartDate: req.body.job.jobStartDate,
        EndDate: req.body.job.jobEndDate,
        EndTime: req.body.job.jobEndTime,
        Machine: req.body.job.jobMachine,
        Machinetype: req.body.job.machinetype,
        Status: req.body.job.jobStatus,
        Remark: req.body.job.jobRemark,
        Problem: req.body.job.jobProblem,
        Reason: req.body.job.jobReason,
        Response: req.body.job.jobResponse,
        custom_reason: req.body.job.custom_reason,
        custom_response: req.body.job.custom_response,
        attched: req.body.job.attched,
    };
    Jobs.findByIdAndUpdate(req.body.job._id, newJob, function(err) {
        if (err) {
            console.log(err);
            res.send({ status: 1, message: "Fail" });
        } else {
            res.send({ status: 0, message: "OK" });
        }
    })

};
exports.readSai5 = async function(req, res, next) {
    let data = await Jobs.find({ branch: "Sai5" });
    res.send(data);
};
exports.readPetch = async function(req, res, next) {
    let data = await Jobs.find({ branch: "Petch" });
    res.send(data);
};
exports.info = async function(req, res, next) {
    let data = await Jobs.find({});
    res.send(data);
};