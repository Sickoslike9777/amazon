const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Проверка на наличие ключей, чтобы не ронять сервер сразу
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn("⚠️ Внимание: Нет ключей Supabase в переменных окружения!");
}

// Создаем клиент (даже если ключей нет, создаем пустой, чтобы сервер запустился)
const supabase = createClient(supabaseUrl || 'https://placeholder.url', supabaseKey || 'placeholder-key');

async function saveCardData(data) {
    // Если ключей нет, просто выводим в консоль (режим отладки)
    if (!supabaseUrl) {
        console.log("Mock Save (No DB connection):", data);
        return;
    }

    const { data: result, error } = await supabase
        .from('cards') // Убедись, что таблица называется cards
        .insert([data]);
    
    if (error) {
        console.error("Supabase Error:", error);
        throw error;
    }
    return result;
}

module.exports = { saveCardData };