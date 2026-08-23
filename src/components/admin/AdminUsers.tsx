import React, { useEffect, useState } from 'react';
import {
  Users,
  ShieldCheck,
  UserPlus,
  Mail,
  MapPin,
  Clock,
  Search,
  User as UserIcon,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { UserAccount } from '../../types';
import { motion } from 'motion/react';

interface AdminUsersProps {
  currentUser: UserAccount | null;
}

export const AdminUsers: React.FC<AdminUsersProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
         headers: { 'x-user-id': currentUser?.id || '' }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  const toggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Voulez-vous vraiment passer cet utilisateur en ${newRole.toUpperCase()} ?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': currentUser?.id || ''
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredUsers = users.filter(u =>
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="py-20 text-center text-stone-500 font-bold uppercase animate-pulse">Chargement de la liste des membres...</div>;

  return (
    <div className="space-y-6 animate-fadeIn pb-20">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-stone-200 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher un membre par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-100 text-xs focus:ring-2 focus:ring-[#2E7D32] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-[#1B4332]/5 text-[#1B4332] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[#1B4332]/10">
            {users.length} Manb Inskri
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <motion.div
            layout
            key={user.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                  user.role === 'admin' ? 'bg-[#E9C46A] text-[#1B4332]' : 'bg-stone-100 text-stone-400'
                }`}>
                  {user.full_name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-black text-stone-900 leading-tight">{user.full_name}</h4>
                  <p className="text-[10px] text-stone-500 font-bold uppercase">{user.preferred_region}</p>
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-xs border ${
                user.role === 'admin' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-stone-50 text-stone-500 border-stone-200'
              }`}>
                {user.role}
              </div>
            </div>

            <div className="space-y-2 py-2">
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>Inscrit le {new Date(user.created_at).toLocaleDateString()}</span>
              </div>
              {user.company_name && (
                <div className="flex items-center gap-2 text-xs text-stone-600 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>{user.company_name}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
              <button
                onClick={() => toggleRole(user.id, user.role)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase transition-all cursor-pointer border ${
                  user.role === 'admin'
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-[#1B4332] hover:text-white'
                }`}
              >
                {user.role === 'admin' ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                {user.role === 'admin' ? 'Rétrograder' : 'Promouvoir Admin'}
              </button>
              <button className="p-2 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer border border-stone-200">
                <ChevronDown className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 border-dashed">
          <p className="text-stone-400 font-bold uppercase tracking-widest">Aucun membre trouvé.</p>
        </div>
      )}
    </div>
  );
};
