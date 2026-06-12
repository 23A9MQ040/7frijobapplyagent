'use client';

import React, { useState } from 'react';
import { Users, Mail, Phone, Linkedin, Star, MessageSquare, Clock, Search, Plus, CheckCircle2 } from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';

const recruiters = [
  { id: 1, name: 'Sarah Mitchell', company: 'Google', title: 'Senior Technical Recruiter', email: 'sarah.m@google.com', status: 'active', lastContact: '2 days ago', notes: 'Interested in ML roles. Follow up after interview.', rating: 5, logo: 'G', logoColor: 'linear-gradient(135deg,#4285f4,#0f9d58)' },
  { id: 2, name: 'James Ko', company: 'Anthropic', title: 'Talent Acquisition Lead', email: 'james.ko@anthropic.com', status: 'waiting', lastContact: '5 days ago', notes: 'Sent resume. Waiting for screening call.', rating: 4, logo: 'A', logoColor: 'linear-gradient(135deg,#cc785c,#a85c3a)' },
  { id: 3, name: 'Priya Rao', company: 'Microsoft', title: 'AI Division Recruiter', email: 'priya.r@microsoft.com', status: 'active', lastContact: '1 week ago', notes: 'Offer extended! Need to respond by Jun 20.', rating: 5, logo: 'Ms', logoColor: 'linear-gradient(135deg,#00a4ef,#7fba00)' },
  { id: 4, name: 'Tom Walsh', company: 'DeepMind', title: 'Research Recruiter', email: 'tom.w@deepmind.com', status: 'new', lastContact: 'Today', notes: 'First contact via LinkedIn. Schedule phone screen.', rating: 3, logo: 'D', logoColor: 'linear-gradient(135deg,#4285f4,#0f9d58)' },
  { id: 5, name: 'Elena Cruz', company: 'OpenAI', title: 'Engineering Recruiter', email: 'elena.c@openai.com', status: 'cold', lastContact: '3 weeks ago', notes: 'No response after 3 follow-ups. Low priority.', rating: 2, logo: 'O', logoColor: 'linear-gradient(135deg,#10a37f,#1a7f64)' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:   { label: 'Active',   color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  waiting:  { label: 'Waiting',  color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  new:      { label: 'New',      color: '#00d4ff', bg: 'rgba(0,212,255,0.1)',  border: 'rgba(0,212,255,0.25)' },
  cold:     { label: 'Cold',     color: '#4a5568', bg: 'rgba(74,85,104,0.1)',  border: 'rgba(74,85,104,0.25)' },
};

export default function RecruitersPage() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = recruiters.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.company.toLowerCase().includes(search.toLowerCase())
  );
  const detail = selected ? recruiters.find(r => r.id === selected) : null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f0ff', letterSpacing: '-0.02em', marginBottom: '4px' }}>Recruiters</h1>
                <p style={{ color: '#8892b0', fontSize: '14px' }}>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{recruiters.filter(r => r.status === 'active').length} active</span> contacts in your network
                </p>
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 16px', borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              }}>
                <Plus size={14} /> Add Recruiter
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: '16px' }}>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', marginBottom: '4px' }} className="animate-fade-up delay-100">
                <Search size={14} style={{ color: '#4a5568' }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search recruiters or companies..." style={{ background: 'none', border: 'none', outline: 'none', color: '#f0f0ff', fontSize: '13px', flex: 1 }} />
              </div>

              {filtered.map((r, i) => {
                const s = statusConfig[r.status];
                const isSelected = selected === r.id;
                return (
                  <div key={r.id}
                    className={`animate-fade-up delay-${Math.min(i * 100 + 100, 400)}`}
                    onClick={() => setSelected(isSelected ? null : r.id)}
                    style={{
                      background: isSelected ? 'rgba(0,212,255,0.06)' : 'rgba(10,10,30,0.6)',
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${isSelected ? 'rgba(0,212,255,0.3)' : 'rgba(124,58,237,0.12)'}`,
                      borderRadius: '14px', padding: '16px 20px',
                      display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.03)'; } }}
                    onMouseLeave={e => { if (!isSelected) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.12)'; (e.currentTarget as HTMLElement).style.background = 'rgba(10,10,30,0.6)'; } }}
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: r.logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{r.logo}</div>

                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f0ff' }}>{r.name}</div>
                      <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '2px' }}>{r.title} · {r.company}</div>
                    </div>

                    <div style={{ fontSize: '11px', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      <Clock size={10} /> {r.lastContact}
                    </div>

                    {/* Stars */}
                    <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                      {[1,2,3,4,5].map(n => (
                        <Star key={n} size={12} style={{ color: n <= r.rating ? '#f59e0b' : '#1e293b', fill: n <= r.rating ? '#f59e0b' : 'none' }} />
                      ))}
                    </div>

                    <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '10px', fontWeight: 600, background: s.bg, border: `1px solid ${s.border}`, color: s.color, flexShrink: 0 }}>{s.label}</span>

                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                      <button onClick={e => e.stopPropagation()} style={{ padding: '6px 10px', borderRadius: '7px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: '#00d4ff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Mail size={11} /> Email
                      </button>
                      <button onClick={e => e.stopPropagation()} style={{ padding: '6px 10px', borderRadius: '7px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: '#a855f7', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={11} /> Follow Up
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail panel */}
            {detail && (
              <div className="animate-fade-up" style={{ background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '16px', padding: '20px', position: 'sticky', top: '16px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: detail.logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 auto 12px', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>{detail.logo}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f0ff' }}>{detail.name}</div>
                  <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '3px' }}>{detail.title}</div>
                  <div style={{ fontSize: '12px', color: '#a855f7', marginTop: '1px' }}>{detail.company}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {[{ icon: <Mail size={13} />, label: 'Email', color: '#00d4ff' }, { icon: <Linkedin size={13} />, label: 'LinkedIn', color: '#a855f7' }, { icon: <Phone size={13} />, label: 'Call', color: '#10b981' }].map(b => (
                    <button key={b.label} style={{ flex: 1, padding: '8px', borderRadius: '9px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: b.color, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}>
                      {b.icon} {b.label}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '0.06em', marginBottom: '8px' }}>CONTACT</div>
                <div style={{ fontSize: '12px', color: '#8892b0', marginBottom: '16px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>{detail.email}</div>
                <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '0.06em', marginBottom: '8px' }}>NOTES</div>
                <div style={{ fontSize: '12px', color: '#c0c8d8', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.6 }}>{detail.notes}</div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
