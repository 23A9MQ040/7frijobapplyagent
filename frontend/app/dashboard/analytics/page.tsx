'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, Target, Zap, Calendar, Users } from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../../ToastContext';

const weeklyData = [12, 18, 8, 24, 19, 31, 27];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxVal = Math.max(...weeklyData);

const topCompanies = [
  { name: 'Google', applied: 8, responses: 3, rate: '37.5%', color: '#4285f4' },
  { name: 'OpenAI', applied: 6, responses: 2, rate: '33.3%', color: '#10a37f' },
  { name: 'Meta', applied: 7, responses: 1, rate: '14.3%', color: '#1877f2' },
  { name: 'Microsoft', applied: 5, responses: 2, rate: '40.0%', color: '#00a4ef' },
];

const metricsData = [
  { label: 'Total Applied', value: 89, change: '+24%', up: true, color: '#a855f7', icon: <Zap size={16} /> },
  { label: 'Response Rate', value: '28%', change: '+6%', up: true, color: '#10b981', icon: <Activity size={16} /> },
  { label: 'Interviews', value: 12, change: '+3', up: true, color: '#00d4ff', icon: <Users size={16} /> },
  { label: 'Avg Match', value: '84%', change: '+5%', up: true, color: '#ec4899', icon: <Target size={16} /> },
];

export default function AnalyticsPage() {
  const { showToast } = useToast();
  const [activeRange, setActiveRange] = useState('7 days');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          {/* Header */}
          <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f0ff', letterSpacing: '-0.02em', marginBottom: '4px' }}>Analytics</h1>
                <p style={{ color: '#8892b0', fontSize: '14px' }}>Job search performance insights</p>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {['7 days', '30 days', '90 days'].map((r) => (
                  <button key={r} onClick={() => { setActiveRange(r); showToast(`Date range updated to ${r}`, 'success'); }} style={{
                    padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                    background: activeRange === r ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${activeRange === r ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    color: activeRange === r ? '#00d4ff' : '#8892b0', transition: 'all 0.2s',
                  }}>{r}</button>
                ))}
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px' }} className="animate-fade-up delay-100">
            {metricsData.map((m, i) => (
              <div key={i} style={{
                padding: '18px', borderRadius: '14px',
                background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(124,58,237,0.12)',
                transition: 'all 0.25s ease', cursor: 'default',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.borderColor = m.color + '55'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.12)'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: m.color + '18', border: `1px solid ${m.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color }}>{m.icon}</div>
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <TrendingUp size={10} />{m.change}
                  </span>
                </div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: m.color, fontFamily: "'Space Grotesk', monospace", letterSpacing: '-0.02em' }}>{m.value}</div>
                <div style={{ fontSize: '11px', color: '#8892b0', marginTop: '3px' }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px', marginBottom: '16px' }}>

            {/* Bar Chart */}
            <div className="animate-fade-up delay-200" style={{
              background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', padding: '20px',
            }}>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>Daily Applications</div>
                  <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>This week · 139 total</div>
                </div>
                <BarChart3 size={16} style={{ color: '#4a5568' }} />
              </div>
              {/* Histogram */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0px', height: '140px', padding: '0 10px' }}>
                {weeklyData.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end', position: 'relative' }}>
                    <div style={{ fontSize: '10px', color: '#8892b0', fontWeight: 600, position: 'absolute', top: `calc(100% - ${(val / maxVal) * 100}% - 24px)` }}>{val}</div>
                    <div style={{
                      width: '100%',
                      height: `${(val / maxVal) * 100}%`,
                      background: i === weeklyData.length - 1
                        ? 'linear-gradient(180deg, #00d4ff, rgba(0,212,255,0.3))'
                        : 'linear-gradient(180deg, rgba(124,58,237,0.8), rgba(124,58,237,0.3))',
                      borderTop: `2px solid ${i === weeklyData.length - 1 ? '#00d4ff' : '#a855f7'}`,
                      borderRight: i < weeklyData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      boxShadow: i === weeklyData.length - 1 ? '0 0 15px rgba(0,212,255,0.4)' : 'none',
                      transition: 'height 0.5s ease',
                      minHeight: '8px',
                    }} />
                    <div style={{ fontSize: '10px', color: '#4a5568', marginTop: '4px' }}>{days[i]}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company breakdown */}
            <div className="animate-fade-up delay-300" style={{
              background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', padding: '20px',
            }}>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff', marginBottom: '4px' }}>Top Companies</div>
              <div style={{ fontSize: '11px', color: '#4a5568', marginBottom: '16px' }}>By response rate</div>
              {topCompanies.map((c, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: c.color }} />
                      <span style={{ fontSize: '12px', color: '#c0c8d8', fontWeight: 500 }}>{c.name}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>{c.rate}</div>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: c.rate, background: c.color, borderRadius: '9999px', boxShadow: `0 0 8px ${c.color}66` }} />
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                    <span style={{ fontSize: '10px', color: '#4a5568' }}>{c.applied} applied</span>
                    <span style={{ fontSize: '10px', color: '#4a5568' }}>{c.responses} responses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Funnel */}
          <div className="animate-fade-up delay-400" style={{
            background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', padding: '20px',
          }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff', marginBottom: '4px' }}>Application Funnel</div>
            <div style={{ fontSize: '11px', color: '#4a5568', marginBottom: '20px' }}>Conversion at each stage</div>
            <div style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
              {[
                { label: 'Applied', count: 89, pct: 100, color: '#a855f7' },
                { label: 'Viewed', count: 67, pct: 75, color: '#7c3aed' },
                { label: 'Screened', count: 23, pct: 26, color: '#00d4ff' },
                { label: 'Interview', count: 12, pct: 13, color: '#10b981' },
                { label: 'Offer', count: 1, pct: 1, color: '#f59e0b' },
              ].map((stage, i, arr) => (
                <React.Fragment key={i}>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{
                      height: `${Math.max(stage.pct * 1.2, 16)}px`,
                      background: stage.color + '22',
                      border: `1px solid ${stage.color}44`,
                      borderRadius: '8px', marginBottom: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '14px', fontWeight: 700, color: stage.color,
                      fontFamily: "'Space Grotesk', monospace",
                      transition: 'height 0.5s ease',
                      minHeight: '32px',
                    }}>{stage.count}</div>
                    <div style={{ fontSize: '11px', color: '#8892b0' }}>{stage.label}</div>
                    <div style={{ fontSize: '10px', color: stage.color, marginTop: '2px', fontWeight: 600 }}>{stage.pct}%</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ fontSize: '16px', color: '#4a5568', padding: '0 4px', flexShrink: 0, marginBottom: '28px' }}>›</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
