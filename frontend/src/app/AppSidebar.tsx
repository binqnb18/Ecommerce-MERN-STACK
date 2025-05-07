// src/components/app/AppSidebar.tsx
import { memo, useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { menuItems, MenuItem } from '@/utils/routes';

export const AppSidebar = memo(() => {
  // Trạng thái để kiểm soát việc thu gọn/mở rộng của menu "Products"
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Hàm hiển thị các mục menu
  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) => {
      // Nếu mục có subItems (như Products), hiển thị menu có thể thu gọn
      if (item.subItems && item.subItems.length > 0) {
        return (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              onClick={() => setIsProductsOpen((prev) => !prev)}
              className="flex justify-between items-center"
            >
              <div className="flex items-center">
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </div>
              {isProductsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </SidebarMenuButton>
            {isProductsOpen && (
              <SidebarMenuSub>
                {item.subItems.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.url}>
                    <SidebarMenuSubButton asChild>
                      <a href={subItem.url} aria-label={`Điều hướng đến ${subItem.title}`}>
                        <subItem.icon className="mr-2 h-4 w-4" />
                        <span>{subItem.title}</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
        );
      }

      // Nếu không có subItems, hiển thị mục menu thông thường
      return (
        <SidebarMenuItem key={item.url}>
          <SidebarMenuButton asChild>
            <a href={item.url} aria-label={`Điều hướng đến ${item.title}`}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar role="navigation">
      <SidebarHeader className="p-4 border-b">
        <h2 className="text-xl font-bold">Ứng dụng Thương mại</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Điều hướng chính</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menuItems.main)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Tiện ích</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menuItems.utility)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenuItems(menuItems.account)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
});