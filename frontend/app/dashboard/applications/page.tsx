'use client';

import React, { useState } from 'react';
import {
  Search, Filter, MessageSquare, Calendar, TrendingUp,
  ChevronDown, ExternalLink, CheckCircle2, XCircle,
  Clock, Zap, BarChart3,
} from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../../ToastContext';
import { useAppContext } from '../../AppContext';

const fallbackLogoColors: Record<string, string> = {
  G: 'linear-gradient(135deg,#4285f4,#0f9d58)',
  O: 'linear-gradient(135deg,#10a37f,#1a7f64)',
  A: 'linear-gradient(135deg,#cc785c,#a85c3a)',
  M: 'linear-gradient(135deg,#1877f2,#0d5dbf)',
  Ms: 'linear-gradient(135deg,#00a4ef,#7fba00)',
  D: 'linear-gradient(135deg,#4285f4,#0f9d58)',
};

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  interview: { label: 'Interview',  color: '#00d4ff', bg: 'rgba(0,212,255,0.1)',    border: 'rgba(0,212,255,0.25)',   icon: <MessageSquare size={11} /> },
  pending:   { label: 'Pending',    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.25)', icon: <Clock size={11} /> },
  applied:   { label: 'Applied',    color: '#a855f7', bg: 'rgba(168,85,247,0.1)',   border: 'rgba(168,85,247,0.25)', icon: <CheckCircle2 size={11} /> },
  rejected:  { label: 'Rejected',   color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.25)', icon: <XCircle size={11} /> },
  offer:     { label: 'Offer 🎉',   color: '#10b981', bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.25)', icon: <CheckCircle2 size={11} /> },
};

export default function ApplicationsPage() {
  const { showToast } = useToast();
  const { applications } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const shown = applications.filter(a =>
    (filter === 'All' || a.status === filter.toLowerCase()) &&
    (a.company.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase()))
  );

  const pipelineCounts = {
    applied: applications.filter(a => a.status === 'applied').length,
    pending: applications.filter(a => a.status === 'pending').length,
    interview: applications.filter(a => a.status === 'interview').length,
    offer: applications.filter(a => a.status === 'offer').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          {/* Header */}
          <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f0ff', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              Applications
            </h1>
            <p style={{ color: '#8892b0', fontSize: '14px' }}>
              Track all <span style={{ color: '#a855f7', fontWeight: 600 }}>{applications.length} applications</span> submitted by your AI agent
            </p>
          </div>

          {/* Pipeline Overview */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '20px',
          }} className="animate-fade-up delay-100">
            {[
              { label: 'Applied',   count: pipelineCounts.applied,   color: '#a855f7', bg: 'rgba(168,85,247,0.08)',  border: 'rgba(168,85,247,0.2)' },
              { label: 'Pending',   count: pipelineCounts.pending,   color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
              { label: 'Interview', count: pipelineCounts.interview, color: '#00d4ff', bg: 'rgba(0,212,255,0.08)',   border: 'rgba(0,212,255,0.2)' },
              { label: 'Offer',     count: pipelineCounts.offer,     color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
              { label: 'Rejected',  count: pipelineCounts.rejected,  color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)' },
            ].map(p => (
              <button key={p.label} onClick={() => setFilter(p.label === filter ? 'All' : p.label)} style={{
                padding: '14px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                background: filter === p.label ? p.bg : 'rgba(10,10,30,0.6)',
                border: `1px solid ${filter === p.label ? p.border : 'rgba(255,255,255,0.06)'}`,
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
              }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: p.color, fontFamily: "'Space Grotesk', monospace" }}>{p.count}</div>
                <div style={{ fontSize: '11px', color: '#8892b0', marginTop: '2px', letterSpacing: '0.04em' }}>{p.label}</div>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px', marginBottom: '16px',
          }} className="animate-fade-up delay-200">
            <Search size={14} style={{ color: '#4a5568' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search company or role..."
              style={{ background: 'none', border: 'none', outline: 'none', color: '#f0f0ff', fontSize: '13px', flex: 1 }}
            />
          </div>

          {/* Application Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {shown.map((app: any, i) => {
              const s = statusConfig[app.status] || statusConfig['applied'];
              const logoColor = fallbackLogoColors[app.logo] || 'linear-gradient(135deg,#7c3aed,#00d4ff)';
              return (
                <div key={app.id}
                  onClick={() => showToast(`Viewing details for ${app.company} application`, 'info')}
                  className={`animate-fade-up delay-${Math.min(i * 100, 400)}`}
                  style={{
                    background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                    border: `1px solid ${app.status === 'offer' ? 'rgba(16,185,129,0.3)' : 'rgba(124,58,237,0.12)'}`,
                    borderRadius: '14px', padding: '16px 20px',
                    display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap',
                    transition: 'all 0.2s ease',
                    boxShadow: app.status === 'offer' ? '0 0 20px rgba(16,185,129,0.08)' : 'none',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                    (e.currentTarget as HTMLElement).style.borderColor = s.border;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    (e.currentTarget as HTMLElement).style.borderColor = app.status === 'offer' ? 'rgba(16,185,129,0.3)' : 'rgba(124,58,237,0.12)';
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                    background: logoColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 800, color: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}>{app.logo}</div>

                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f0ff', marginBottom: '3px' }}>{app.role}</div>
                    <div style={{ fontSize: '12px', color: '#8892b0' }}>{app.company}</div>
                    <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={10} /> Applied {app.date}
                    </div>
                  </div>

                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '0.06em', marginBottom: '4px' }}>AI MATCH REASON</div>
                    <div style={{ fontSize: '12px', color: app.status === 'offer' ? '#10b981' : '#c0c8d8' }}>{app.matchReason || 'Application submitted successfully.'}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    {/* Match score */}
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#00d4ff', fontFamily: "'Space Grotesk', monospace" }}>{app.matchScore}%</div>
                      <div style={{ fontSize: '9px', color: '#4a5568', letterSpacing: '0.06em' }}>MATCH</div>
                    </div>

                    {/* Status badge */}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      padding: '4px 10px', borderRadius: '9999px',
                      background: s.bg, border: `1px solid ${s.border}`,
                      fontSize: '11px', fontWeight: 600, color: s.color,
                      letterSpacing: '0.03em',
                    }}>
                      {s.icon} {s.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
