// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../model');
const multer = require('multer');
const fs = require('fs');




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});



const upload = multer({ storage });


router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { name } = req.body;
        const images = req.files.map(file => file.path);
        const product = new Product({ name, images });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




router.put('/:id', upload.array('images', 5), async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        let { images } = req.body;



        if (req.files.length > 0) {
            images = req.files.map(file => file.path);
        }

        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }



        if (name) {
            product.name = name;
        }


        // Update product images
        if (images) {
            product.images = product.images ? product.images.concat(images) : images;
        }


        product = await product.save();

        res.json(product);



    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


});






router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        const imagePaths = product.images;

        for (const imagePath of imagePaths) {

            fs.unlink(imagePath, err => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
            });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




router.delete('/:productId/removeImage/:imageIndex', async (req, res) => {
    try {
        const { productId, imageIndex } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.images && product.images.length > imageIndex) {

            const imagePath = product.images[imageIndex];

            product.images.splice(imageIndex, 1);

            fs.unlink(imagePath, err => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
            });

        } else {
            return res.status(200).json({ message: 'local image removed' });
        }

        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error removing image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});








module.exports = router;
