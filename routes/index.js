// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Получаем данные из URL. Если их нет — ставим значения "по умолчанию"
    const productItem = req.query.item || 'Sony WH-1000XM5 Wireless Headphones';
    const refundPrice = req.query.price || '348.00';
    const orderId = req.query.order || '114-5592143-8874650';
    
    // Передаем эти данные внутрь HTML-шаблона
    res.render('refund_start', {
        item: productItem,
        price: refundPrice,
        order: orderId
    }); 
});

module.exports = router;