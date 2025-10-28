import { useState, useEffect } from 'react';

const API_URL = 'https://functions.poehali.dev/dd1d02c6-ba51-49be-be8b-b6a59bb6b93c';

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
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}?endpoint=${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        console.error('Error fetching site data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export type { Specialist, Service, Testimonial, Article, Trip, SiteData };
