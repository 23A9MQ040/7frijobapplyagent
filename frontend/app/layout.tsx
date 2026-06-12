import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: '7FRIJOBAPPLYAGENT - AI Job Application SaaS',
  description: 'Autonomous AI job application platform',
};

import { ToastProvider } from './ToastContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
