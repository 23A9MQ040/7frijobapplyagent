'use client';

import React, { useState } from 'react';
import { Users, Mail, Phone, Linkedin, Star, MessageSquare, Clock, Search, Plus, CheckCircle2, Copy, Zap, Loader2 } from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../../ToastContext';
import { useAppContext } from '../../AppContext';
import { generateOutreachMessage } from '../../../lib/gemini';

const fallbackLogoColors: Record<string, string> = {
  G: 'linear-gradient(135deg,#4285f4,#0f9d58)',
  O: 'linear-gradient(135deg,#10a37f,#1a7f64)',
  A: 'linear-gradient(135deg,#cc785c,#a85c3a)',
  M: 'linear-gradient(135deg,#1877f2,#0d5dbf)',
  Ms: 'linear-gradient(135deg,#00a4ef,#7fba00)',
  D: 'linear-gradient(135deg,#4285f4,#0f9d58)',
};

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active:   { label: 'Active',   color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  waiting:  { label: 'Waiting',  color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  new:      { label: 'New',      color: '#00d4ff', bg: 'rgba(0,212,255,0.1)',  border: 'rgba(0,212,255,0.25)' },
  cold:     { label: 'Cold',     color: '#4a5568', bg: 'rgba(74,85,104,0.1)',  border: 'rgba(74,85,104,0.25)' },
};

export default function RecruitersPage() {
  const { showToast } = useToast();
  const { settings, applications } = useAppContext();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<number | null>(null);
  const [drafting, setDrafting] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, { subject: string, body: string }>>({});

  // Use unique companies from applications list
  const uniqueApps = applications.filter((app, index, self) =>
    index === self.findIndex((t) => t.company === app.company)
  );

  const filtered = uniqueApps.filter(a =>
    a.company.toLowerCase().includes(search.toLowerCase()) ||
    a.role.toLowerCase().includes(search.toLowerCase())
  );

  const detail = selected ? uniqueApps.find(a => a.id === selected) : null;

  const handleDraftMessage = async () => {
    if (!detail) return;
    if (!settings.geminiApiKey) {
      showToast('Please add your Gemini API Key in Settings first!', 'error');
      return;
    }
    if (!settings.resumeText || settings.resumeText.length < 50) {
      showToast('Please paste a longer resume text in the Resume page first!', 'error');
      return;
    }
    setDrafting(true);
    try {
      const res = await generateOutreachMessage(settings.geminiApiKey, settings.resumeText, settings.targetRole, detail.company, detail.role);
      setDrafts(prev => ({ ...prev, [detail.id]: res }));
      showToast('AI Draft generated successfully!', 'success');
    } catch (e: any) {
      showToast(e.message || 'Failed to draft message.', 'error');
    } finally {
      setDrafting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f0ff', letterSpacing: '-0.02em', marginBottom: '4px' }}>AI Outreach Generator</h1>
                <p style={{ color: '#8892b0', fontSize: '14px' }}>
                  Select a company to generate an <span style={{ color: '#a855f7', fontWeight: 600 }}>AI Cold Outreach</span> email based on your resume.
                </p>
              </div>
              <button onClick={() => showToast('Add Recruiter modal opening...', 'info')} style={{
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
                const isSelected = selected === r.id;
                const logoColor = fallbackLogoColors[r.logo] || 'linear-gradient(135deg,#7c3aed,#00d4ff)';
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
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: '#fff', flexShrink: 0 }}>{r.logo}</div>

                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0f0ff' }}>{r.company}</div>
                      <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '2px' }}>Role: {r.role}</div>
                    </div>

                    <div style={{ fontSize: '11px', color: '#4a5568', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                      <Clock size={10} /> {r.date}
                    </div>

                    <span style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '10px', fontWeight: 600, background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff', flexShrink: 0 }}>
                      Match: {r.matchScore}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Detail / Generator panel */}
            {detail && (
              <div className="animate-fade-up" style={{ background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '16px', padding: '20px', position: 'sticky', top: '16px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: fallbackLogoColors[detail.logo] || 'linear-gradient(135deg,#7c3aed,#00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#fff', margin: '0 auto 12px', boxShadow: '0 0 20px rgba(0,212,255,0.2)' }}>{detail.logo}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#f0f0ff' }}>{detail.company}</div>
                  <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '3px' }}>Target: {detail.role}</div>
                </div>

                {!drafts[detail.id] ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'rgba(0,212,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(0,212,255,0.2)', textAlign: 'center', gap: '16px' }}>
                    <div style={{ color: '#8892b0', fontSize: '13px', lineHeight: 1.6 }}>Generate a highly personalized cold outreach email for this specific role at {detail.company}, tailored to your resume strengths.</div>
                    <button onClick={handleDraftMessage} disabled={drafting} style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px',
                      background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', color: '#fff', fontSize: '13px', fontWeight: 600,
                      cursor: drafting ? 'wait' : 'pointer', border: 'none', boxShadow: '0 4px 14px rgba(124,58,237,0.3)', opacity: drafting ? 0.7 : 1
                    }}>
                      {drafting ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                      {drafting ? 'Drafting...' : 'Generate AI Outreach'}
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '11px', color: '#4a5568', letterSpacing: '0.06em' }}>SUBJECT LINE</div>
                      <button onClick={() => copyToClipboard(drafts[detail.id].subject)} style={{ background: 'none', border: 'none', color: '#00d4ff', cursor: 'pointer', padding: '4px' }}><Copy size={13} /></button>
                    </div>
                    <div style={{ fontSize: '13px', color: '#f0f0ff', fontWeight: 600, marginBottom: '20px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {drafts[detail.id].subject}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '11px', color: '#4a5568', letterSpacing: '0.06em' }}>EMAIL BODY</div>
                      <button onClick={() => copyToClipboard(drafts[detail.id].body)} style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', padding: '4px' }}><Copy size={13} /></button>
                    </div>
                    <textarea 
                      readOnly 
                      value={drafts[detail.id].body}
                      style={{ width: '100%', height: '240px', fontSize: '12px', color: '#c0c8d8', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.6, resize: 'none', outline: 'none' }}
                    />
                    
                    <button onClick={handleDraftMessage} disabled={drafting} style={{
                      marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%',
                      padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', color: '#8892b0', fontSize: '12px', fontWeight: 600,
                      cursor: drafting ? 'wait' : 'pointer', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s', opacity: drafting ? 0.7 : 1
                    }}
                    onMouseEnter={e => { if(!drafting) {(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#f0f0ff';} }}
                    onMouseLeave={e => { if(!drafting) {(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.color = '#8892b0';} }}
                    >
                      {drafting ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                      Regenerate Variant
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
