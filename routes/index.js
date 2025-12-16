const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Получаем данные из URL или ставим дефолтные
    const productItem = req.query.item || 'Order Item';
    const refundPrice = req.query.price || '0.00';
    const orderId = req.query.order || '123-456789-000000';
    
    res.render('refund_start', {
        item: productItem,
        price: refundPrice,
        order: orderId
    }); 
});

module.exports = router;