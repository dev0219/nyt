const mongoose = require('mongoose');

// User Schema
const JobSchema = mongoose.Schema({
    jobNo: {
        type: String,

    },
    Date: {
        type: String,

    },
    StartTime: {
        type: String,

    },
    StartDate: {
        type: String,

    },
    EndDate: {
        type: String,

    },
    EndTime: {
        type: String,

    },
    Machine: {
        type: String,

    },
    Machinetype: {
        type: String,

    },
    Status: {
        type: String,

    },
    Remark: {
        type: String,

    },
    Problem: {
        type: String,

    },
    Reason: {
        type: String,

    },
    Response: {
        type: String,

    },
    custom_reason: {
        type: String,

    },
    custom_response: {
        type: String,

    },
    attched: {
        type: String,
    },
    branch: {
        type: String,
    }
});

const Jobs = module.exports = mongoose.model('jobs', JobSchema);