const Product = require('../base de donnée/model/aut')

exports.createProduct = (req, res) => {
    const prod = new Product(req.body);
    prod.save()
    .then((product) => {
        return res.status(201).json(product);
    }).catch((error) => {
        return res.status(400).json({error}) });
}