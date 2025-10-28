-- Таблица настроек сайта
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица информации о специалисте
CREATE TABLE IF NOT EXISTS specialist_info (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT,
    location VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    whatsapp VARCHAR(50),
    telegram VARCHAR(255),
    instagram VARCHAR(255),
    photo_url VARCHAR(500),
    specializations TEXT[],
    experience_years INTEGER,
    clients_count INTEGER,
    success_rate INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Вставка данных о специалисте Ольги Бурая
INSERT INTO specialist_info (
    full_name,
    title,
    bio,
    location,
    phone,
    whatsapp,
    telegram,
    instagram,
    photo_url,
    specializations,
    experience_years,
    clients_count,
    success_rate
) VALUES (
    'Ольга Бурая',
    'Медицинский логопед, нейродефектолог, специалист ЛФМ',
    'Мир принадлежит тем, кто ему рад! ✨ 

Я помогаю детям с особенностями развития раскрыть свой потенциал через комплексный подход: логопедия, нейродефектология, фасциопатия, респираторная абилитация (БРИФ), КСТ, тейпирование, работа с дисфагией.

Мой метод основан на глубоком понимании взаимосвязи тела и мозга. Каждый ребёнок уникален, и я создаю индивидуальную программу развития, объединяя современные методики.',
    'Москва',
    '+7 (999) 999-99-99',
    '+79999999999',
    'https://t.me/olga_buraya_logo',
    'https://www.instagram.com/olga_buraya_',
    'https://cdn.poehali.dev/projects/a166d6d7-2fe8-428d-8ea8-cfa2f49ef647/files/dc1855c0-ee5a-4d26-ba95-ae790a50eab5.jpg',
    ARRAY[
        'Фасциопатия',
        'Медицинский логопед',
        'Логопед-реабилитолог',
        'ЛФМ специалист',
        'БРИФ (респираторный абилитолог)',
        'Нейродефектолог',
        'КСТ',
        'Тейпирование',
        'Работа с дисфагией'
    ],
    7,
    200,
    95
);

-- Вставка настроек сайта
INSERT INTO site_settings (key, value, description) VALUES
('site_title', 'Ольга Бурая - Нейродефектолог', 'Заголовок сайта'),
('site_subtitle', 'Медицинский логопед, специалист ЛФМ, БРИФ-терапевт', 'Подзаголовок сайта'),
('site_motto', 'Мир принадлежит тем, кто ему рад! ✨', 'Девиз специалиста'),
('hero_title', 'Помощь особенным детям через комплексный подход', 'Заголовок главной секции'),
('hero_description', 'Индивидуальные программы развития и коррекции с использованием современных методик: нейродефектология, логопедия, фасциопатия, респираторная абилитация', 'Описание главной секции'),
('contact_cta', 'Запишитесь на консультацию', 'Призыв к действию'),
('services_title', 'Мои услуги', 'Заголовок раздела услуг'),
('about_title', 'О специалисте', 'Заголовок раздела о специалисте'),
('telegram_channel_url', 'https://t.me/olga_buraya_logo', 'Ссылка на телеграм канал'),
('instagram_url', 'https://www.instagram.com/olga_buraya_', 'Ссылка на Instagram')
ON CONFLICT (key) DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = CURRENT_TIMESTAMP;