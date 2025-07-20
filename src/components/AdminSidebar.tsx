
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  BookOpen, 
  Calendar, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();
  const { siteSlug } = useParams();

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: `/${siteSlug}/admin/dashboard`,
    },
    {
      label: 'Packages',
      icon: Package,
      path: `/${siteSlug}/admin/packages`,
    },
    {
      label: 'Courses',
      icon: BookOpen,
      path: `/${siteSlug}/admin/courses`,
    },
    {
      label: 'Events',
      icon: Calendar,
      path: `/${siteSlug}/admin/events`,
    },
    {
      label: 'Blog Posts',
      icon: FileText,
      path: `/${siteSlug}/admin/blog`,
    },
    {
      label: 'Knowledge Base',
      icon: MessageSquare,
      path: `/${siteSlug}/admin/knowledge`,
    },
    {
      label: 'FAQs',
      icon: HelpCircle,
      path: `/${siteSlug}/admin/faq`,
    },
    {
      label: 'Users',
      icon: Users,
      path: `/${siteSlug}/admin/users`,
    },
  ];

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" 
                 style={{ backgroundColor: currentTheme?.primaryColor }}>
              {currentSite?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <h2 className="font-semibold text-sm">{currentSite?.name}</h2>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? currentTheme?.primaryColor : undefined,
            })}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to={`/${siteSlug}/admin/settings`}
          className={({ isActive }) =>
            cn(
              'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? currentTheme?.primaryColor : undefined,
          })}
        >
          <Settings className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
