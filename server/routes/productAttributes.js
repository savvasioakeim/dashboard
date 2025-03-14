const express = require('express');
const router = express.Router();
const { Brand, Category, Color, Size, Type } = require('../models/ProductAttributes');


router.post('/brands', async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);


        if (!name) return res.status(400).json({ message: "Brand name is required" });


        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.status(400).json({ message: "Brand already exists" });
        }


        const brand = new Brand({ name });
        await brand.save();


        res.status(201).json(brand);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/brands', async (req, res) => {
    try {
        const brands = await Brand.find();
        console.log(brands)
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/categories', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Category name is required" });

        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/colors', async (req, res) => {
    try {
        const { name, rgb } = req.body;
        if (!name) return res.status(400).json({ message: "Color name is required" });

        const color = new Color({ name, rgb });
        await color.save();
        res.status(201).json(color);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/colors', async (req, res) => {
    try {
        const colors = await Color.find();
        res.status(200).json(colors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/sizes', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Size name is required" });

        const size = new Size({ name });
        await size.save();
        res.status(201).json(size);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/sizes', async (req, res) => {
    try {
        const sizes = await Size.find();
        res.status(200).json(sizes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/types', async (req, res) => {
    try {
        const { name, category } = req.body;
        if (!name) return res.status(400).json({ message: "Type name is required" });

        const type = new Type({ name, category });
        await type.save();
        res.status(201).json(type);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/types', async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/brands/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) return res.status(404).json({ message: "Brand not found" });

        res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/categories/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/colors/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const color = await Color.findByIdAndDelete(id);
        if (!color) return res.status(404).json({ message: "Color not found" });

        res.status(200).json({ message: "Color deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/sizes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const size = await Size.findByIdAndDelete(id);
        if (!size) return res.status(404).json({ message: "Size not found" });

        res.status(200).json({ message: "Size deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/types/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const type = await Type.findByIdAndDelete(id);
        if (!type) return res.status(404).json({ message: "Type not found" });

        res.status(200).json({ message: "Type deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
