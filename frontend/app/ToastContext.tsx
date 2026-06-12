'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px', pointerEvents: 'none' }}>
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';
          const color = isSuccess ? '#10b981' : isError ? '#ef4444' : '#00d4ff';
          
          return (
            <div key={t.id} className="animate-fade-up" style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 20px', borderRadius: '12px',
              background: 'rgba(8,8,20,0.95)', backdropFilter: 'blur(20px)',
              border: `1px solid ${color}44`,
              boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 20px ${color}15`,
              color: '#f0f0ff', fontSize: '14px', fontWeight: 500,
              pointerEvents: 'auto',
            }}>
              {isSuccess ? <CheckCircle2 size={18} color={color} /> : isError ? <XCircle size={18} color={color} /> : <Info size={18} color={color} />}
              {t.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
