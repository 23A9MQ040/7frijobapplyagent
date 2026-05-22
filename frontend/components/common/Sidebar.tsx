'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Briefcase,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', icon: Home, href: '/dashboard' },
  { label: 'Jobs', icon: Briefcase, href: '/dashboard/jobs' },
  { label: 'Applications', icon: FileText, href: '/dashboard/applications' },
  { label: 'Resume', icon: FileText, href: '/dashboard/resume' },
  { label: 'Recruiters', icon: Users, href: '/dashboard/recruiters' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0 overflow-y-auto">
      {/* Brand */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-sm">
            7F
          </div>
          <span className="font-bold text-sm">JobApply</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-red-400 rounded-lg transition text-sm">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
