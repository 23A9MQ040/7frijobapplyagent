'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp, Briefcase, FileText, MessageSquare, PlayCircle, PauseCircle,
  Zap, Target, Clock, ArrowUpRight, Activity, ChevronUp,
} from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../ToastContext';
import { useAppContext } from '../AppContext';
import { generateJobsFromGemini } from '../../lib/gemini';

const initialStats = [
  { label: 'Jobs Found', value: 1247, icon: Briefcase, trend: '+12.5%', color: '#00d4ff', glow: 'rgba(0,212,255,0.3)', bg: 'rgba(0,212,255,0.08)', border: 'rgba(0,212,255,0.2)' },
  { label: 'Applications', value: 89, icon: FileText, trend: '+24%', color: '#a855f7', glow: 'rgba(168,85,247,0.3)', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)' },
  { label: 'Recruiter Responses', value: 23, icon: MessageSquare, trend: '+8%', color: '#10b981', glow: 'rgba(16,185,129,0.3)', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
  { label: 'Avg Match Score', value: 78, icon: Target, trend: '+5%', color: '#ec4899', glow: 'rgba(236,72,153,0.3)', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.2)', isPercent: true },
];

const initialActivity = [
  { action: 'Applied to Senior ML Engineer at DeepMind', time: '2 min ago',   dot: '#00d4ff' },
  { action: 'Tailored resume for Google submission',     time: '8 min ago',   dot: '#a855f7' },
  { action: 'Sent follow-up email to Meta recruiter',    time: '23 min ago',  dot: '#10b981' },
  { action: 'Scraped 47 new jobs from LinkedIn',         time: '1 hour ago',  dot: '#f59e0b' },
  { action: 'Cover letter generated for OpenAI role',    time: '2 hours ago', dot: '#ec4899' },
];

const SIMULATED_ACTIONS = [
  { action: 'Analyzing role at Apple', dot: '#ec4899' },
  { action: 'Tailoring resume for Stripe', dot: '#a855f7' },
  { action: 'Successfully applied to Netflix', dot: '#10b981' },
  { action: 'Found 3 high-match roles on Indeed', dot: '#00d4ff' },
  { action: 'Bypassing ATS filter for Spotify', dot: '#f59e0b' },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  interview: { label: 'Interview',  color: '#00d4ff', bg: 'rgba(0,212,255,0.1)',    border: 'rgba(0,212,255,0.25)' },
  pending:   { label: 'Pending',    color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',   border: 'rgba(245,158,11,0.25)' },
  applied:   { label: 'Applied',    color: '#a855f7', bg: 'rgba(168,85,247,0.1)',   border: 'rgba(168,85,247,0.25)' },
  rejected:  { label: 'Rejected',   color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    border: 'rgba(239,68,68,0.25)' },
  offer:     { label: '🎉 Offer',   color: '#10b981', bg: 'rgba(16,185,129,0.1)',   border: 'rgba(16,185,129,0.25)' },
};

const companyColors: Record<string, string> = {
  G: 'linear-gradient(135deg,#4285f4,#0f9d58)',
  O: 'linear-gradient(135deg,#10a37f,#1a7f64)',
  A: 'linear-gradient(135deg,#cc785c,#a85c3a)',
  M: 'linear-gradient(135deg,#1877f2,#0d5dbf)',
  Ms: 'linear-gradient(135deg,#00a4ef,#7fba00)',
};

export default function Dashboard() {
  const { showToast } = useToast();
  const { settings, updateSetting, applications, addApplication } = useAppContext();
  const [agentRunning, setAgentRunning] = useState(settings.autoApply);
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sync with global settings
  useEffect(() => {
    setAgentRunning(settings.autoApply);
  }, [settings.autoApply]);
  
  const [stats, setStats] = useState(initialStats);
  const [activity, setActivity] = useState(initialActivity);

  // Live Simulation Effect
  useEffect(() => {
    setMounted(true);
    if (!agentRunning) return;

    let isMounted = true;

    const performAIAction = async () => {
      if (settings.geminiApiKey && !isGenerating) {
        setIsGenerating(true);
        try {
          const jobs = await generateJobsFromGemini(settings.geminiApiKey, settings.targetRole, settings.location);
          if (isMounted) {
            jobs.forEach((job: any) => addApplication(job));
            showToast(`Gemini successfully found & applied to ${jobs.length} matching jobs!`, 'success');
            
            setActivity(prev => [
              { action: `Gemini found ${jobs.length} high-match roles in ${settings.location}`, time: 'Just now', dot: '#10b981' },
              ...prev.slice(0, 4)
            ]);
          }
        } catch (e: any) {
          if (isMounted) showToast(e.message || 'Gemini API call failed', 'error');
        } finally {
          if (isMounted) setIsGenerating(false);
        }
      } else {
        // Fallback simulation if no API key
        if (Math.random() > 0.6) {
          setActivity(prev => {
            const randomAction = SIMULATED_ACTIONS[Math.floor(Math.random() * SIMULATED_ACTIONS.length)];
            const newAction = { ...randomAction, time: 'Just now' };
            return [newAction, ...prev.slice(0, 4)];
          });
        }
      }

      // Randomly update stats
      setStats(prev => {
        const newStats = [...prev];
        newStats[0].value += Math.floor(Math.random() * 3) + 1;
        if (Math.random() > 0.7) newStats[1].value += 1;
        if (Math.random() > 0.5) {
          const shift = Math.random() > 0.5 ? 1 : -1;
          newStats[3].value = Math.min(100, Math.max(70, Number(newStats[3].value) + shift));
        }
        return newStats;
      });
    };

    const interval = setInterval(performAIAction, settings.geminiApiKey ? 15000 : 3000); // Slower if calling API

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [agentRunning, settings.geminiApiKey, isGenerating]);

  const handlePauseToggle = () => {
    const newState = !agentRunning;
    setAgentRunning(newState);
    updateSetting('autoApply', newState);
    if (newState) {
      showToast('Agent resumed. Scanning for new opportunities...', 'success');
    } else {
      showToast('Agent paused. Background tasks stopped.', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          {/* Hero Banner */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.15) 50%, rgba(236,72,153,0.08) 100%)',
            border: '1px solid rgba(124,58,237,0.25)', borderRadius: '18px', padding: '28px 32px', marginBottom: '24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap'
          }} className="animate-fade-up">
            
            <div style={{ position: 'absolute', top: '-40px', right: '80px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-30px', right: '200px', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '3px 10px', background: agentRunning ? 'rgba(0,255,136,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${agentRunning ? 'rgba(0,255,136,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: '9999px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: agentRunning ? '#00ff88' : '#ef4444', boxShadow: agentRunning ? '0 0 8px #00ff88' : '0 0 8px #ef4444' }} />
                  <span style={{ fontSize: '11px', color: agentRunning ? '#00ff88' : '#ef4444', fontWeight: 600, letterSpacing: '0.06em' }}>
                    {agentRunning ? 'LIVE · AUTONOMOUS' : 'PAUSED'}
                  </span>
                </div>
              </div>

              <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #f0f0ff 0%, #00d4ff 50%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>
                7FRI Job Apply Agent
              </h1>
              <p style={{ color: '#8892b0', fontSize: '14px' }}>AI is autonomously hunting, applying & following up on your behalf</p>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                <div style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontSize: '12px' }}>
                  <span style={{ color: '#4a5568' }}>Today: </span><span style={{ color: '#00d4ff', fontWeight: 600 }}>{stats[1].value} applied</span>
                </div>
              </div>
            </div>

            <button onClick={handlePauseToggle} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
              background: agentRunning ? 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.08))' : 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
              border: `1px solid ${agentRunning ? 'rgba(239,68,68,0.3)' : 'rgba(0,212,255,0.3)'}`,
              borderRadius: '12px', color: agentRunning ? '#ef4444' : '#00d4ff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s ease', backdropFilter: 'blur(10px)',
              boxShadow: agentRunning ? '0 0 20px rgba(239,68,68,0.1)' : '0 0 20px rgba(0,212,255,0.1)',
            }}>
              {agentRunning ? <><PauseCircle size={18} /> Pause Agent</> : <><PlayCircle size={18} /> Resume Agent</>}
            </button>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className={`animate-fade-up delay-${(i + 1) * 100}`} style={{ background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)', border: `1px solid ${stat.border}`, borderRadius: '16px', padding: '20px', transition: 'all 0.3s ease', cursor: 'default', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${stat.glow}`; (e.currentTarget as HTMLElement).style.borderColor = stat.color; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = stat.border; }}>
                  <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`, opacity: 0.6 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ width: '40px', height: '40px', background: stat.bg, border: `1px solid ${stat.border}`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} style={{ color: stat.color }} /></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 600, color: '#10b981' }}><ChevronUp size={12} />{stat.trend}</div>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 800, fontFamily: "'Space Grotesk', monospace", color: stat.color, letterSpacing: '-0.02em', marginBottom: '4px', textShadow: `0 0 20px ${stat.glow}` }}>
                    {stat.value}{stat.isPercent ? '%' : ''}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8892b0' }}>{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }} className="dash-grid">
            <style>{`
              @media (min-width: 1024px) {
                .dash-grid { grid-template-columns: 1fr 340px !important; }
              }
            `}</style>
            {/* Applications Table */}
            <div style={{ background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '16px', overflow: 'hidden' }} className="animate-fade-up delay-200">
              <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>Recent Applications</h2>
                  <p style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>Latest AI-submitted jobs</p>
                </div>
                <Link href="/dashboard/applications" style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 12px', background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '8px', color: '#00d4ff', fontSize: '11px', fontWeight: 600, textDecoration: 'none' }}>
                  View all <ArrowUpRight size={11} />
                </Link>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      {['Company', 'Role', 'Match', 'Status', 'Applied'].map(h => <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 600, color: '#4a5568', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 5).map((app) => {
                      const s = statusConfig[app.status] || statusConfig['applied'];
                      return (
                        <tr key={app.id} onClick={() => showToast(`Opening details for ${app.company} application. ${app.matchReason || ''}`, 'info')} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'background 0.2s ease', cursor: 'pointer' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                          <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0, background: companyColors[app.logo] || 'linear-gradient(135deg,#7c3aed,#00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{app.logo}</div><span style={{ fontSize: '13px', fontWeight: 600, color: '#f0f0ff' }}>{app.company}</span></div></td>
                          <td style={{ padding: '12px 16px', fontSize: '12px', color: '#8892b0' }}>{app.role}</td>
                          <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '50px', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}><div style={{ width: `${app.matchScore}%`, height: '100%', background: 'linear-gradient(90deg, #00d4ff, #a855f7)', borderRadius: '9999px', boxShadow: '0 0 6px rgba(0,212,255,0.5)' }} /></div><span style={{ fontSize: '12px', fontWeight: 600, color: '#00d4ff' }}>{app.matchScore}%</span></div></td>
                          <td style={{ padding: '12px 16px' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: '9999px', fontSize: '10px', fontWeight: 600, color: s.color, letterSpacing: '0.04em' }}>{s.label}</span></td>
                          <td style={{ padding: '12px 16px', fontSize: '11px', color: '#4a5568' }}>{app.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Agent Activity Feed */}
            <div style={{ background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} className="animate-fade-up delay-300">
              <div style={{ padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={15} style={{ color: '#00d4ff' }} />
                <div><h2 style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>Agent Activity</h2><p style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>Real-time AI actions</p></div>
                <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: agentRunning ? '#00ff88' : '#4a5568', boxShadow: agentRunning ? '0 0 8px #00ff88' : 'none', flexShrink: 0 }} />
              </div>
              <div style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
                {activity.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', padding: '10px', borderRadius: '10px', marginBottom: '4px', background: i === 0 && agentRunning ? 'rgba(0,212,255,0.04)' : 'transparent', border: i === 0 && agentRunning ? '1px solid rgba(0,212,255,0.1)' : '1px solid transparent', transition: 'background 0.2s ease' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.dot, boxShadow: i === 0 ? `0 0 8px ${item.dot}` : 'none', flexShrink: 0, marginTop: '4px' }} />{i < activity.length - 1 && <div style={{ width: '1px', flex: 1, marginTop: '4px', background: 'rgba(255,255,255,0.06)' }} />}</div>
                    <div style={{ paddingBottom: '8px' }}><div style={{ fontSize: '12px', color: '#c0c8d8', lineHeight: 1.4 }}>{item.action}</div><div style={{ fontSize: '10px', color: '#4a5568', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={9} />{item.time}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Link href="/dashboard/analytics" style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '10px', color: '#00d4ff', fontSize: '12px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Zap size={13} /> View Full Activity Log
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
