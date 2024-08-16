const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    name: {
        type: String,
        required: true // Ensures that this field is required
    },
    email: {
        type: String,
        required: true // Ensures that this field is required
    },
    number: {
        type: String,
        required: true // Ensures that this field is required
    },
    message: {
        type: String,
        required: true // Ensures that this field is required
    },

}, { timestamps: true });

const Rjmodal = mongoose.model('Rjmodal', formSchema);

module.exports = Rjmodal;
