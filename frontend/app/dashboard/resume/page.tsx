'use client';

import React, { useState } from 'react';
import { Upload, FileText, Download, Zap, CheckCircle2, Star, TrendingUp, Eye, Edit3, Loader2 } from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../../ToastContext';
import { useAppContext } from '../../AppContext';
import { analyzeResumeWithGemini } from '../../../lib/gemini';

const defaultScores = [
  { label: 'ATS Compatibility', score: 94, color: '#00d4ff' },
  { label: 'Keyword Match', score: 87, color: '#a855f7' },
  { label: 'Formatting', score: 96, color: '#10b981' },
  { label: 'Content Quality', score: 89, color: '#ec4899' },
  { label: 'Impact Metrics', score: 78, color: '#f59e0b' },
];

const priorityConfig: Record<string, { color: string; bg: string; border: string }> = {
  high:   { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.25)' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.25)' },
  low:    { color: '#8892b0', bg: 'rgba(136,146,176,0.1)', border: 'rgba(136,146,176,0.2)' },
};

export default function ResumePage() {
  const { showToast } = useToast();
  const { settings, updateSetting } = useAppContext();
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!settings.geminiApiKey) {
      showToast('Please add your Gemini API Key in Settings first!', 'error');
      return;
    }
    if (!settings.resumeText || settings.resumeText.length < 50) {
      showToast('Please paste a longer resume text first!', 'error');
      return;
    }
    setAnalyzing(true);
    try {
      const res = await analyzeResumeWithGemini(settings.geminiApiKey, settings.resumeText, settings.targetRole);
      setAnalysis(res);
      showToast('Resume analyzed successfully!', 'success');
    } catch (e: any) {
      showToast(e.message || 'Failed to analyze resume.', 'error');
    } finally {
      setAnalyzing(false);
    }
  };

  const overallScore = analysis ? analysis.matchScore : Math.round(defaultScores.reduce((a, s) => a + s.score, 0) / defaultScores.length);

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

              {/* Input zone */}
              <div
                className="animate-fade-up delay-100"
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(124,58,237,0.3)',
                  background: 'rgba(10,10,30,0.6)',
                  display: 'flex', flexDirection: 'column',
                  gap: '12px', transition: 'all 0.2s ease',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f0ff' }}>Paste Your Resume</div>
                  <button onClick={handleAnalyze} disabled={analyzing} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: analyzing ? 'wait' : 'pointer',
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                    border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff', opacity: analyzing ? 0.7 : 1
                  }}>
                    {analyzing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                    {analyzing ? 'Analyzing...' : 'Optimize with AI'}
                  </button>
                </div>
                <textarea
                  value={settings.resumeText}
                  onChange={(e) => updateSetting('resumeText', e.target.value)}
                  placeholder="Paste your plain-text resume here. Our AI will analyze it against your target role..."
                  style={{
                    width: '100%', height: '200px', padding: '14px', background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: '#f0f0ff',
                    fontSize: '13px', lineHeight: 1.5, outline: 'none', resize: 'vertical'
                  }}
                />
              </div>

              {/* AI Suggestions (Rewrites) */}
              {analysis && (
                <div className="animate-fade-up delay-300" style={{
                  background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', overflow: 'hidden',
                }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>AI Bullet Rewrites</div>
                      <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>AI suggested improvements</div>
                    </div>
                  </div>
                  <div style={{ padding: '12px' }}>
                    {analysis.rewrites?.map((r: any, i: number) => (
                      <div key={i} style={{ marginBottom: '16px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ fontSize: '10px', color: '#ef4444', marginBottom: '4px', letterSpacing: '0.05em' }}>ORIGINAL</div>
                        <div style={{ fontSize: '12px', color: '#c0c8d8', marginBottom: '10px', textDecoration: 'line-through' }}>{r.original}</div>
                        <div style={{ fontSize: '10px', color: '#10b981', marginBottom: '4px', letterSpacing: '0.05em' }}>IMPROVED</div>
                        <div style={{ fontSize: '12px', color: '#f0f0ff', fontWeight: 500 }}>{r.improved}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#f0f0ff' }}>AI Match Score</div>
                  <div style={{ fontSize: '11px', color: '#10b981', marginTop: '3px' }}>For target role: {settings.targetRole}</div>
                </div>

                {/* Missing Keywords */}
                {analysis && analysis.missingKeywords && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', color: '#8892b0', marginBottom: '8px', letterSpacing: '0.05em' }}>MISSING KEYWORDS</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {analysis.missingKeywords.map((kw: string) => (
                        <span key={kw} style={{ padding: '4px 8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: '6px', fontSize: '11px', border: '1px solid rgba(239,68,68,0.2)' }}>{kw}</span>
                      ))}
                    </div>
                  </div>
                )}

                {!analysis && defaultScores.map(s => (
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

              {/* Strengths */}
              {analysis && analysis.strengths && (
                <div className="animate-fade-up delay-200" style={{
                  background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(16,185,129,0.15)', borderRadius: '14px', padding: '16px',
                }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0f0ff', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={13} style={{ color: '#10b981' }} /> Key Strengths
                  </div>
                  {analysis.strengths.map((tip: string, i: number) => (
                    <div key={i} style={{ fontSize: '11px', color: '#8892b0', padding: '6px 0', borderBottom: i < analysis.strengths.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', display: 'flex', gap: '6px' }}>
                      <span style={{ color: '#10b981', flexShrink: 0 }}>✓</span> {tip}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
