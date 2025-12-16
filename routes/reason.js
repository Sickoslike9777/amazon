// routes/reason.js
const express = require('express');
const router = express.Router();

router.get('/reason', (req, res) => {
    // Мы должны получить параметры (товар, цена, заказ) из предыдущего шага,
    // чтобы передать их дальше.
    const { item, price, order } = req.query;

    res.render('reason_selection', {
        item: item,
        price: price,
        order: order
    });
});

module.exports = router;