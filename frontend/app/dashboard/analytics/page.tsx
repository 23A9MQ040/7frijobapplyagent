'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Activity, Target, Zap, Calendar, Users } from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../../ToastContext';

import { useAppContext } from '../../AppContext';

export default function AnalyticsPage() {
  const { showToast } = useToast();
  const { applications } = useAppContext();
  const [activeRange, setActiveRange] = useState('14 days');

  // Compute Metrics
  const totalApplied = applications.length;
  const interviewing = applications.filter(a => a.status === 'interview' || a.status === 'offer' || a.status === 'rejected').length; 
  // Let's assume response rate is anyone not in 'applied' or 'rejected' (wait, rejected is a response)
  const responded = applications.filter(a => a.status !== 'applied').length;
  const responseRate = totalApplied > 0 ? Math.round((responded / totalApplied) * 100) : 0;
  
  const interviewsCount = applications.filter(a => a.status === 'interview').length;
  const offersCount = applications.filter(a => a.status === 'offer').length;
  
  const avgMatch = totalApplied > 0 
    ? Math.round(applications.reduce((acc, app) => acc + (app.matchScore || 0), 0) / totalApplied) 
    : 0;

  const metricsData = [
    { label: 'Total Applied', value: totalApplied, change: '+12%', up: true, color: '#a855f7', icon: <Zap size={16} /> },
    { label: 'Response Rate', value: `${responseRate}%`, change: '+5%', up: true, color: '#10b981', icon: <Activity size={16} /> },
    { label: 'Interviews', value: interviewsCount, change: '+2', up: true, color: '#00d4ff', icon: <Users size={16} /> },
    { label: 'Avg Match', value: `${avgMatch}%`, change: '+1%', up: true, color: '#ec4899', icon: <Target size={16} /> },
  ];

  // Compute Histogram (last 14 days)
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toISOString().split('T')[0];
  });
  
  const weeklyData = last14Days.map(dateStr => {
    return applications.filter(a => a.date === dateStr).length;
  });
  
  const days = last14Days.map(d => {
    const dateObj = new Date(d);
    return dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  });
  
  const maxVal = Math.max(...weeklyData, 5); // ensure at least 5 for scale

  // Compute Top Companies by application count
  const companyCounts: Record<string, number> = {};
  applications.forEach(a => { companyCounts[a.company] = (companyCounts[a.company] || 0) + 1; });
  const sortedCompanies = Object.entries(companyCounts).sort((a,b) => b[1] - a[1]).slice(0, 4);
  const colors = ['#4285f4', '#10a37f', '#1877f2', '#00a4ef'];
  
  const topCompanies = sortedCompanies.map(([name, count], i) => {
    const appsForComp = applications.filter(a => a.company === name);
    const resCount = appsForComp.filter(a => a.status !== 'applied').length;
    const rate = count > 0 ? Math.round((resCount/count)*100) : 0;
    return { name, applied: count, responses: resCount, rate: `${rate}%`, color: colors[i] };
  });

  // Funnel
  const funnelStages = [
    { label: 'Applied', count: totalApplied, pct: 100, color: '#a855f7' },
    { label: 'Responded', count: responded, pct: totalApplied ? Math.round((responded/totalApplied)*100) : 0, color: '#7c3aed' },
    { label: 'Screened', count: interviewsCount + offersCount, pct: totalApplied ? Math.round(((interviewsCount + offersCount)/totalApplied)*100) : 0, color: '#00d4ff' },
    { label: 'Interview', count: interviewsCount, pct: totalApplied ? Math.round((interviewsCount/totalApplied)*100) : 0, color: '#10b981' },
    { label: 'Offer', count: offersCount, pct: totalApplied ? Math.round((offersCount/totalApplied)*100) : 0, color: '#f59e0b' },
  ];



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
                {['14 days', '30 days', '90 days'].map((r) => (
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
                  <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>Last 14 days · {totalApplied} total</div>
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
              {funnelStages.map((stage, i, arr) => (
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
