// src/utils/routes.ts
import { lazy, ComponentType, LazyExoticComponent } from 'react';
import {
  LayoutDashboard,
  ShoppingCart,
  List,
  Grid,
  FileText,
  Edit,
  PlusCircle,
} from 'lucide-react';

// Định nghĩa các lazy-loaded components
const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const ProductsDetail = lazy(() => import('@/pages/Products/Detail'));
const ProductsEdit = lazy(() => import('@/pages/Products/Edit'));
const ProductsCreate = lazy(() => import('@/pages/Products/Create'));

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: MenuItem[];
}

export interface RouteConfig {
  path: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  element: LazyExoticComponent<ComponentType<object>>; // Sử dụng kiểu LazyExoticComponent
  showInSidebar?: boolean;  
  group?: 'main' | 'utility' | 'account';
  subItems?: MenuItem[];
}

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    title: 'Bảng điều khiển',
    icon: LayoutDashboard,
    element: Home, // Lưu trữ tham chiếu đến component, không dùng JSX
    showInSidebar: true,
    group: 'main',
  },
  {
    path: '/products',
    title: 'Sản phẩm',
    icon: ShoppingCart,
    element: Products,
    showInSidebar: true,
    group: 'main',
    subItems: [
      { title: 'Danh sách', url: '/products/list', icon: List },
      { title: 'Lưới', url: '/products/grid', icon: Grid },
      { title: 'Chi tiết', url: '/products/detail', icon: FileText },
      { title: 'Chỉnh sửa', url: '/products/edit', icon: Edit },
      { title: 'Tạo mới', url: '/products/create', icon: PlusCircle },
    ],
  },
  {
    path: '/products/detail',
    title: 'Chi tiết sản phẩm',
    element: ProductsDetail,
    showInSidebar: false,
  },
  {
    path: '/products/edit',
    title: 'Chỉnh sửa sản phẩm',
    element: ProductsEdit,
    showInSidebar: false,
  },
  {
    path: '/products/create',
    title: 'Tạo sản phẩm mới',
    element: ProductsCreate,
    showInSidebar: false,
  },
  {
    path: '/calendar',
    title: 'Lịch',
    icon: Calendar,
    element: Calendar,
    showInSidebar: true,
    group: 'main',
  },
  {
    path: '*',
    title: 'Không tìm thấy',
    element: NotFound,
    showInSidebar: false,
  },
];

export const menuItems = {
  main: routeConfig
    .filter((r) => r.showInSidebar && r.group === 'main')
    .map(({ path, title, icon, subItems }) => ({
      url: path,
      title,
      icon: icon!,
      subItems,
    })),
  utility: routeConfig
    .filter((r) => r.showInSidebar && r.group === 'utility')
    .map(({ path, title, icon }) => ({ url: path, title, icon: icon! })),
  account: routeConfig
    .filter((r) => r.showInSidebar && r.group === 'account')
    .map(({ path, title, icon }) => ({ url: path, title, icon: icon! })),
};