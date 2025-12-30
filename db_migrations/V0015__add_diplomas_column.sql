-- Добавление колонки для дипломов
ALTER TABLE specialist_info 
ADD COLUMN IF NOT EXISTS diplomas TEXT[] DEFAULT '{}';