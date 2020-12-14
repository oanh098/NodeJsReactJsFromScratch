const mongoose = require ('mongoose');
const Product = mongoose.model('products');

module.exports = (app) => {

    app.get('/api/product', async(req,res) => {
        let products = await Product.find();
        return res.status(200).send(products);
    });

}