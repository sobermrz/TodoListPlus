const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema({
    id:{
        type: String
    },
    name: {
        type: String
    },
    title: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = model = mongoose.model('toDoList', modelSchema);