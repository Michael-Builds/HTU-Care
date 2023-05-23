const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    facility: {
        type: String,
        required: true,
    }
})

healthRecordSchema.pre("save", function (next) {
    // perform any data validation or modification here
    next();
  });


const healthRecords = mongoose.model('HealthRecords', healthRecordSchema );

module.exports = healthRecords;