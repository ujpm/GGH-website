import { useState, useEffect } from 'react';
import { Grant } from '../types/grant';

interface GrantStat {
  value: string;
  label: string;
}

// Sample data - this will be replaced with actual API calls
const sampleGrants: Grant[] = [
  {
    id: 'g1',
    title: 'Community Development Grant',
    organization: 'Global Impact Foundation',
    amount: '$50,000',
    deadline: '2024-04-30',
    category: 'grant',
    description: 'Supporting local community development initiatives'
  },
  {
    id: 'g2',
    title: 'Environmental Innovation Grant',
    organization: 'Green Earth Initiative',
    amount: '$75,000',
    deadline: '2024-05-15',
    category: 'grant',
    description: 'Funding for innovative environmental projects'
  },
  {
    id: 'g3',
    title: 'Youth Empowerment Grant',
    organization: 'Future Leaders Foundation',
    amount: '$25,000',
    deadline: '2024-04-20',
    category: 'grant',
    description: 'Supporting youth-led initiatives'
  }
];

const sampleScholarships: Grant[] = [
  {
    id: 's1',
    title: 'Global Leadership Scholarship',
    organization: 'International Education Fund',
    amount: '$20,000',
    deadline: '2024-05-01',
    category: 'scholarship',
    description: 'For aspiring global leaders'
  },
  {
    id: 's2',
    title: 'STEM Excellence Scholarship',
    organization: 'Tech Futures Foundation',
    amount: '$30,000',
    deadline: '2024-04-25',
    category: 'scholarship',
    description: 'Supporting STEM education'
  },
  {
    id: 's3',
    title: 'Arts & Culture Scholarship',
    organization: 'Creative Arts Foundation',
    amount: '$15,000',
    deadline: '2024-05-10',
    category: 'scholarship',
    description: 'For talented artists and performers'
  }
];

export const useGrants = () => {
  const [grantStats] = useState<GrantStat[]>([
    { value: '1000+', label: 'Active Grants' },
    { value: '$50M+', label: 'Total Funding' },
    { value: '500+', label: 'Success Stories' }
  ]);

  const [featuredGrants, setFeaturedGrants] = useState<Grant[]>([]);
  const [featuredScholarships, setFeaturedScholarships] = useState<Grant[]>([]);

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use the sample data
    setFeaturedGrants(sampleGrants);
    setFeaturedScholarships(sampleScholarships);
  }, []);

  return { grantStats, featuredGrants, featuredScholarships };
};
