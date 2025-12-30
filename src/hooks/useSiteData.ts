import { useState, useEffect } from 'react';
import { SITE_DATA } from '@/data/siteData';

const API_URL = 'https://functions.poehali.dev/dd1d02c6-ba51-49be-be8b-b6a59bb6b93c';
const USE_STATIC_DATA = true; // Toggle to use static data instead of API

// Fallback data if API is unavailable
const FALLBACK_DATA: SiteData = {
  specialist: {
    id: 1,
    full_name: 'Бурая Ольга Вилленовна',
    title: 'Нейродефектолог, брифабилитолог, фасциолог, логопед-реабилитолог.',
    bio: 'Специалист с многолетним опытом работы с детьми с особенностями развития. Использую современные методики и индивидуальный подход к каждому ребёнку.',
    location: 'Москва',
    phone: '+7 (999) 123-45-67',
    whatsapp: '+79991234567',
    telegram: 'https://t.me/username',
    instagram: 'https://instagram.com/username',
    photo_url: 'https://cdn.poehali.dev/projects/a166d6d7-2fe8-428d-8ea8-cfa2f49ef647/files/dc1855c0-ee5a-4d26-ba95-ae790a50eab5.jpg',
    specializations: ['Нейродефектология', 'Логопедия'],
    experience_years: 10,
    clients_count: 200,
    success_rate: 95
  },
  services: [],
  testimonials: [],
  articles: [],
  trips: []
};

interface Specialist {
  id: number;
  full_name: string;
  title: string;
  bio: string;
  location: string;
  phone: string;
  email?: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  photo_url: string;
  specializations: string[];
  experience_years: number;
  clients_count: number;
  success_rate: number;
}

interface Service {
  id: number;
  title: string;
  price: number;
  duration: string;
  description: string;
  category: string;
  icon: string;
}

interface Testimonial {
  id: number;
  client_name: string;
  city: string;
  text: string;
  date: string;
  rating: number;
  photo_url?: string;
}

interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  publish_date: string;
  tags: string[];
  views: number;
}

interface Trip {
  id: number;
  city: string;
  current_applications: number;
  required_for_trip: number;
  status: string;
  trip_dates?: string;
}

interface SiteData {
  specialist?: Specialist;
  settings?: Record<string, string>;
  services?: Service[];
  testimonials?: Testimonial[];
  articles?: Article[];
  trips?: Trip[];
}

export const useSiteData = (endpoint: string = 'all') => {
  const [data, setData] = useState<SiteData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (USE_STATIC_DATA) {
        // Use static data from file
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate loading
        setData(SITE_DATA);
        setError(null);
        setLoading(false);
        return;
      }

      // Fetch from API (legacy)
      try {
        setLoading(true);
        console.log('Fetching from:', `${API_URL}?endpoint=${endpoint}`);
        
        const response = await fetch(`${API_URL}?endpoint=${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        }
        
        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
        setError(errorMessage);
        console.error('Fetch error:', errorMessage, 'for', `${API_URL}?endpoint=${endpoint}`);
        console.warn('Using fallback data due to API error');
        setData(FALLBACK_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export type { Specialist, Service, Testimonial, Article, Trip, SiteData };