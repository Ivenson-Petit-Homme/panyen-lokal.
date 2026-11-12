import React, { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  Globe2,
  Briefcase,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  MoreVertical
} from 'lucide-react';
import { UserAccount } from '../../types';

interface AdminQuotesProps {
  currentUser: UserAccount | null;
}

export const AdminQuotes: React.FC<AdminQuotesProps> = ({ currentUser }) => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch('/api/admin/quotes', {
          headers: { 'x-user-id': currentUser?.id || '' }
        });
        const data = await res.json();
        if (data.success) {
          setQuotes(data.quotes);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, [currentUser]);

  if (loading) return <div className="py-20 text-center text-stone-500">Chajman Devis B2B...</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 gap-4">
        {quotes.map((quote) => (
          <div key={quote.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Client Info */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black bg-[#2A4833] text-white px-2 py-0.5 rounded-full uppercase">
                    {quote.reference_number}
                  </span>
                  <span className="text-[10px] text-stone-400 font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(quote.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-xl font-serif font-bold text-[#1F2937]">{quote.company_name}</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>Responsable: <strong>{quote.contact_person}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{quote.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>{quote.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>Destinasyon: <strong>{quote.destination_country}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#1C3022]" />
                    <span>Sektè: {quote.industry}</span>
                  </div>
                </div>
              </div>

              {/* Status & Requirements */}
              <div className="lg:w-1/3 bg-stone-50 rounded-2xl p-4 border border-stone-100 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Exigences Spécifiques :</span>
                  <p className="text-[11px] text-stone-700 italic line-clamp-3">
                    "{quote.requirements || 'Aucune exigence particulière spécifiée.'}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    quote.status === 'nouveau' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    <Clock className="w-3 h-3" />
                    {quote.status}
                  </div>
                  <button className="text-xs font-bold text-[#1C3022] hover:underline cursor-pointer">
                    Répondre au devis
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {quotes.length === 0 && (
          <div className="bg-white rounded-3xl border-2 border-dashed border-stone-200 p-20 text-center text-stone-400">
            Aucune demande de devis B2B pour le moment.
          </div>
        )}
      </div>
    </div>
  );
};
