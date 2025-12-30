import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    '''API для получения всех данных сайта из PostgreSQL'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        dsn = os.environ.get('DATABASE_URL')
        if not dsn:
            raise Exception('DATABASE_URL not configured')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        # Загружаем все данные
        result = {}
        
        # Специалист
        cur.execute('SELECT * FROM specialist_info WHERE id = 1')
        specialist = cur.fetchone()
        if specialist:
            result['specialist'] = dict(specialist)
        
        # Настройки сайта
        cur.execute('SELECT key, value FROM site_settings')
        settings_rows = cur.fetchall()
        result['settings'] = {row['key']: row['value'] for row in settings_rows}
        
        # Услуги
        cur.execute('SELECT * FROM services ORDER BY id')
        result['services'] = [dict(row) for row in cur.fetchall()]
        
        # Отзывы
        cur.execute('SELECT * FROM testimonials ORDER BY id')
        result['testimonials'] = [dict(row) for row in cur.fetchall()]
        
        # Статьи
        cur.execute('SELECT * FROM articles ORDER BY id')
        result['articles'] = [dict(row) for row in cur.fetchall()]
        
        # Командировки
        cur.execute('SELECT * FROM business_trips ORDER BY current_applications DESC, id')
        result['trips'] = [dict(row) for row in cur.fetchall()]
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result, ensure_ascii=False, default=str),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        print(f'Error: {str(e)}')
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
