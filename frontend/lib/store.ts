import { create } from 'zustand';
import { UserProfile, Resume } from '@/types';

interface UserStore {
  user: UserProfile | null;
  resume: Resume | null;
  isLoading: boolean;
  error: string | null;
  
  setUser: (user: UserProfile) => void;
  setResume: (resume: Resume) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  resume: null,
  isLoading: false,
  error: null,
  
  setUser: (user) => set({ user }),
  setResume: (resume) => set({ resume }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, resume: null }),
}));
