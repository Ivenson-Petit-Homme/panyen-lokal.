import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Clock,
  CheckCircle2,
  Package,
  AlertTriangle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { UserAccount } from '../../types';

interface AdminDashboardProps {
  currentUser: UserAccount | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [stats, setStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, analyticsRes] = await Promise.all([
          fetch('/api/admin/stats', { headers: { 'x-user-id': currentUser?.id || '' } }),
          fetch('/api/admin/analytics', { headers: { 'x-user-id': currentUser?.id || '' } })
        ]);

        const statsData = await statsRes.json();
        const analyticsData = await analyticsRes.json();

        if (statsData.success) setStats(statsData.stats);
        if (analyticsData.success) setAnalytics(analyticsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUser]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 space-y-4">
      <div className="w-12 h-12 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
      <p className="text-stone-500 font-bold animate-pulse">Chargement des données en temps réel...</p>
    </div>
  );

  const COLORS = ['#1B4332', '#1B4332', '#E9C46A', '#F4A261', '#E76F51'];

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Chiffre d'Affaires"
          value={`$${stats?.revenue?.toLocaleString() || '0.00'}`}
          subtitle="Cumul ventes payées"
          icon={TrendingUp}
          color="bg-emerald-500"
        />
        <StatCard
          title="Kòmand Total"
          value={stats?.totalOrders}
          subtitle="Volume global"
          icon={ShoppingBag}
          color="bg-[#1B4332]"
        />
        <StatCard
          title="Manb Inskri"
          value={stats?.users}
          subtitle="Baz done kliyan"
          icon={Users}
          color="bg-[#E9C46A]"
        />
        <StatCard
          title="Preparasyon"
          value={stats?.pending}
          subtitle="Aktif nan Caracol"
          icon={Clock}
          color="bg-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-stone-800">Performance des Ventes</h3>
              <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Top 5 Pwodwi yo</p>
            </div>
            <div className="p-2 bg-stone-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-[#1B4332]" />
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.salesData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 10 }} />
                <Tooltip
                  cursor={{ fill: '#f8f8f8' }}
                  contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="sales" radius={[8, 8, 0, 0]} barSize={45}>
                  {(analytics?.salesData || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Status & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1B4332] p-6 rounded-3xl text-white shadow-xl h-full border border-[#2D6A4F]">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-[#E9C46A]" />
              <h3 className="font-bold uppercase tracking-wider text-sm text-white">État des Stocks</h3>
            </div>

            <div className="space-y-4">
              {analytics?.stockData?.map((item: any, idx: number) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span className="truncate max-w-[150px]">{item.name}</span>
                    <span className={item.in_stock ? 'text-emerald-400' : 'text-red-400'}>
                      {item.in_stock ? 'DISPONIBLE' : 'RUPTURE'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.in_stock ? 'bg-[#E9C46A]' : 'bg-red-500'}`}
                      style={{ width: item.in_stock ? '100%' : '5%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
               <button className="text-[10px] font-black uppercase text-[#E9C46A] hover:underline cursor-pointer">
                 Gérer l'inventaire complet
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts Row */}
      <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-500 text-white flex items-center justify-center shrink-0 shadow-lg animate-pulse">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-black text-red-900 uppercase tracking-tight">Alerte Logistique : Port Cap-Haïtien</h4>
          <p className="text-xs text-red-700">Départ du prochain conteneur 20ft (FCL) vers Miami prévu dans 48h. Vérifiez les scellés des barils PL-DRUM-54.</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{title}</h4>
      <div className="text-2xl font-black text-stone-900 mt-1">{value}</div>
      <p className="text-[10px] text-stone-500 font-bold mt-1 uppercase opacity-80">{subtitle}</p>
    </div>
    {/* Decorative background shape */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${color} opacity-5 group-hover:scale-150 transition-transform duration-700`} />
  </div>
);
