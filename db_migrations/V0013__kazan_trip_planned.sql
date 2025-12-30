-- Изменение статуса Казани на planned (набрано 6 заявок)
UPDATE business_trips 
SET status = 'planned'
WHERE city = 'Казань' AND current_applications >= 6;