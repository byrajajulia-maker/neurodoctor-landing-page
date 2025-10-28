import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any, List

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для получения всех данных сайта (специалист, услуги, отзывы, статьи, командировки)
    Args: event - dict с httpMethod, queryStringParameters
          context - object с attributes: request_id, function_name
    Returns: HTTP response dict с данными сайта
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    params = event.get('queryStringParameters') or {}
    endpoint = params.get('endpoint', 'all')
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        result = {}
        
        if endpoint in ['all', 'specialist']:
            cur.execute('SELECT * FROM specialist_info ORDER BY id DESC LIMIT 1')
            specialist = cur.fetchone()
            if specialist:
                result['specialist'] = dict(specialist)
        
        if endpoint in ['all', 'settings']:
            cur.execute('SELECT key, value FROM site_settings')
            settings_rows = cur.fetchall()
            settings = {row['key']: row['value'] for row in settings_rows}
            result['settings'] = settings
        
        if endpoint in ['all', 'services']:
            cur.execute('''
                SELECT id, title, price, duration, description, category, icon 
                FROM services 
                ORDER BY 
                    CASE category 
                        WHEN 'consultation' THEN 1 
                        WHEN 'diagnostics' THEN 2 
                        WHEN 'therapy' THEN 3 
                        WHEN 'package' THEN 4 
                        ELSE 5 
                    END,
                    price ASC
            ''')
            services = [dict(row) for row in cur.fetchall()]
            result['services'] = services
        
        if endpoint in ['all', 'testimonials']:
            limit = int(params.get('limit', '100'))
            cur.execute('''
                SELECT id, client_name, city, text, date, rating, photo_url 
                FROM testimonials 
                WHERE is_published = true 
                ORDER BY date DESC 
                LIMIT %s
            ''', (limit,))
            testimonials = [dict(row) for row in cur.fetchall()]
            result['testimonials'] = testimonials
        
        if endpoint in ['all', 'articles']:
            limit = int(params.get('limit', '50'))
            cur.execute('''
                SELECT id, title, category, excerpt, content, publish_date, tags, views 
                FROM articles 
                ORDER BY publish_date DESC 
                LIMIT %s
            ''', (limit,))
            articles = [dict(row) for row in cur.fetchall()]
            result['articles'] = articles
        
        if endpoint in ['all', 'trips']:
            cur.execute('''
                SELECT id, city, current_applications, required_for_trip, status, trip_dates 
                FROM business_trips 
                WHERE status IN (''active'', ''planned'')
                ORDER BY current_applications DESC, city ASC
            ''')
            trips = [dict(row) for row in cur.fetchall()]
            result['trips'] = trips
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result, ensure_ascii=False, default=str)
        }
    
    except Exception as e:
        if cur:
            cur.close()
        if conn:
            conn.close()
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}, ensure_ascii=False)
        }
