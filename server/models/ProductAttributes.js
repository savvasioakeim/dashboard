const mongoose = require('mongoose');

// Brand Schema
const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});
const Brand = mongoose.model('Brand', BrandSchema);

// Category Schema
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});
const Category = mongoose.model('Category', CategorySchema);

// Type Schema
const TypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});
const Type = mongoose.model('Type', TypeSchema);

// Size Schema
const SizeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
});
const Size = mongoose.model('Size', SizeSchema);

// Color Schema
const ColorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    rgb: { type: String, required: true },
    hex: { type: String, required: false }
});
const Color = mongoose.model('Color', ColorSchema);

module.exports = { Brand, Category, Type, Size, Color };
