'use client';

import React, { useState } from 'react';
import { User, Bell, Shield, Zap, Globe, Key, Save, ToggleLeft, ToggleRight, ChevronRight } from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import { useToast } from '../../ToastContext';
import { useAppContext } from '../../AppContext';

const sections = ['Profile', 'Agent Config', 'Notifications', 'Security', 'Integrations'];

const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
  <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
    <div style={{
      width: '42px', height: '24px', borderRadius: '12px',
      background: on ? 'linear-gradient(135deg, #00d4ff, #7c3aed)' : 'rgba(255,255,255,0.1)',
      border: `1px solid ${on ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
      position: 'relative', transition: 'all 0.2s ease',
      boxShadow: on ? '0 0 10px rgba(0,212,255,0.3)' : 'none',
    }}>
      <div style={{
        position: 'absolute', top: '3px', left: on ? '20px' : '3px',
        width: '16px', height: '16px', borderRadius: '50%',
        background: '#fff', transition: 'left 0.2s ease',
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }} />
    </div>
  </button>
);

const SettingRow = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
    <div>
      <div style={{ fontSize: '13px', fontWeight: 500, color: '#f0f0ff' }}>{label}</div>
      {desc && <div style={{ fontSize: '11px', color: '#4a5568', marginTop: '2px' }}>{desc}</div>}
    </div>
    {children}
  </div>
);

export default function SettingsPage() {
  const { showToast } = useToast();
  const { settings, updateSetting } = useAppContext();
  const [section, setSection] = useState('Profile');
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof settings) => updateSetting(key, !settings[key]);

  const handleSave = () => {
    setSaved(true);
    showToast('Settings saved successfully', 'success');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050510' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>

          <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f0f0ff', letterSpacing: '-0.02em', marginBottom: '4px' }}>Settings</h1>
            <p style={{ color: '#8892b0', fontSize: '14px' }}>Manage your account and agent preferences</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }} className="settings-grid">
            <style>{`
              @media (min-width: 768px) {
                .settings-grid { grid-template-columns: 200px 1fr !important; }
              }
            `}</style>

            {/* Nav */}
            <div className="animate-fade-up delay-100" style={{ background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', padding: '10px', height: 'fit-content' }}>
              {[
                { label: 'Profile', icon: <User size={14} /> },
                { label: 'Agent Config', icon: <Zap size={14} /> },
                { label: 'Notifications', icon: <Bell size={14} /> },
                { label: 'Security', icon: <Shield size={14} /> },
                { label: 'Integrations', icon: <Globe size={14} /> },
              ].map(s => (
                <button key={s.label} onClick={() => setSection(s.label)} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  width: '100%', padding: '9px 12px', borderRadius: '9px', marginBottom: '2px',
                  background: section === s.label ? 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))' : 'transparent',
                  border: section === s.label ? '1px solid rgba(0,212,255,0.2)' : '1px solid transparent',
                  color: section === s.label ? '#00d4ff' : '#8892b0',
                  fontSize: '13px', fontWeight: 500, cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            {/* Content panel */}
            <div className="animate-fade-up delay-200" style={{ background: 'rgba(10,10,30,0.6)', backdropFilter: 'blur(20px)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '14px', padding: '24px' }}>

              {section === 'Profile' && (
                <>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff', marginBottom: '20px' }}>Profile Settings</div>
                  {/* Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'linear-gradient(135deg, #7c3aed, #00d4ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 800, color: '#fff', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>S</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#f0f0ff' }}>Sumanth</div>
                      <div style={{ fontSize: '12px', color: '#4a5568' }}>Pro Plan · Member since Jan 2024</div>
                    </div>
                    <button onClick={() => showToast('Opening photo upload dialog...', 'info')} style={{ padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#8892b0' }}>Change Photo</button>
                  </div>
                  {/* Fields */}
                  {[
                    { label: 'Full Name', value: 'Sumanth' },
                    { label: 'Email', value: 'sumanth@email.com' },
                    { label: 'Location', value: 'Bangalore, India' },
                    { label: 'Target Role', value: 'ML / AI Engineer' },
                  ].map(f => (
                    <div key={f.label} style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '11px', color: '#4a5568', letterSpacing: '0.06em', marginBottom: '6px' }}>{f.label.toUpperCase()}</div>
                      <input defaultValue={f.value} style={{ width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#f0f0ff', fontSize: '13px', outline: 'none', transition: 'border-color 0.2s ease' }}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,212,255,0.35)'}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>
                  ))}
                </>
              )}

              {section === 'Agent Config' && (
                <>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff', marginBottom: '20px' }}>Agent Configuration</div>
                  <SettingRow label="Auto-Apply Mode" desc="AI automatically submits applications to matched jobs">
                    <Toggle on={settings.autoApply} onToggle={() => toggle('autoApply')} />
                  </SettingRow>
                  <SettingRow label="AI Resume Optimization" desc="Tailor resume content for each job description">
                    <Toggle on={settings.aiOptimize} onToggle={() => toggle('aiOptimize')} />
                  </SettingRow>
                  <SettingRow label="Remote-Only Filter" desc="Only apply to fully remote positions">
                    <Toggle on={settings.remoteOnly} onToggle={() => toggle('remoteOnly')} />
                  </SettingRow>
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '11px', color: '#4a5568', letterSpacing: '0.06em', marginBottom: '6px' }}>MIN MATCH SCORE THRESHOLD</div>
                    <input type="range" min="50" max="100" defaultValue="75" style={{ width: '100%', accentColor: '#00d4ff' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#4a5568', marginTop: '4px' }}>
                      <span>50%</span><span style={{ color: '#00d4ff', fontWeight: 600 }}>75%</span><span>100%</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontSize: '11px', color: '#4a5568', letterSpacing: '0.06em', marginBottom: '6px' }}>MAX DAILY APPLICATIONS</div>
                    <input type="number" defaultValue="20" min="1" max="100" style={{ width: '120px', padding: '9px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9px', color: '#f0f0ff', fontSize: '13px', outline: 'none' }} />
                  </div>
                </>
              )}

              {section === 'Notifications' && (
                <>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff', marginBottom: '20px' }}>Notification Preferences</div>
                  <SettingRow label="Email Notifications" desc="Receive updates via email">
                    <Toggle on={settings.emailNotif} onToggle={() => toggle('emailNotif')} />
                  </SettingRow>
                  <SettingRow label="Job Match Alerts" desc="Notify when high-match jobs are found">
                    <Toggle on={settings.jobAlerts} onToggle={() => toggle('jobAlerts')} />
                  </SettingRow>
                  <SettingRow label="Weekly Performance Report" desc="Summary of agent activity every Monday">
                    <Toggle on={settings.weeklyReport} onToggle={() => toggle('weeklyReport')} />
                  </SettingRow>
                </>
              )}

              {section === 'Security' && (
                <>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff', marginBottom: '20px' }}>Security</div>
                  <SettingRow label="Two-Factor Authentication" desc="Add an extra layer of security to your account">
                    <Toggle on={settings.twoFactor} onToggle={() => toggle('twoFactor')} />
                  </SettingRow>
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ fontSize: '11px', color: '#4a5568', letterSpacing: '0.06em', marginBottom: '10px' }}>CHANGE PASSWORD</div>
                    {['Current Password', 'New Password', 'Confirm Password'].map(f => (
                      <input key={f} type="password" placeholder={f} style={{ display: 'block', width: '100%', padding: '10px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#f0f0ff', fontSize: '13px', outline: 'none', marginBottom: '10px' }} />
                    ))}
                    <button onClick={() => showToast('Password updated successfully', 'success')} style={{ padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.08))', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Key size={13} /> Update Password
                    </button>
                  </div>
                </>
              )}

              {section === 'Integrations' && (
                <>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#f0f0ff', marginBottom: '20px' }}>Integrations</div>
                  {[
                    { name: 'LinkedIn', status: 'Connected', color: '#0077b5', connected: true },
                    { name: 'Indeed', status: 'Connected', color: '#003a9b', connected: true },
                    { name: 'Greenhouse ATS', status: 'Not connected', color: '#4a5568', connected: false },
                    { name: 'Lever', status: 'Not connected', color: '#4a5568', connected: false },
                    { name: 'Workday', status: 'Not connected', color: '#4a5568', connected: false },
                  ].map(integration => (
                    <div key={integration.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: integration.color + '22', border: `1px solid ${integration.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Globe size={14} style={{ color: integration.color }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: '#f0f0ff' }}>{integration.name}</div>
                          <div style={{ fontSize: '11px', color: integration.connected ? '#10b981' : '#4a5568' }}>{integration.status}</div>
                        </div>
                      </div>
                      <button onClick={() => showToast(`${integration.connected ? 'Disconnected' : 'Connected'} ${integration.name} integration`, 'success')} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', background: integration.connected ? 'rgba(239,68,68,0.08)' : 'rgba(0,212,255,0.08)', border: `1px solid ${integration.connected ? 'rgba(239,68,68,0.2)' : 'rgba(0,212,255,0.2)'}`, color: integration.connected ? '#ef4444' : '#00d4ff' }}>
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </>
              )}

              {/* Save button */}
              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleSave} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '10px 24px', borderRadius: '10px',
                  background: saved ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  border: 'none', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  boxShadow: saved ? '0 0 20px rgba(16,185,129,0.3)' : '0 0 20px rgba(0,212,255,0.2)',
                  transition: 'all 0.3s ease',
                }}>
                  <Save size={14} />
                  {saved ? '✓ Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
