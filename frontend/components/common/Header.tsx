'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Settings, Search, Github, Globe, Phone, Mail, LogOut, ChevronDown, ExternalLink, Copy, CheckCheck, Linkedin, CheckCircle2, Menu } from 'lucide-react';
import { useToast } from '@/app/ToastContext';
import { useAppContext } from '@/app/AppContext';

import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [time, setTime] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const { mobileMenuOpen, setMobileMenuOpen } = useAppContext();
  const [isMobile, setIsMobile] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Google responded to your application', time: '2m ago', color: '#10b981', read: false },
    { id: 2, text: 'New job match: OpenAI ML Researcher', time: '15m ago', color: '#00d4ff', read: false },
    { id: 3, text: 'Resume score improved to 94/100', time: '1h ago', color: '#a855f7', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Live clock
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <header style={{
      height: '64px',
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      background: 'rgba(5,5,20,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(124,58,237,0.15)',
      position: 'sticky', top: 0, zIndex: 50,
      gap: '16px',
    }}>
      {isMobile && (
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#f0f0ff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Search bar */}
      <div style={{
        flex: 1, maxWidth: '400px',
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '8px 14px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
      }}>
        <Search size={14} style={{ color: '#4a5568', flexShrink: 0 }} />
        <input
          placeholder="Search jobs, companies..."
          style={{ background: 'none', border: 'none', outline: 'none', color: '#f0f0ff', fontSize: '13px', width: '100%' }}
        />
        <span style={{ fontSize: '10px', color: '#4a5568', fontWeight: 500, padding: '2px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>⌘K</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Live clock */}
      <div style={{ padding: '6px 12px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', borderRadius: '8px', fontFamily: "'Space Grotesk', monospace", fontSize: '12px', fontWeight: 600, color: '#00d4ff', letterSpacing: '0.05em' }}>
        {time || '--:--:--'}
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }} ref={notifRef}>
        <button
          onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
          style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', color: notifOpen ? '#00d4ff' : '#8892b0', background: 'rgba(255,255,255,0.04)', border: `1px solid ${notifOpen ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', position: 'relative', transition: 'all 0.2s ease' }}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span style={{ position: 'absolute', top: '6px', right: '6px', width: '7px', height: '7px', background: '#ec4899', borderRadius: '50%', boxShadow: '0 0 6px #ec4899', border: '1px solid rgba(5,5,20,0.8)' }} />
          )}
        </button>

        {notifOpen && (
          <div style={{ position: 'absolute', top: '44px', right: 0, width: '320px', background: 'rgba(10,10,30,0.97)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '14px', backdropFilter: 'blur(20px)', padding: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(124,58,237,0.1)', zIndex: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#4a5568', letterSpacing: '0.08em' }}>NOTIFICATIONS ({unreadCount})</div>
              {unreadCount > 0 && (
                <button 
                  onClick={() => { setNotifications(ns => ns.map(n => ({ ...n, read: true }))); showToast('All marked as read', 'success'); }}
                  style={{ background: 'none', border: 'none', color: '#00d4ff', fontSize: '11px', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <CheckCircle2 size={12} /> Mark all read
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
              {notifications.map((n) => (
                <div key={n.id} 
                  onClick={() => {
                    setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x));
                    showToast(`Opening details for: ${n.text}`, 'info');
                    setNotifOpen(false);
                  }} 
                  style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '10px 12px', borderRadius: '10px', background: n.read ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)', border: `1px solid ${n.read ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', transition: 'all 0.2s', opacity: n.read ? 0.6 : 1 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = n.read ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)'; }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: n.color, boxShadow: `0 0 8px ${n.color}`, flexShrink: 0, marginTop: '5px', display: 'inline-block', opacity: n.read ? 0 : 1 }} />
                  <div>
                    <div style={{ fontSize: '12px', color: '#f0f0ff', fontWeight: n.read ? 500 : 600, lineHeight: 1.4 }}>{n.text}</div>
                    <div style={{ fontSize: '10px', color: '#4a5568', marginTop: '4px' }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => { showToast('Redirecting to full notifications log...', 'info'); setNotifOpen(false); }}
              style={{ width: '100%', padding: '10px', marginTop: '12px', borderRadius: '8px', background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)', color: '#00d4ff', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.06)'; }}
            >
              View All Activity
            </button>
          </div>
        )}
      </div>

      {/* Settings */}
      <button onClick={() => router.push('/dashboard/settings')} style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', color: '#8892b0', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', transition: 'all 0.2s ease' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#a855f7'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'rotate(30deg)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8892b0'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)'; }}>
        <Settings size={16} />
      </button>

      {/* ── Profile Button + Dropdown ─────────────────────────── */}
      <div style={{ position: 'relative' }} ref={profileRef}>
        <button
          onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '4px 10px 4px 4px',
            background: profileOpen ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${profileOpen ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '12px', cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: profileOpen ? '0 0 15px rgba(124,58,237,0.2)' : 'none',
          }}
        >
          {/* Avatar */}
          <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px', color: '#fff', boxShadow: '0 0 12px rgba(124,58,237,0.4)', flexShrink: 0 }}>S</div>
          <div style={{ lineHeight: 1.2, textAlign: 'left' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0ff' }}>Sai Varma</div>
            <div style={{ fontSize: '10px', color: '#4a5568' }}>Pro Plan</div>
          </div>
          <ChevronDown size={12} style={{ color: '#4a5568', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', marginLeft: '2px' }} />
        </button>

        {/* Profile Dropdown */}
        {profileOpen && (
          <div style={{
            position: 'absolute', top: '50px', right: 0,
            width: '300px',
            background: 'rgba(8,8,25,0.98)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '16px',
            backdropFilter: 'blur(30px)',
            boxShadow: '0 25px 70px rgba(0,0,0,0.7), 0 0 40px rgba(124,58,237,0.12)',
            zIndex: 100,
            overflow: 'hidden',
          }}>
            {/* Profile header */}
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,212,255,0.06))', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '20px', color: '#fff', boxShadow: '0 0 20px rgba(124,58,237,0.5)', flexShrink: 0 }}>S</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>Sai Varma</div>
                  <div style={{ fontSize: '11px', color: '#a855f7', marginTop: '2px', fontWeight: 500 }}>AI/ML Engineer</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff88', boxShadow: '0 0 6px #00ff88', display: 'inline-block' }} />
                    <span style={{ fontSize: '10px', color: '#00ff88', fontWeight: 600, letterSpacing: '0.04em' }}>Available for opportunities</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links section */}
            <div style={{ padding: '12px' }}>
              <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '8px', paddingLeft: '4px' }}>LINKS</div>

              {/* GitHub */}
              <a
                href="https://github.com/23A9MQ040"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '6px', textDecoration: 'none',
                  transition: 'all 0.2s ease', cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Github size={16} style={{ color: '#f0f0ff' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0ff' }}>GitHub</div>
                  <div style={{ fontSize: '10px', color: '#4a5568' }}>github.com/23A9MQ040</div>
                </div>
                <ExternalLink size={12} style={{ color: '#4a5568' }} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/sai-varma"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '6px', textDecoration: 'none',
                  transition: 'all 0.2s ease', cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,102,194,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Linkedin size={16} style={{ color: '#0a66c2' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0ff' }}>LinkedIn</div>
                  <div style={{ fontSize: '10px', color: '#4a5568' }}>Connect on LinkedIn</div>
                </div>
                <ExternalLink size={12} style={{ color: '#4a5568' }} />
              </a>

              {/* Portfolio */}
              <a
                href="https://23a9mq040.github.io/7frijobapplyagent/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 12px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  marginBottom: '6px', textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Globe size={16} style={{ color: '#00d4ff' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0ff' }}>Portfolio</div>
                  <div style={{ fontSize: '10px', color: '#4a5568' }}>7FRI Job Apply Agent</div>
                </div>
                <ExternalLink size={12} style={{ color: '#4a5568' }} />
              </a>
            </div>

            {/* Contact section */}
            <div style={{ padding: '0 12px 12px' }}>
              <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)', marginBottom: '12px' }} />
              <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '8px', paddingLeft: '4px' }}>CONTACT</div>

              {/* Phone */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                marginBottom: '6px',
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={15} style={{ color: '#10b981' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0ff' }}>+91 6304467639</div>
                  <div style={{ fontSize: '10px', color: '#4a5568' }}>Phone / WhatsApp</div>
                </div>
                <button
                  onClick={() => copyToClipboard('+916304467639', 'phone')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: copied === 'phone' ? '#10b981' : '#4a5568', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center' }}
                >
                  {copied === 'phone' ? <CheckCheck size={13} /> : <Copy size={13} />}
                </button>
              </div>

              {/* Email */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={15} style={{ color: '#a855f7' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#f0f0ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>saivarma111357@gmail.com</div>
                  <div style={{ fontSize: '10px', color: '#4a5568' }}>Primary Email</div>
                </div>
                <button
                  onClick={() => copyToClipboard('saivarma111357@gmail.com', 'email')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: copied === 'email' ? '#a855f7' : '#4a5568', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  {copied === 'email' ? <CheckCheck size={13} /> : <Copy size={13} />}
                </button>
              </div>
            </div>

            {/* Footer actions */}
            <div style={{ padding: '10px 12px 12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                onClick={() => {
                  showToast('Signing out...', 'info');
                  setTimeout(() => router.push('/'), 1000);
                }}
                style={{
                width: '100%', padding: '9px', borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: 'rgba(239,68,68,0.07)',
                border: '1px solid rgba(239,68,68,0.15)',
                color: '#ef4444', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.14)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.15)'; }}
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
