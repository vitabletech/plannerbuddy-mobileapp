import React from 'react';
import RenderAvatar from '../RenderAvatar/RenderAvatar';
import image from '../../assets/images/Rectangle204.png';

export const dashboardDataCount = [
  { title: 'Event', icon: 'calendar', href: './../Screens/Events', replace: true },
  { title: 'Invitation', icon: 'email', href: './../GiftScreen/Gifts', replace: false },
  { title: 'Gifts', icon: 'gift', href: './../GiftScreen/Gifts', replace: false },
  { title: 'Creative', icon: 'party-popper', href: './../GiftScreen/Gifts', replace: false },
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

export const RecentEventsCards = [];
export const UpcomingEventsCards = [];
