import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import test from '@iconify/icons-ic/round-bike-scooter';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Test ride booking',
    path: '/dashboard/test-ride',
    icon: getIcon(test)
  }
 
];

export default sidebarConfig;
