
import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { useTheme } from '@/hooks/useTheme';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentTheme } = useTheme();

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <main 
        className="flex-1 overflow-hidden"
        style={{ backgroundColor: currentTheme?.backgroundColor || '#f9fafb' }}
      >
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
