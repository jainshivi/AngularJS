var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    item: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    }
});