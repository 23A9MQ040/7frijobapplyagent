'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  FileText, 
  MessageSquare,
  PlayCircle,
  PauseCircle
} from 'lucide-react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';

// Mock data
const stats = [
  { label: 'Jobs Found', value: 1247, icon: Briefcase, trend: '+12.5%' },
  { label: 'Applications', value: 89, icon: FileText, trend: '+24%' },
  { label: 'Recruiter Responses', value: 23, icon: MessageSquare, trend: '+8%' },
  { label: 'Avg Match Score', value: '78%', icon: TrendingUp, trend: '+5%' },
];

const recentApplications = [
  {
    id: 1,
    company: 'Google',
    role: 'AI/ML Engineer',
    status: 'interview',
    matchScore: 92,
    date: '2 days ago'
  },
  {
    id: 2,
    company: 'OpenAI',
    role: 'Prompt Engineer',
    status: 'pending',
    matchScore: 88,
    date: '4 days ago'
  },
  {
    id: 3,
    company: 'Anthropic',
    role: 'LLM Engineer',
    status: 'applied',
    matchScore: 85,
    date: '1 week ago'
  },
  {
    id: 4,
    company: 'Meta',
    role: 'GenAI Engineer',
    status: 'rejected',
    matchScore: 72,
    date: '2 weeks ago'
  },
];

const statusColors = {
  applied: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  interview: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  offer: 'bg-purple-100 text-purple-700',
};

export default function Dashboard() {
  const [agentRunning, setAgentRunning] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Status Bar */}
            <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">7FRIJOBAPPLYAGENT</h1>
                <p className="text-indigo-100">LIVE • AUTONOMOUS • AI JOB HUNTER • RUNNING</p>
              </div>
              <button
                onClick={() => setAgentRunning(!agentRunning)}
                className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
              >
                {agentRunning ? (
                  <>
                    <PauseCircle size={20} />
                    Pause Agent
                  </>
                ) : (
                  <>
                    <PlayCircle size={20} />
                    Resume Agent
                  </>
                )}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <Icon size={24} className="text-indigo-600" />
                      </div>
                      <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Company</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Match Score</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Applied</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentApplications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{app.company}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.role}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                                style={{ width: `${app.matchScore}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{app.matchScore}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[app.status as keyof typeof statusColors]}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
