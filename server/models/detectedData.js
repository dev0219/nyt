const mongoose = require('mongoose');

// User Schema
const DetectSchema = mongoose.Schema({
    jobId: {
        type: String,
    },
    machineId: {
        type: String,
    },
    machinetype: {
        type: String,
    }
});

const Detect = module.exports = mongoose.model('detectedData', DetectSchema);