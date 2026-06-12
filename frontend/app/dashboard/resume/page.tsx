'use client';

import React, { useState } from 'react';
import { Upload, FileText, Download, Zap, CheckCircle2, Star, TrendingUp, Eye, Edit3 } from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';

const resumeScores = [
  { label: 'ATS Compatibility', score: 94, color: '#00d4ff' },
  { label: 'Keyword Match', score: 87, color: '#a855f7' },
  { label: 'Formatting', score: 96, color: '#10b981' },
  { label: 'Content Quality', score: 89, color: '#ec4899' },
  { label: 'Impact Metrics', score: 78, color: '#f59e0b' },
];

const suggestions = [
  { text: 'Add quantifiable metrics to ML project (e.g. "improved accuracy by 23%")', priority: 'high', done: false },
  { text: 'Include PyTorch version alongside TensorFlow in skills section', priority: 'medium', done: true },
  { text: 'Expand your research publication section with 2 recent papers', priority: 'high', done: false },
  { text: 'Add a summary section tailored for AI/ML roles', priority: 'medium', done: true },
  { text: 'Shorten bullet points in Experience section to ≤2 lines each', priority: 'low', done: false },
];

const priorityConfig: Record<string, { color: string; bg: string; border: string }> = {
  high:   { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.25)' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.25)' },
  low:    { color: '#8892b0', bg: 'rgba(136,146,176,0.1)', border: 'rgba(136,146,176,0.2)' },
};

export default function ResumePage() {
  const [dragging, setDragging] = useState(false);

  const overallScore = Math.round(resumeScores.reduce((a, s) => a + s.score, 0) / resumeScores.length);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f0ff', letterSpacing: '-0.02em', marginBottom: '4px' }}>Resume Manager</h1>
            <p style={{ color: '#8892b0', fontSize: '14px' }}>AI-powered resume scoring and optimization</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '16px' }}>

            {/* Left: Upload + Suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Upload zone */}
              <div
                className="animate-fade-up delay-100"
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={() => setDragging(false)}
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  border: `2px dashed ${dragging ? '#00d4ff' : 'rgba(124,58,237,0.3)'}`,
                  background: dragging ? 'rgba(0,212,255,0.05)' : 'rgba(10,10,30,0.4)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '12px', cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,212,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Upload size={22} style={{ color: '#00d4ff' }} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0f0ff' }}>Drop your resume here</div>
                  <div style={{ fontSize: '12px', color: '#8892b0', marginTop: '4px' }}>PDF, DOCX up to 10MB</div>
                </div>
                <button style={{
                  padding: '8px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff',
                }}>Browse Files</button>
              </div>

              {/* Current resume */}
              <div className="animate-fade-up delay-200" style={{
                padding: '16px 20px',
                background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,212,255,0.2)', borderRadius: '14px',
                display: 'flex', alignItems: 'center', gap: '14px',
                boxShadow: '0 0 20px rgba(0,212,255,0.06)',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FileText size={20} style={{ color: '#00d4ff' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f0ff' }}>Sumanth_Resume_v3.pdf</div>
                  <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>Uploaded 2 days ago · 245 KB</div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { icon: <Eye size={14} />, label: 'Preview', color: '#a855f7', border: 'rgba(168,85,247,0.25)' },
                    { icon: <Edit3 size={14} />, label: 'Edit', color: '#00d4ff', border: 'rgba(0,212,255,0.25)' },
                    { icon: <Download size={14} />, label: 'Download', color: '#10b981', border: 'rgba(16,185,129,0.25)' },
                  ].map(b => (
                    <button key={b.label} style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                      background: 'rgba(255,255,255,0.04)', border: `1px solid ${b.border}`, color: b.color,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                    >{b.icon} {b.label}</button>
                  ))}
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="animate-fade-up delay-300" style={{
                background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', overflow: 'hidden',
              }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>AI Suggestions</div>
                    <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>{suggestions.filter(s => !s.done).length} improvements pending</div>
                  </div>
                  <button style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)', border: 'none', color: '#fff',
                  }}><Zap size={12} /> Auto-Fix All</button>
                </div>
                <div style={{ padding: '12px' }}>
                  {suggestions.map((s, i) => {
                    const p = priorityConfig[s.priority];
                    return (
                      <div key={i} style={{
                        display: 'flex', gap: '10px', alignItems: 'flex-start',
                        padding: '10px 12px', borderRadius: '10px', marginBottom: '6px',
                        background: s.done ? 'rgba(16,185,129,0.04)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${s.done ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)'}`,
                        opacity: s.done ? 0.6 : 1,
                      }}>
                        <CheckCircle2 size={15} style={{ color: s.done ? '#10b981' : '#4a5568', flexShrink: 0, marginTop: '1px' }} />
                        <div style={{ flex: 1, fontSize: '12px', color: s.done ? '#8892b0' : '#c0c8d8', textDecoration: s.done ? 'line-through' : 'none' }}>{s.text}</div>
                        <span style={{ padding: '2px 7px', borderRadius: '9999px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.06em', background: p.bg, border: `1px solid ${p.border}`, color: p.color, flexShrink: 0 }}>
                          {s.priority.toUpperCase()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Score panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="animate-fade-up delay-100" style={{
                background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,212,255,0.2)', borderRadius: '14px', padding: '20px',
                boxShadow: '0 0 30px rgba(0,212,255,0.06)',
              }}>
                {/* Big score ring */}
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 12px' }}>
                    <svg viewBox="0 0 120 120" style={{ position: 'absolute', inset: 0 }}>
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 50 * overallScore / 100} ${2 * Math.PI * 50}`}
                        strokeLinecap="round" transform="rotate(-90 60 60)" />
                      <defs>
                        <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00d4ff" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ fontSize: '28px', fontWeight: 800, color: '#00d4ff', fontFamily: "'Space Grotesk', monospace", lineHeight: 1 }}>{overallScore}</div>
                      <div style={{ fontSize: '10px', color: '#4a5568', letterSpacing: '0.06em' }}>/100</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f0ff' }}>Resume Score</div>
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '3px' }}>↑ 8 points this week</div>
                </div>

                {/* Score breakdown */}
                {resumeScores.map(s => (
                  <div key={s.label} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontSize: '11px', color: '#8892b0' }}>{s.label}</span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: s.color }}>{s.score}%</span>
                    </div>
                    <div style={{ height: '4px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${s.score}%`, background: s.color, borderRadius: '9999px', boxShadow: `0 0 8px ${s.color}66`, transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="animate-fade-up delay-200" style={{
                background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', padding: '16px',
              }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0f0ff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={13} style={{ color: '#f59e0b' }} /> Pro Tips
                </div>
                {['Tailor keywords to each job description', 'Keep to 1 page for <10 years experience', 'Use action verbs: built, improved, deployed'].map((tip, i) => (
                  <div key={i} style={{ fontSize: '11px', color: '#8892b0', padding: '6px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', gap: '6px' }}>
                    <span style={{ color: '#a855f7', flexShrink: 0 }}>→</span> {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
