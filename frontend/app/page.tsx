'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bot, Zap, Shield, Target, ArrowRight, CheckCircle2, Star, Sparkles, TrendingUp, Cpu } from 'lucide-react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div style={{ minHeight: '100vh', background: '#050510', color: '#f0f0ff', overflowX: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      
      {/* ── Navigation ──────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(5,5,20,0.7)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(124,58,237,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #7c3aed, #00d4ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '16px',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
          }}>7F</div>
          <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em' }}>JobApply<span style={{ color: '#00d4ff' }}>Agent</span></span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link href="#features" style={{ color: '#8892b0', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f0ff'} onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}>Features</Link>
          <Link href="#pricing" style={{ color: '#8892b0', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = '#f0f0ff'} onMouseLeave={e => (e.target as HTMLElement).style.color = '#8892b0'}>Pricing</Link>
          <Link href="/dashboard" style={{
            padding: '10px 24px', borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
            border: '1px solid rgba(0,212,255,0.3)',
            color: '#00d4ff', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(0,212,255,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Open Dashboard <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section style={{
        padding: '160px 20px 100px',
        textAlign: 'center', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Background Orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />

        <div className={`transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ zIndex: 1, maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '9999px',
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
            color: '#a855f7', fontSize: '13px', fontWeight: 600, marginBottom: '24px',
            letterSpacing: '0.04em',
          }}>
            <Sparkles size={14} /> 7FRI Job Apply Agent is now Live
          </div>
          
          <h1 style={{
            fontSize: '64px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px',
            background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #00d4ff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Automate Your Job Hunt.<br />Land Offers Faster.
          </h1>
          
          <p style={{ fontSize: '18px', color: '#8892b0', lineHeight: 1.6, marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Our autonomous AI agent hunts for perfectly matched roles, tailors your resume, and applies on your behalf while you sleep.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/dashboard" style={{
              padding: '16px 32px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed, #00d4ff)',
              color: '#fff', fontSize: '16px', fontWeight: 600, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 0 30px rgba(0,212,255,0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(0,212,255,0.6)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <a href="#features" style={{
              padding: '16px 32px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              color: '#f0f0ff', fontSize: '16px', fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
            >
              How it works
            </a>
          </div>

          <div style={{ marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', opacity: 0.6 }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#4a5568', letterSpacing: '0.1em' }}>TRUSTED BY ENGINEERS FROM</span>
            <div style={{ display: 'flex', gap: '24px', fontSize: '18px', fontWeight: 800, color: '#8892b0' }}>
              <span>Google</span><span>Meta</span><span>OpenAI</span><span>Stripe</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ────────────────────────────────────────── */}
      <section id="features" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#f0f0ff', marginBottom: '16px', letterSpacing: '-0.02em' }}>Supercharge Your Application Pipeline</h2>
          <p style={{ color: '#8892b0', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>Everything you need to systematically outcompete other candidates.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { icon: <Bot size={24} />, title: 'Autonomous Applying', desc: 'Agent automatically fills out complex ATS forms and submits applications directly.', color: '#00d4ff' },
            { icon: <Cpu size={24} />, title: 'AI Resume Tailoring', desc: 'Instantly rewrites your resume keywords to perfectly match every single job description.', color: '#a855f7' },
            { icon: <Target size={24} />, title: 'High-Accuracy Matching', desc: 'Advanced vector search finds jobs that strictly match your unique skills and salary requirements.', color: '#10b981' },
            { icon: <Shield size={24} />, title: 'Stealth & Secure', desc: 'Emulates human typing patterns to bypass bot detection. Your data is encrypted locally.', color: '#ec4899' },
            { icon: <TrendingUp size={24} />, title: 'Advanced Analytics', desc: 'Track your exact conversion rates from applied to interview to offer in real-time.', color: '#f59e0b' },
            { icon: <Zap size={24} />, title: 'One-Click Setup', desc: 'Upload your baseline resume once, set your target roles, and let the agent do the rest.', color: '#00d4ff' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.15)', borderRadius: '20px', padding: '32px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLElement).style.borderColor = f.color; (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${f.color}22`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.15)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.color + '15', border: `1px solid ${f.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, marginBottom: '20px' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f0ff', marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#8892b0', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing Section ─────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: '100px 20px', background: 'rgba(10,10,30,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#f0f0ff', marginBottom: '16px', letterSpacing: '-0.02em' }}>Simple, Transparent Pricing</h2>
          <p style={{ color: '#8892b0', fontSize: '16px' }}>Invest in your career. Get hired faster.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', maxWidth: '900px', margin: '0 auto' }}>
          {/* Basic Plan */}
          <div style={{ flex: 1, minWidth: '300px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#f0f0ff', marginBottom: '8px' }}>Basic</div>
            <div style={{ fontSize: '14px', color: '#8892b0', marginBottom: '24px' }}>For passive job seekers</div>
            <div style={{ fontSize: '48px', fontWeight: 800, color: '#f0f0ff', fontFamily: "'Space Grotesk', monospace", letterSpacing: '-0.04em', marginBottom: '32px' }}>$0<span style={{ fontSize: '16px', color: '#4a5568', fontWeight: 500 }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1 }}>
              {['Find 10 matches daily', 'Basic resume scoring', 'Manual applying', 'Community support'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#c0c8d8', marginBottom: '16px' }}>
                  <CheckCircle2 size={16} style={{ color: '#4a5568' }} /> {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0ff', fontSize: '15px', fontWeight: 600, textAlign: 'center', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'}>Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div style={{ flex: 1, minWidth: '300px', background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,212,255,0.1))', border: '1px solid rgba(0,212,255,0.4)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 20px 40px rgba(0,212,255,0.1)' }}>
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', padding: '6px 16px', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>MOST POPULAR</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: '#00d4ff', marginBottom: '8px' }}>Pro Agent</div>
            <div style={{ fontSize: '14px', color: '#8892b0', marginBottom: '24px' }}>For active, aggressive job hunting</div>
            <div style={{ fontSize: '48px', fontWeight: 800, color: '#f0f0ff', fontFamily: "'Space Grotesk', monospace", letterSpacing: '-0.04em', marginBottom: '32px' }}>$29<span style={{ fontSize: '16px', color: '#4a5568', fontWeight: 500 }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', flex: 1 }}>
              {['Unlimited job matches', '100+ Autonomous applications/day', 'AI Resume Auto-tailoring', 'Advanced analytics & tracking', 'Priority 24/7 support'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#f0f0ff', marginBottom: '16px' }}>
                  <CheckCircle2 size={16} style={{ color: '#00d4ff' }} /> {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard" style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', border: 'none', color: '#fff', fontSize: '15px', fontWeight: 600, textAlign: 'center', textDecoration: 'none', boxShadow: '0 0 20px rgba(0,212,255,0.4)', transition: 'all 0.2s' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.6)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,212,255,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}>Start 7-Day Free Trial</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer style={{ padding: '60px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '12px' }}>7F</div>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#8892b0' }}>© 2026 7FRI JobApplyAgent. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: '#4a5568', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
          <a href="#" style={{ color: '#4a5568', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>Terms of Service</a>
          <a href="https://github.com/23A9MQ040" style={{ color: '#4a5568', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>GitHub</a>
          <a href="https://www.linkedin.com/in/sai-varma" style={{ color: '#4a5568', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>LinkedIn</a>
        </div>
      </footer>

    </div>
  );
}
