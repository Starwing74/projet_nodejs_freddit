const mongoose = require('mongoose');

const gridFsSchema = new mongoose.Schema({
    filename: String
}, {strict: false});

module.exports = mongoose.model('GFS', gridFsSchema, 'multimedia_files.files');