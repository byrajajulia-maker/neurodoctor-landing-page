-- Изменение минимального количества заявок для интенсива с 8 на 6
UPDATE business_trips 
SET required_for_trip = 6 
WHERE status IN ('active', 'planned');