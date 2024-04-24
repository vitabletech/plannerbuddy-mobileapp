import React from 'react';
import RenderAvatar from '../RenderAvatar/RenderAvatar';
import image from '../../assets/images/Rectangle204.png';

export const dashboardDataCount = [
  { title: 'Event', icon: 'calendar' },
  { title: 'Invitation', icon: 'email' },
  { title: 'Gifts', icon: 'gift' },
  { title: 'Creative', icon: 'party-popper' },
];

export const avatar = () => <RenderAvatar />;

export const dashboardCards = [
  {
    title: 'Create Template',
    text: 'Coming Soon...',
    image,
  },
  {
    title: 'Create Template',
    text: 'Coming Soon...',
    image,
  },
  {
    title: 'Create Template',
    text: 'Coming Soon...',
    image,
  },
];
export const RecentEventsCards = [
  {
    title: 'Mayank Birthday',
    date: '8th May 2024',
    invited_guest: '100',
    address: 'Coming Soon...',
  },
  {
    title: 'Sister Marriage',
    date: '8th May 2024',
    invited_guest: '100',
    address: 'Coming Soon...',
  },
  {
    title: 'Anniversary',
    date: '8th May 2024',
    invited_guest: '100',
    address: 'Coming Soon...',
  },
];
