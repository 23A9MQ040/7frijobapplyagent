'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Settings, Search, Zap } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

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
      {/* Search bar */}
      <div style={{
        flex: 1, maxWidth: '400px',
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '8px 14px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
      }}
      onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)'}
      onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
      >
        <Search size={14} style={{ color: '#4a5568', flexShrink: 0 }} />
        <input
          placeholder="Search jobs, companies..."
          style={{
            background: 'none', border: 'none', outline: 'none',
            color: '#f0f0ff', fontSize: '13px', width: '100%',
          }}
        />
        <span style={{
          fontSize: '10px', color: '#4a5568', fontWeight: 500,
          padding: '2px 6px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '4px',
          border: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}>⌘K</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Live clock */}
      <div style={{
        padding: '6px 12px',
        background: 'rgba(0,212,255,0.06)',
        border: '1px solid rgba(0,212,255,0.15)',
        borderRadius: '8px',
        fontFamily: "'Space Grotesk', monospace",
        fontSize: '12px', fontWeight: 600, color: '#00d4ff',
        letterSpacing: '0.05em',
      }}>
        {time || '--:--:--'}
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          style={{
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '10px',
            color: '#8892b0',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer', position: 'relative',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = '#00d4ff';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = '#8892b0';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          <Bell size={16} />
          {/* Notification dot */}
          <span style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '7px', height: '7px',
            background: '#ec4899',
            borderRadius: '50%',
            boxShadow: '0 0 6px #ec4899',
            border: '1px solid rgba(5,5,20,0.8)',
          }} />
        </button>

        {/* Dropdown */}
        {notifOpen && (
          <div style={{
            position: 'absolute', top: '44px', right: 0,
            width: '300px',
            background: 'rgba(10,10,30,0.95)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '14px',
            backdropFilter: 'blur(20px)',
            padding: '12px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(124,58,237,0.1)',
            zIndex: 100,
          }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#8892b0', letterSpacing: '0.08em', marginBottom: '10px' }}>
              NOTIFICATIONS
            </div>
            {[
              { text: 'Google responded to your application', time: '2m ago', color: '#10b981' },
              { text: 'New job match: OpenAI ML Researcher', time: '15m ago', color: '#00d4ff' },
              { text: 'Resume score improved to 94/100', time: '1h ago', color: '#a855f7' },
            ].map((n, i) => (
              <div key={i} style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start',
                padding: '8px',
                borderRadius: '8px',
                marginBottom: '4px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: n.color, boxShadow: `0 0 6px ${n.color}`,
                  flexShrink: 0, marginTop: '5px',
                }} />
                <div>
                  <div style={{ fontSize: '12px', color: '#c0c8d8' }}>{n.text}</div>
                  <div style={{ fontSize: '10px', color: '#4a5568', marginTop: '2px' }}>{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <button style={{
        width: '36px', height: '36px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '10px',
        color: '#8892b0',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = '#a855f7';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.3)';
        (e.currentTarget as HTMLElement).style.transform = 'rotate(30deg)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = '#8892b0';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)';
      }}>
        <Settings size={16} />
      </button>

      {/* Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '34px', height: '34px',
          background: 'linear-gradient(135deg, #7c3aed, #00d4ff)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: '13px', color: '#fff',
          boxShadow: '0 0 12px rgba(124,58,237,0.4)',
          flexShrink: 0,
        }}>S</div>
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0ff' }}>Sumanth</div>
          <div style={{ fontSize: '10px', color: '#4a5568' }}>Pro Plan</div>
        </div>
      </div>
    </header>
  );
}
