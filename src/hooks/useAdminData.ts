import { useState, useEffect } from 'react';

const API_URL = 'https://functions.poehali.dev/96367e7c-5df4-4fea-b591-7451c0789b00';

interface AdminData {
  specialist: any;
  settings: Record<string, string>;
  services: any[];
  testimonials: any[];
  articles: any[];
  trips: any[];
}

export const useAdminData = () => {
  const [data, setData] = useState<AdminData>({
    specialist: null,
    settings: {},
    services: [],
    testimonials: [],
    articles: [],
    trips: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      console.error('Fetch error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
};
