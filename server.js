// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Загружаем настройки из .env

// ===================================
// 0. ИМПОРТ МАРШРУТОВ
// ===================================
const indexRouter = require('./routes/index');
const reasonRouter = require('./routes/reason');         // <-- НОВЫЙ МАРШРУТ (ПРИЧИНА)
const compensationRouter = require('./routes/compensation');
const successRouter = require('./routes/success');

const app = express();
const PORT = process.env.PORT || 3000; 

// ===================================
// 1. НАСТРОЙКИ (MIDDLEWARE)
// ===================================

// Обработка данных из форм (POST-запросы)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Папка для статических файлов
app.use(express.static(path.join(__dirname, 'public')));

// Настройка шаблонизатора (EJS для HTML файлов)
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// ===================================
// 2. ПОДКЛЮЧЕНИЕ МАРШРУТОВ
// ===================================

// Шаг 1: Главная страница (Письмо)
app.use('/', indexRouter);

// Шаг 2: Страница выбора причины (НОВОЕ)
// Важно подключить этот роутер, чтобы работали ссылки /reason
app.use('/', reasonRouter); 

// Шаг 3: Страница ввода карты и обработка данных
app.use('/', compensationRouter);

// Шаг 4: Страница успешного завершения
app.use('/success', successRouter);

// ===================================
// 3. ЗАПУСК СЕРВЕРА
// ===================================

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`✅ СЕРВЕР ЗАПУЩЕН!`);
    console.log(`👉 Открой в браузере: http://localhost:${PORT}`);
    console.log(`=========================================`);
});