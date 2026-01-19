import React from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  logo: string;
  details: string[];
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface TechCategory {
  title: string;
  items: TechItem[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}
