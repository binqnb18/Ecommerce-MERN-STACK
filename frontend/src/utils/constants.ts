import { ListOrdered, LayoutDashboard, ChartColumnStacked, Search, Settings, ShoppingCart, User, LogOut } from 'lucide-react';

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const mainItems: MenuItem[] = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Products', url: '/products', icon:ShoppingCart },
  { title: 'Category', url: '/inbox', icon: ChartColumnStacked },
  { title: 'Orders', url: '/orders', icon: ListOrdered },
];

export const utilityItems: MenuItem[] = [
  { title: 'Search', url: '/search', icon: Search },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export const accountItems: MenuItem[] = [
  { title: 'Account', url: '/account', icon: User },
  { title: 'Logout', url: '/logout', icon: LogOut },
];