-- Обновление информации о специалисте
UPDATE specialist_info SET
  full_name = 'Бурая Ольга Вилленовна',
  title = 'Нейродефектолог, брифабилитолог, фасциолог, логопед-реабилитолог.',
  bio = 'Я - Ольга Бурая, медицинский логопед и работаю по направлениям: 
-логопедическая реабилитация, 
-работа ЛФМ специалиста и
-Брифкуратора,
-образовательная кинезиология, 
-логопедия, 
-нейродефектология,
-кинезиотейпирование. ',
  phone = '+79031575636',
  whatsapp = '+79031575636',
  telegram = 'https://t.me/olga_buraya_logo',
  instagram = 'https://www.instagram.com/olga_buraya_?igsh=MXcwMjdnemFvaHU1',
  photo_url = 'https://cdn.poehali.dev/files/5375297230924876980.jpg'
WHERE id = 1;

-- Обновление услуг
UPDATE services SET
  title = 'Консультация для родителей',
  price = 2000,
  duration = '45 минут',
  description = 'Обучение родителей методам домашней работы, ответы на вопросы, корректировка стратегии развития',
  category = 'consultation',
  icon = 'MessageSquare'
WHERE id = 4;

UPDATE services SET
  title = 'Первичная консультация',
  price = 2500,
  duration = '60 минут',
  description = 'Знакомство с ребёнком, сбор анамнеза, первичная оценка развития и определение проблемных зон',
  category = 'consultation',
  icon = 'ClipboardList'
WHERE id = 1;

UPDATE services SET
  title = 'Тейпирование',
  price = 2000,
  duration = '20-30 минут',
  description = 'Наложение кинезиологических тейпов для поддержки мышц лица и тела, улучшения осанки, коррекции тонуса',
  category = 'therapy',
  icon = 'Layers'
WHERE id = 13;

UPDATE services SET
  title = 'Коррекционное занятие',
  price = 3000,
  duration = '45-60 минут',
  description = 'Индивидуальное развивающее занятие по программе с использованием нейропсихологических методик',
  category = 'therapy',
  icon = 'Users'
WHERE id = 3;

UPDATE services SET
  title = 'ЛФМ-терапия (логопедический массаж)',
  price = 3000,
  duration = '30-45 минут',
  description = 'Логопедический фасциальный массаж для улучшения артикуляции, снятия гипер/гипотонуса мышц лица и шеи',
  category = 'therapy',
  icon = 'Activity'
WHERE id = 11;

UPDATE services SET
  title = 'Сеанс фасциопатии',
  price = 4000,
  duration = '45-60 минут',
  description = 'Работа с фасциальной системой тела для улучшения тонуса, координации, снятия мышечных зажимов и улучшения общего самочувствия',
  category = 'therapy',
  icon = 'Hand'
WHERE id = 9;

UPDATE services SET
  title = 'Сеанс БРИФ (респираторная абилитация)',
  price = 4000,
  duration = '45-60 минут',
  description = 'Коррекция дыхательных паттернов, работа над правильным дыханием для улучшения речи, концентрации и общего развития',
  category = 'therapy',
  icon = 'Wind'
WHERE id = 10;

UPDATE services SET
  title = 'КСТ (краниосакральная терапия)',
  price = 4500,
  duration = '45-60 минут',
  description = 'Мягкая мануальная техника для балансировки краниосакральной системы, улучшения работы ЦНС и общей саморегуляции организма',
  category = 'therapy',
  icon = 'Waves'
WHERE id = 12;

UPDATE services SET
  title = 'Абонемент 8 занятий',
  price = 22000,
  duration = '1 месяц',
  description = 'Месячный абонемент на 8 коррекционных занятий со скидкой 8%',
  category = 'package',
  icon = 'Package'
WHERE id = 6;

UPDATE services SET
  title = 'Абонемент 12 занятий',
  price = 31500,
  duration = '1.5 месяца',
  description = 'Курс из 12 занятий со скидкой 13% - оптимальный вариант для стабильной динамики',
  category = 'package',
  icon = 'Package'
WHERE id = 7;