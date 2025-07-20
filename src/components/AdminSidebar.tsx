
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Package, BookOpen, Calendar, FileText, 
  HelpCircle, MessageSquare, Users, Settings, Eye, LogOut,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSite } from '@/hooks/useSite';
import { useTheme } from '@/hooks/useTheme';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const { currentSite } = useSite();
  const { currentTheme } = useTheme();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      description: 'Overview & Analytics'
    },
    { 
      icon: Package, 
      label: 'Packages', 
      path: '/admin/packages',
      description: 'Travel Packages'
    },
    { 
      icon: BookOpen, 
      label: 'Courses', 
      path: '/admin/courses',
      description: 'Educational Programs'
    },
    { 
      icon: Calendar, 
      label: 'Events', 
      path: '/admin/events',
      description: 'Events & Activities'
    },
    { 
      icon: FileText, 
      label: 'Blog', 
      path: '/admin/blog',
      description: 'Blog Posts'
    },
    { 
      icon: HelpCircle, 
      label: 'Knowledge Base', 
      path: '/admin/knowledge',
      description: 'Help Articles'
    },
    { 
      icon: MessageSquare, 
      label: 'FAQ', 
      path: '/admin/faq',
      description: 'Frequently Asked Questions'
    },
    { 
      icon: Users, 
      label: 'Users', 
      path: '/admin/users',
      description: 'User Management'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/admin/settings',
      description: 'Site Configuration'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const sidebarStyle = {
    backgroundColor: currentTheme?.cardColor || '#ffffff',
    borderColor: currentTheme?.borderColor || '#e5e7eb'
  };

  return (
    <div 
      className={cn(
        "h-screen bg-white border-r transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
      style={sidebarStyle}
    >
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: currentTheme?.borderColor || '#e5e7eb' }}>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg" style={{ color: currentTheme?.primaryColor || '#004225' }}>
                {currentSite?.name || 'Admin'}
              </h2>
              <p className="text-sm text-gray-500">Control Panel</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                "hover:bg-gray-100",
                isActive
                  ? "text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              )
            }
            style={({ isActive }) => 
              isActive 
                ? { backgroundColor: currentTheme?.primaryColor || '#004225' }
                : {}
            }
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "" : "mr-3")} />
            {!collapsed && (
              <div className="flex-1">
                <div>{item.label}</div>
                <div className="text-xs opacity-75">{item.description}</div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t space-y-2" style={{ borderColor: currentTheme?.borderColor || '#e5e7eb' }}>
        <Button
          variant="outline"
          size="sm"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={() => window.open(`/${currentSite?.slug}`, '_blank')}
        >
          <Eye className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed && "View Site"}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full justify-start text-red-600 hover:text-red-700", collapsed && "px-2")}
        >
          <LogOut className={cn("h-4 w-4", !collapsed && "mr-2")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
