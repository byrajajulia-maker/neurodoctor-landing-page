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
-кинезиотейпирование.',
  phone = '+79031575636',
  whatsapp = '+79031575636',
  telegram = 'https://t.me/olga_buraya_logo',
  instagram = 'https://www.instagram.com/olga_buraya_?igsh=MXcwMjdnemFvaHU1',
  photo_url = 'https://cdn.poehali.dev/files/5375297230924876980.jpg',
  diplomas = ARRAY[]::TEXT[]
WHERE id = 1;