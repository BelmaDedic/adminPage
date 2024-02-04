const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const airsoftItemsSchema = new Schema({
    title: String,
    required: Boolean,
    selected: Boolean
});

const Items = mongoose.model('airsoft_items', airsoftItemsSchema);
module.exports = Items;