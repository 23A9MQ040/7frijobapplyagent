import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '7FRIJOBAPPLYAGENT - AI Job Application SaaS',
  description: 'Autonomous AI job application platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
