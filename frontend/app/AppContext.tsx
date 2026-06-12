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
};

type AppContextType = {
  settings: Settings;
  updateSetting: (key: keyof Settings, value: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
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
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('7fri_settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  return (
    <AppContext.Provider value={{ settings, updateSetting, mobileMenuOpen, setMobileMenuOpen }}>
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
