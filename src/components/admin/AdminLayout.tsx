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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#1B4332] text-white transition-all duration-300 flex flex-col shadow-2xl z-30`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          {isSidebarOpen && <span className="font-serif font-black text-lg tracking-tight">ADMIN PANEL</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            {isSidebarOpen ? <ChevronLeft /> : <Menu />}
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
                    ? 'bg-[#E9C46A] text-[#1B4332] font-bold shadow-lg'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
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
            className="w-full flex items-center gap-3 p-3 text-stone-300 hover:text-white transition-colors cursor-pointer"
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
            <div className="w-10 h-10 rounded-full bg-[#1B4332] text-[#E9C46A] flex items-center justify-center font-black">
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
