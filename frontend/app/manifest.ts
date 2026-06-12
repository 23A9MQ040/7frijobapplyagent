import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '7FRI Job Apply Agent',
    short_name: 'JobApply',
    description: 'Autonomous AI job application platform',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#050510',
    theme_color: '#00d4ff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
