import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  Menu
} from 'lucide-react';
import { PageRoute } from '../../types';

interface AdminLayoutProps {
  children: React.ReactNode;
  setCurrentRoute: (route: PageRoute) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  setCurrentRoute,
  activeTab,
  setActiveTab
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Commandes', icon: ShoppingBag },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'quotes', label: 'Devis B2B', icon: MessageSquare },
    { id: 'users', label: 'Utilisateurs', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16 sm:w-20'
        } bg-[#2A4833] text-white transition-all duration-300 flex flex-col shadow-2xl z-30 shrink-0`}
      >
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen && <span className="font-serif font-black text-sm sm:text-lg tracking-tight text-white whitespace-nowrap">ADMIN PANEL</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-white"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#E59500] text-[#1C3022] font-bold shadow-lg'
                    : 'text-white hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => setCurrentRoute('home')}
            className="w-full flex items-center gap-3 p-3 text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5 rotate-180" />
            {isSidebarOpen && <span>Quitter Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-stone-200 p-6 flex items-center justify-between shadow-sm sticky top-0 z-20">
          <h1 className="text-xl font-bold text-stone-800 uppercase tracking-wide">
            {menuItems.find(i => i.id === activeTab)?.label || 'Administration'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-stone-900">Panyen Lokal Admin</p>
              <p className="text-[10px] text-stone-500">Service Central EKAM</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#2A4833] text-white flex items-center justify-center font-black">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
