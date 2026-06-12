import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '7FRIJOBAPPLYAGENT - AI Job Application SaaS',
  description: 'Autonomous AI job application platform',
};

import { ToastProvider } from './ToastContext';
import { AppProvider } from './AppContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AppProvider>
      </body>
    </html>
  );
}
