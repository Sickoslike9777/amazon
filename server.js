// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); 

// Импорт маршрутов
const indexRouter = require('./routes/index');
const reasonRouter = require('./routes/reason');
const compensationRouter = require('./routes/compensation');
const successRouter = require('./routes/success');

const app = express();
const PORT = process.env.PORT || 3000; 

// --- НАСТРОЙКИ ---
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// --- МАРШРУТЫ ---
app.use('/', indexRouter);
app.use('/', reasonRouter);
app.use('/', compensationRouter);
app.use('/success', successRouter);

// --- ЗАПУСК (АДАПТИРОВАНО ДЛЯ VERCEL) ---

// Этот блок сработает только если мы запускаем локально через "node server.js"
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ LOCAL SERVER RUNNING: http://localhost:${PORT}`);
    });
}

// Обязательный экспорт для Vercel!
module.exports = app;