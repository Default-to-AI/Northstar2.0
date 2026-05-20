import { useState, useEffect } from 'react';
import { InvestorProfile } from '../types';
import { DEFAULT_PROFILE } from '../constants';

export function useInvestorProfile() {
  const [profile, setProfile] = useState<InvestorProfile>(() => {
    const saved = localStorage.getItem('northstar_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('northstar_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<InvestorProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return {
    profile,
    updateProfile
  };
}
