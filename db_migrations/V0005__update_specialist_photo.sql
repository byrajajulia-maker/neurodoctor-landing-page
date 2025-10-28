-- Обновляем фото специалиста
UPDATE specialist_info 
SET photo_url = 'https://cdn.poehali.dev/projects/a166d6d7-2fe8-428d-8ea8-cfa2f49ef647/files/238f8241-3116-42ec-990e-4402a97e1d4f.jpg',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;