const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    name:{type: String, required: true}
})

module.exports = mongoose.model('test', testSchema);
