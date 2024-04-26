// backend/models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: [{ type: String }],
});

module.exports = mongoose.model('Product', productSchema);
