'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAppContext } from '@/app/AppContext';
import { useToast } from '@/app/ToastContext';

const navItems = [
  { label: 'Dashboard',    icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Jobs',         icon: Briefcase,       href: '/dashboard/jobs' },
  { label: 'Applications', icon: FileText,        href: '/dashboard/applications' },
  { label: 'Resume',       icon: FileText,        href: '/dashboard/resume' },
  { label: 'Recruiters',   icon: Users,           href: '/dashboard/recruiters' },
  { label: 'Analytics',    icon: BarChart3,       href: '/dashboard/analytics' },
  { label: 'Settings',     icon: Settings,        href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const { mobileMenuOpen, setMobileMenuOpen } = useAppContext();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sidebarWidth = '240px';

  return (
    <>
    {isMobile && mobileMenuOpen && (
      <div 
        onClick={() => setMobileMenuOpen(false)}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 90 }} 
      />
    )}
    <aside style={{
      width: sidebarWidth,
      minHeight: '100vh',
      background: 'linear-gradient(180deg, rgba(5,5,20,0.98) 0%, rgba(10,5,30,0.98) 100%)',
      borderRight: '1px solid rgba(124,58,237,0.2)',
      display: 'flex',
      flexDirection: 'column',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0,
      left: isMobile ? (mobileMenuOpen ? 0 : '-100%') : 0,
      backdropFilter: 'blur(20px)',
      zIndex: 100,
      transition: 'left 0.3s ease',
    }}>
      {/* Brand */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Logo orb */}
            <div style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '14px', color: '#fff',
              boxShadow: '0 0 15px rgba(0,212,255,0.4)',
              flexShrink: 0,
            }}>7F</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#f0f0ff', letterSpacing: '0.01em' }}>
                JobApply
              </div>
              <div style={{ fontSize: '10px', color: '#00d4ff', letterSpacing: '0.1em', fontWeight: 500 }}>
                AI AGENT
              </div>
            </div>
          </div>
          {isMobile && (
            <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#8892b0', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Live status pill */}
        <div style={{
          marginTop: '14px',
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '5px 10px',
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '9999px',
          width: 'fit-content',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 6px #00ff88',
            animation: 'pulse-neon 2s infinite',
            display: 'inline-block',
          }} />
          <span style={{ fontSize: '10px', color: '#00d4ff', fontWeight: 600, letterSpacing: '0.08em' }}>
            AGENT RUNNING
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        <div style={{ fontSize: '10px', color: '#4a5568', fontWeight: 600, letterSpacing: '0.1em', padding: '8px 10px 4px' }}>
          NAVIGATION
        </div>
        {navItems.map((item, i) => {
          const Icon = item.icon;
          const isActive = mounted && pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '2px',
                color: isActive ? '#00d4ff' : '#8892b0',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))'
                  : 'transparent',
                border: isActive ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                fontSize: '13px', fontWeight: 500,
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                position: 'relative',
                boxShadow: isActive ? '0 0 12px rgba(0,212,255,0.1)' : 'none',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLElement).style.color = '#f0f0ff';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#8892b0';
                }
              }}
            >
              {isActive && (
                <span style={{
                  position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                  width: '3px', height: '60%', background: '#00d4ff',
                  borderRadius: '0 3px 3px 0',
                  boxShadow: '0 0 8px #00d4ff',
                }} />
              )}
              <Icon size={16} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.label}</span>
                {isActive && <ChevronRight size={12} style={{ opacity: 0.5 }} />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Quick stats */}
        <div style={{
          display: 'flex', gap: '8px', marginBottom: '10px',
        }}>
          {[{ label: 'Jobs', val: '1.2k' }, { label: 'Apps', val: '89' }].map(s => (
            <div key={s.label} style={{
              flex: 1, padding: '8px', textAlign: 'center',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#00d4ff' }}>{s.val}</div>
              <div style={{ fontSize: '9px', color: '#4a5568', letterSpacing: '0.06em' }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <button 
        onClick={() => {
          showToast('Signing out...', 'info');
          setTimeout(() => router.push('/'), 1000);
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          width: '100%', padding: '10px 12px',
          borderRadius: '10px',
          color: '#8892b0', fontSize: '13px', fontWeight: 500,
          transition: 'all 0.2s ease',
          background: 'transparent',
          border: '1px solid transparent',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.color = '#ef4444';
          (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.color = '#8892b0';
          (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}>
          <LogOut size={16} />
          Logout
        </button>

        <div style={{
          textAlign: 'center',
          marginTop: '12px',
          fontSize: '10px',
          color: '#4a5568',
          letterSpacing: '0.05em',
        }}>
          &copy; Copyright by potturi chitti raju
        </div>
      </div>
    </aside>
    </>
  );
}
