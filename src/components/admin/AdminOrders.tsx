import React, { useEffect, useState } from 'react';
import {
  Search,
  Filter,
  ExternalLink,
  Truck,
  CheckCircle2,
  XCircle,
  MoreVertical,
  ChevronRight,
  Clock
} from 'lucide-react';
import { UserAccount, Order, OrderStatus } from '../../types';

interface AdminOrdersProps {
  currentUser: UserAccount | null;
}

export const AdminOrders: React.FC<AdminOrdersProps> = ({ currentUser }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { 'x-user-id': currentUser?.id || '' }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  const updateOrderStatus = async (orderId: string, updates: any) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser?.id || ''
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders = orders.filter(o =>
    o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center py-20"><Clock className="animate-spin text-[#1C3022]" /></div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher (N° commande, client...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border-none text-xs focus:ring-2 focus:ring-[#76BD43]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-stone-50 text-stone-600 rounded-xl text-[11px] font-bold border border-stone-200 cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            Filtrer par statut
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Commande</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Région</th>
                <th className="px-6 py-4">Montant</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-black text-[#1C3022]">{order.orderNumber}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-stone-900">{order.userName}</div>
                    <div className="text-[10px] text-stone-500">{order.userEmail}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-stone-600 uppercase">{order.region}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-stone-900">
                    ${parseFloat(order.totalUSD as any).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, { ...order, status: e.target.value as OrderStatus })}
                      className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border-none focus:ring-0 cursor-pointer ${
                        order.status === 'en_preparation' ? 'bg-amber-100 text-amber-700' :
                        order.status === 'expedie' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'livre' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-stone-100 text-stone-700'
                      }`}
                    >
                      <option value="en_attente">Attente</option>
                      <option value="en_preparation">Préparation</option>
                      <option value="expedie">Expédié</option>
                      <option value="livre">Livré</option>
                      <option value="annule">Annulé</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-stone-100 rounded-lg text-stone-400 hover:text-stone-900 transition-colors cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-20 text-center text-stone-400">
            Aucune commande trouvée.
          </div>
        )}
      </div>
    </div>
  );
};
