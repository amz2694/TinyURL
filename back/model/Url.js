const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    realURL: {
        type: String,
        required: true
    },
    shortURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Url', urlSchema);