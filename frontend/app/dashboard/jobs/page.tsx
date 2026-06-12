'use client';

import React, { useState } from 'react';
import {
  Search, Filter, Briefcase, MapPin, Clock, DollarSign,
  Zap, Star, ExternalLink, TrendingUp, Building2, ChevronDown,
} from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../../ToastContext';

const jobs = [
  { id: 1, title: 'Senior ML Engineer', company: 'DeepMind', location: 'London, UK (Remote)', salary: '$180k–$240k', type: 'Full-time', match: 97, posted: '1h ago', logo: 'D', logoColor: 'linear-gradient(135deg,#4285f4,#0f9d58)', tags: ['PyTorch','LLMs','Python'], hot: true },
  { id: 2, title: 'AI Research Scientist', company: 'OpenAI', location: 'San Francisco, CA', salary: '$200k–$300k', type: 'Full-time', match: 94, posted: '3h ago', logo: 'O', logoColor: 'linear-gradient(135deg,#10a37f,#1a7f64)', tags: ['Research','LLMs','RLHF'], hot: true },
  { id: 3, title: 'ML Infrastructure Engineer', company: 'Google Brain', location: 'Remote', salary: '$160k–$220k', type: 'Full-time', match: 91, posted: '5h ago', logo: 'G', logoColor: 'linear-gradient(135deg,#4285f4,#ea4335)', tags: ['Kubernetes','TensorFlow','Infra'], hot: false },
  { id: 4, title: 'Applied AI Engineer', company: 'Anthropic', location: 'New York, NY', salary: '$170k–$230k', type: 'Full-time', match: 89, posted: '8h ago', logo: 'A', logoColor: 'linear-gradient(135deg,#cc785c,#a85c3a)', tags: ['Claude','Python','APIs'], hot: false },
  { id: 5, title: 'Prompt Engineer', company: 'Scale AI', location: 'Remote', salary: '$120k–$160k', type: 'Contract', match: 85, posted: '1d ago', logo: 'S', logoColor: 'linear-gradient(135deg,#7c3aed,#a855f7)', tags: ['GPT-4','Prompting','NLP'], hot: false },
  { id: 6, title: 'LLM Engineer', company: 'Cohere', location: 'Toronto, Canada', salary: '$140k–$180k', type: 'Full-time', match: 82, posted: '2d ago', logo: 'C', logoColor: 'linear-gradient(135deg,#39d5c1,#2aa896)', tags: ['LLMs','RAG','Embeddings'], hot: false },
];

const filters = ['All', 'Full-time', 'Contract', 'Remote', 'High Match'];

export default function JobsPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = jobs.filter(j =>
    (activeFilter === 'All' || j.type === activeFilter || (activeFilter === 'Remote' && j.location.includes('Remote')) || (activeFilter === 'High Match' && j.match >= 90)) &&
    (j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          {/* Page Header */}
          <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: '#f0f0ff', marginBottom: '4px' }}>
                  Job Matches
                </h1>
                <p style={{ color: '#8892b0', fontSize: '14px' }}>
                  AI found <span style={{ color: '#00d4ff', fontWeight: 600 }}>1,247 jobs</span> matching your profile today
                </p>
              </div>
              <button onClick={() => showToast('Applying to top 10 matches...', 'success')} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '10px 18px',
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                borderRadius: '10px', border: 'none',
                color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0,212,255,0.3)',
              }}>
                <Zap size={14} /> Apply to Top 10
              </button>
            </div>
          </div>

          {/* Search + Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }} className="animate-fade-up delay-100">
            <div style={{
              flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 14px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
            }}>
              <Search size={14} style={{ color: '#4a5568' }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs, companies, skills..."
                style={{ background: 'none', border: 'none', outline: 'none', color: '#f0f0ff', fontSize: '13px', width: '100%' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{
                  padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                  background: activeFilter === f ? 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))' : 'rgba(255,255,255,0.04)',
                  border: activeFilter === f ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: activeFilter === f ? '#00d4ff' : '#8892b0',
                  transition: 'all 0.2s ease',
                }}>{f}</button>
              ))}
            </div>
          </div>

          {/* Job Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((job, i) => (
              <div key={job.id}
                className={`animate-fade-up delay-${Math.min(i * 100 + 100, 400)}`}
                style={{
                  background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)',
                  border: `1px solid ${job.hot ? 'rgba(0,212,255,0.25)' : 'rgba(124,58,237,0.12)'}`,
                  borderRadius: '14px', padding: '18px 20px',
                  display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap',
                  transition: 'all 0.25s ease', cursor: 'pointer',
                  boxShadow: job.hot ? '0 0 20px rgba(0,212,255,0.08)' : 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.4)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 25px rgba(0,212,255,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = job.hot ? 'rgba(0,212,255,0.25)' : 'rgba(124,58,237,0.12)';
                  (e.currentTarget as HTMLElement).style.boxShadow = job.hot ? '0 0 20px rgba(0,212,255,0.08)' : 'none';
                }}
              >
                {/* Logo */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                  background: job.logoColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', fontWeight: 800, color: '#fff',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                }}>{job.logo}</div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff' }}>{job.title}</span>
                    {job.hot && (
                      <span style={{
                        padding: '1px 7px', borderRadius: '9999px', fontSize: '9px', fontWeight: 700,
                        background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444',
                        letterSpacing: '0.06em',
                      }}>HOT</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#8892b0' }}>
                      <Building2 size={11} /> {job.company}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#8892b0' }}>
                      <MapPin size={11} /> {job.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#8892b0' }}>
                      <Clock size={11} /> {job.posted}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '8px', flexWrap: 'wrap' }}>
                    {job.tags.map(tag => (
                      <span key={tag} style={{
                        padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 500,
                        background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#a855f7',
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Match + Salary */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '4px 10px', borderRadius: '8px',
                    background: job.match >= 90 ? 'rgba(0,212,255,0.1)' : 'rgba(168,85,247,0.1)',
                    border: `1px solid ${job.match >= 90 ? 'rgba(0,212,255,0.25)' : 'rgba(168,85,247,0.25)'}`,
                  }}>
                    <TrendingUp size={11} style={{ color: job.match >= 90 ? '#00d4ff' : '#a855f7' }} />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: job.match >= 90 ? '#00d4ff' : '#a855f7' }}>{job.match}%</span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>{job.salary}</span>
                  <span style={{ fontSize: '10px', color: '#4a5568' }}>{job.type}</span>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button onClick={(e) => { e.stopPropagation(); showToast(`Applied to ${job.title} at ${job.company}`, 'success'); }} style={{
                    padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))',
                    border: '1px solid rgba(0,212,255,0.25)', color: '#00d4ff',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(0,212,255,0.2)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                  >
                    <Zap size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Apply
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); showToast(`Saved ${job.company} to favorites`, 'info'); }} style={{
                    width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4a5568',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f59e0b'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a5568'; }}
                  >
                    <Star size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
