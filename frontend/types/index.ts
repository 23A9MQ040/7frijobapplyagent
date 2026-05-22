import React from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  url: string;
  postedAt: string;
  interviewProbability: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'applied' | 'pending' | 'interview' | 'rejected' | 'offer';
  appliedAt: string;
  lastUpdated: string;
  resume?: string;
  coverLetter?: string;
}

export interface Resume {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];
  aiScore: number;
  uploadedAt: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  field: string;
  graduationYear: number;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  portfolioUrl: string;
  githubUrl: string;
  resume: Resume | null;
  autoApplyMode: boolean;
  notificationChannels: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalJobs: number;
  totalApplications: number;
  pendingApplications: number;
  interviews: number;
  offers: number;
  avgMatchScore: number;
  avgInterviewProbability: number;
  applicationTrend: {
    date: string;
    count: number;
  }[];
}

export interface NotificationSettings {
  email: boolean;
  telegram: boolean;
  discord: boolean;
  slack: boolean;
  frequency: 'daily' | 'weekly' | 'realtime';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
