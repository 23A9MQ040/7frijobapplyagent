'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Settings = {
  autoApply: boolean;
  emailNotif: boolean;
  jobAlerts: boolean;
  twoFactor: boolean;
  weeklyReport: boolean;
  aiOptimize: boolean;
  darkMode: boolean;
  remoteOnly: boolean;
  geminiApiKey: string;
  fullName: string;
  targetRole: string;
  location: string;
  resumeText: string;
};

export type Application = {
  id: number;
  company: string;
  role: string;
  status: 'interview' | 'pending' | 'applied' | 'rejected' | 'offer';
  matchScore: number;
  date: string;
  logo: string;
  matchReason?: string;
};

type AppContextType = {
  settings: Settings;
  updateSetting: (key: keyof Settings, value: any) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  applications: Application[];
  addApplication: (app: Omit<Application, 'id'>) => void;
};

const defaultSettings: Settings = {
  autoApply: true,
  emailNotif: true,
  jobAlerts: true,
  twoFactor: false,
  weeklyReport: true,
  aiOptimize: true,
  darkMode: true,
  remoteOnly: false,
  geminiApiKey: '',
  fullName: 'Sumanth',
  targetRole: 'ML / AI Engineer',
  location: 'Bangalore, India',
  resumeText: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applications, setApplications] = useState<Application[]>([
    { id: 1, company: 'Google',    role: 'AI/ML Engineer',    status: 'interview', matchScore: 92, date: '2 days ago',  logo: 'G' },
    { id: 2, company: 'OpenAI',    role: 'Prompt Engineer',   status: 'pending',   matchScore: 88, date: '4 days ago',  logo: 'O' },
    { id: 3, company: 'Anthropic', role: 'LLM Engineer',      status: 'applied',   matchScore: 85, date: '1 week ago',  logo: 'A' },
  ]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('7fri_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse settings');
      }
    }
  }, []);

  // Save to local storage
  const updateSetting = (key: keyof Settings, value: any) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('7fri_settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const addApplication = (app: Omit<Application, 'id'>) => {
    setApplications(prev => [{ ...app, id: Date.now() }, ...prev]);
  };

  return (
    <AppContext.Provider value={{ settings, updateSetting, mobileMenuOpen, setMobileMenuOpen, applications, addApplication }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
