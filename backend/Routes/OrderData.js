const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    data.unshift({ order_date: req.body.order_date });

    try {
        let eId = await Order.findOne({ email: req.body.email });
        console.log(eId);
        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
            console.log("Received order data:", req.body.order_data);
console.log("User email:", req.body.email);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        let orderData = await Order.find({'email': req.body.email});
        res.json(orderData);
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
